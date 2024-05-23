import React from "react";

export const ProductView = ({ productData, isOpen, onClose }) => {
  if (!isOpen || !productData) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Product Details
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div>
            <label htmlFor="product_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Product Type
            </label>
            <p>{productData.product_type}</p>
          </div>
          <div>
            <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Brand
            </label>
            <p>{productData.brand}</p>
          </div>
          <div>
            <label htmlFor="SKU" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              SKU
            </label>
            <p>{productData.SKU}</p>
          </div>
          <div>
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Price
            </label>
            <p>{productData.price}</p>
          </div>
        </div>
        <button onClick={onClose} className="mt-4 text-sm font-medium text-gray-900 dark:text-white hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};