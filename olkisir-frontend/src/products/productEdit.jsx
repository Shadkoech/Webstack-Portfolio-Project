import React, { useState, useEffect } from "react";
import axios from "axios";

export const ProductEdit = ({ productId, onClose }) => {
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
      axios.get(`http://127.0.0.1:8000/api/products/${productId}`)
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
        response = await axios.put(`http://127.0.0.1:8000/api/products/${productId}`, productData);
        setMessage("Product updated successfully");
      } else {
        response = await axios.post("http://127.0.0.1:8000/api/products/", productData);
        setMessage("Product added successfully");
      }
      console.log("Product action successful:", response.data);

      setTimeout(() => {
        setMessage("");
        onClose(); // Close modal after successful action
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md mx-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          {productId ? "Edit Product" : "Add a new product"}
        </h2>
        {message && (
          <p className={message.includes("error") ? "text-red-500" : "text-green-500"}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="product_type" className="block mb-2 text-sm font-medium text-gray-900">
                Product Type
              </label>
              <select
                name="product_type"
                id="product_type"
                value={productData.product_type}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
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
              <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                value={productData.brand}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter brand"
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="SKU" className="block mb-2 text-sm font-medium text-gray-900">
                SKU
              </label>
              <input
                type="text"
                name="SKU"
                id="SKU"
                value={productData.SKU}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Choose the quantity unit"
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                Price
              </label>
              <input
                type="text"
                name="price"
                id="price"
                value={productData.price}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Input product price"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-5 py-2.5 mt-4 text-sm font-medium text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
          >
            {loading ? (productId ? "Updating..." : "Adding...") : (productId ? "Update product" : "Add product")}
          </button>
        </form>
      </div>
    </div>
  );
};