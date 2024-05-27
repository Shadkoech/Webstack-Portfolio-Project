import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

export const OrderEdit = ({ orderId, isOpen, onClose, onUpdateOrder }) => {
  const [orderData, setOrderData] = useState({
    order_name: "",
    order_address: "",
    contact: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (orderId) {
      axios.get(`http://127.0.0.1:8000/api/orders/${orderId}/`)
        .then(response => {
          setOrderData(response.data);
        })
        .catch(error => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [orderId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let response;
      if (orderId) {
        response = await axios.put(`http://127.0.0.1:8000/api/orders/${orderId}/`, orderData);
        setMessage("Order updated successfully");
      } else {
        response = await axios.post("http://127.0.0.1:8000/api/orders", orderData);
        setMessage("Order added successfully");
      }
      console.log("Order action successful:", response.data);

      onUpdateOrder(response.data);

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
    setOrderData({ ...orderData, [name]: value });
  };

  if (!isOpen) return null;

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
          {orderId ? "Edit Product" : "Add a new product"}
        </h2>
        {message && <p className={message.includes("error") ? "text-red-500" : "text-green-500"}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="product_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Order Name
              </label>
              <input
                name="order_name"
                id="order_name"
                value={orderData.order_name}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
               
            </div>
            <div className="w-full">
              <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Order address
              </label>
              <input
                type="text"
                name="order_address"
                id="order_address"
                value={orderData.order_address}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter brand"
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="SKU" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Contact
              </label>
              <input
                type="text"
                name="contact"
                id="contact"
                value={orderData.contact}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Choose the quantity unit"
                required
              />
            </div>
            
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            {loading ? (orderId ? "Updating..." : "Adding...") : (orderId ? "Update product" : "Add product")}
          </button>
        </form>
      </div>
    </div>
  );
};


OrderEdit.propTypes = {
  orderId: PropTypes.any, // Define the type for productId
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};