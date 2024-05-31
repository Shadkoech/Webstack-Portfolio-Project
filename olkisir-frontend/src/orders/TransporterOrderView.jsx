import React from "react";

export const TransporterOderView = ({ orderData, isOpen, onClose }) => {
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
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Order Details
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div>
            <label
              htmlFor="order_type"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Destination
            </label>
            <p>{orderData.destination}</p>
          </div>
          <div>
            <label
              htmlFor="order"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Dispatch Chemist
            </label>
            <p>{orderData.dispatch_chemist['chemist_name']}</p>
          </div>
          <div>
            <label
              htmlFor="order_address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Loading Id
            </label>
            <p>{orderData.loading_id}</p>
          </div>
          <div>
            <label
              htmlFor="order_address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Transporter
            </label>
            <p>{orderData.transporter['transporter_name']}</p>
          </div>
          <div>
            <label
              htmlFor="order_address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Transporter
            </label>
            <p>{orderData.transporter['transporter_name']}</p>
          </div>
          <div>
            <label
              htmlFor="order_address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Products
            </label>
            <div>
              {orderData.product.map((product, index) => (
                <div key={index} className="border bg-green-300 p-2 mb-2 rounded">
                  <p>Type: {product.product_type}</p>
                  <p>SKU: {product.SKU}</p>
                  <p>Brand: {product.brand}</p>
                  <p>Price: {product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
