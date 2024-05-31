import React, { useState } from "react";
import axios from "axios";

export const ReturnsForm = ({ orderData, onClose }) => {
  console.log(orderData)
  const [products, setProducts] = useState(
    orderData.product.map((product) => ({
      brand: product.brand,
      quantity: product.quantity,
      originalQuantity: product.quantity, // Store the original quantity for comparison
      reason: "",
    }))
  );

  const handleInputChange = (index, field, value) => {
    // if (key === "quantity" && value > products[index].quantity) {
    //   value = products[index].quantity;
    // }
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const modifiedProducts = products.filter(
      (product) => product.quantity !== product.originalQuantity
    ).map(({ originalQuantity, ...product }) => product); // Exclude originalQuantity from submission

    const data = {
      order_id: orderData.id,
      products: modifiedProducts,
      trader: orderData.trader.trader_name,
      transporter: orderData.transporter.transporter_name,
      destination: orderData.destination
    };

    try {
      console.log('dww', data)
      await axios.post("http://127.0.0.1:8000/api/returns/", data);
      console.log("Returns Submitted successfully")
      onClose();
    } catch (error) {
      console.error("Error submitting return form:", error.message);
    }
  };

  return (
    <div className="max-h-96 overflow-y-auto">
      <form className="" onSubmit={handleSubmit}>
        {products.map((product, index) => (
          <div key={index} className="mb-5">
            <label
              htmlFor={`brand-${index}`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {product.brand}
            </label>
            <input
              type="number"
             
              value={product.quantity}
              id={`quantity-${index}`}
              className="shadow-sm px-20 bg-gray-50 border border-gray-300 h-8 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
            />
            <div>
              <label
                htmlFor={`reason-${index}`}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Reason for Return
              </label>
              <textarea
                id={`reason-${index}`}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a comment..."
                value={product.reason}
                onChange={(e) => handleInputChange(index, "reason", e.target.value)}
              ></textarea>
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
