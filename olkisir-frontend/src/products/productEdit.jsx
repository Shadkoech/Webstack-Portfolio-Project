import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

export const ProductEdit = ({ productId, isOpen, onClose }) => {
  const [productData, setProductData] = useState({
    product_type: "",
    brand: "",
    SKU: "",
    price: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (productId) {
      axios.get(`http://127.0.0.1:8000/api/products/${productId}/`)
        .then(response => {
          setProductData(response.data);
        })
        .catch(error => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let response;
      if (productId) {
        response = await axios.put(`http://127.0.0.1:8000/api/products/${productId}/`, productData);
        setMessage("Product updated successfully");
      } else {
        response = await axios.post("http://127.0.0.1:8000/api/products", productData);
        setMessage("Product added successfully");
      }
      console.log("Product action successful:", response.data);

      setTimeout(() => {
        setMessage("");
        onClose(); // Close the modal after the action
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to perform action. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {productId ? "Edit Product" : "Add a new product"}
        </h2>
        {message && <p className={message.includes("error") ? "text-red-500" : "text-green-500"}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="product_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Product Type
              </label>
              <select
                name="product_type"
                id="product_type"
                value={productData.product_type}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="">Select type</option>
                <option value="Cooking Oil">Cooking Oil</option>
                <option value="Cooking Fat">Cooking Fat</option>
                <option value="Soap">Soap</option>
                <option value="Stearine">Stearine</option>
                <option value="Olein">Olein</option>
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                value={productData.brand}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter brand"
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="SKU" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                SKU
              </label>
              <input
                type="text"
                name="SKU"
                id="SKU"
                value={productData.SKU}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Choose the quantity unit"
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Price
              </label>
              <input
                type="text"
                name="price"
                id="price"
                value={productData.price}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Input product price"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            {loading ? (productId ? "Updating..." : "Adding...") : (productId ? "Update product" : "Add product")}
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-sm font-medium text-gray-900 dark:text-white hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};


ProductEdit.propTypes = {
  productId: PropTypes.any, // Define the type for productId
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};