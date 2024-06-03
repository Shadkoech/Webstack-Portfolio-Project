import React from "react";

export const OrderView = ({ orderData, isOpen, onClose }) => {
  if (!isOpen || !orderData) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mt-4 text-sm font-medium text-gray-900 dark:text-white hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h2 className="mb-4 flex justify-center text-xl font-bold text-gray-900 dark:text-white underline">
          Order {orderData.loading_id}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div>
            <label
              htmlFor="order_type"
              className="block mb-2 text-sm font-bold italic text-gray-900 dark:text-white"
            >
              Destination
            </label>
            <p className="border border-1/2 border-lime-500">{orderData.destination}</p>
          </div>
          <div>
            <label
              htmlFor="order"
              className="block mb-2 text-sm font-bold italic text-gray-900 dark:text-white"
            >
              Dispatch Chemist
            </label>
            <p className="border border-1/2 border-lime-500">{orderData.dispatch_chemist['chemist_name']}</p>
          </div>
          {/* <div>
            <label
              htmlFor="order_address"
              className="block mb-2 text-sm font-bold italic text-gray-900 dark:text-white"
            >
              Loading Id
            </label>
            <p>{orderData.loading_id}</p>
          </div> */}
          <div>
            <label
              htmlFor="order_address"
              className="block mb-2 text-sm font-bold italic text-gray-900 dark:text-white"
            >
              Trader
            </label>
            <p className="border border-1/2 border-lime-500">{orderData.trader['trader_name']}</p>
          </div>
          <div>
            <label
              htmlFor="order_address"
              className="block mb-2 text-sm font-bold italic text-gray-900 dark:text-white"
            >
              Transporter
            </label>
            <p className="border border-1/2 border-lime-500">{orderData.transporter['transporter_name']}</p>
          </div>
        </div>
        <div className="mt-4 ">
            <label
              htmlFor="order_address"
              className="block mb-2 text-sm font-bold italic text-gray-900 dark:text-white"
            >
              Products
            </label>
            <div className="h-[150px] overflow-y-scroll" >
              <table className="w-full border border-1/2 border-lime-500">
                <thead className="font-bold border border-1/2 border-lime-500 bg-lime-50">
                  <tr>
                    <th>No.</th>
                    <th>Type</th>
                    <th>Brand</th>
                    <th>SKU</th>                    
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>

                <tbody>
                    {orderData.product.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{product.product_type}</td>
                      <td>{product.brand}</td>
                      <td>{product.SKU}</td>                    
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
  );
};
