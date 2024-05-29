import React from "react";

export const ReturnsForm = ({ orderData }) => {
  console.log('oI', orderData.product)
  return (
    <div className="py-8 px-20  mx-auto max-w-2xl lg:py-16">
     <form className="w-full">
              {orderData.product.map((product, index) => (
                <div key={index} className="mb-5">
                  <label
                    htmlFor={`brand-${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {product.brand}
                  </label>
                  <input
                    type="text"
                    value={product.quantity}
                    id={`brand-${index}`}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                  <div>
                    <label
                      htmlFor={`message-${index}`}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Reason for Return
                    </label>
                    <textarea
                      id={`message-${index}`}
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Leave a comment..."
                    ></textarea>
                  </div>
                </div>
              ))}
            </form>
    </div>
  );
};
