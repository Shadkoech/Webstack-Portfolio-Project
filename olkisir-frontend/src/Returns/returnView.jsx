import React from "react";

export const ReturnView = ({ returnData, isOpen, onClose }) => {
  if (!isOpen || !returnData) return null;
  console.log('view', returnData)

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-end">
          <div></div>
          <button
            onClick={onClose}
            className="mt-4 text-sm font-medium text-gray-900 dark:text-white hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          return Details
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div>
            <label
              htmlFor="return_type"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Trader
            </label>
            <p>{returnData.trader}</p>
          </div>
          <div>
            <label
              htmlFor="return"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Transporter
            </label>
            <p>{returnData.transporter}</p>
          </div>
          <div>
            <label
              htmlFor="return_address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Destination
            </label>
            <p>{returnData.destination}</p>
          </div>
          <div>
            {returnData.products.map((product, index)=>(
              <div index={index}>
                <div className="bg-gray-400 border-2">
                <p>Brand: {product.brand}</p>
                <p>quantity: {product.quantity}</p>
                <p>Reason: {product.reason}</p>                
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
