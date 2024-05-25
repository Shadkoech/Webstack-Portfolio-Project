import React from "react";

export const ChemistView = ({ chemistData, isOpen, onClose }) => {
  if (!isOpen || !chemistData) return null;

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
          chemist Details
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div>
            <label
              htmlFor="chemist_type"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              chemist
            </label>
            <p>{chemistData.chemist_name}</p>
          </div>         
          <div>
            <label
              htmlFor="chemist_address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              contact
            </label>
            <p>{chemistData.contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
