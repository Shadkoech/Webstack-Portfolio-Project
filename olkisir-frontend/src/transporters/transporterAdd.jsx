import React, { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

export const TransporterAdd = ({ isOpen, onClose, onAddTransporter }) => {
  const [transporterData, settransporterData] = useState({
    transporter_name: "",
    representative: "",
    contact: "",
    username: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/transporters/", transporterData);
      setMessage("Transporter added successfully");
      console.log("Transporter added successfully:", response.data);
      onAddTransporter(response.data);
      setTimeout(() => {
        setMessage("");
        onClose(); // Close the modal after adding the transporter
      }, 2000);
    } catch (error) {
      console.error("Error adding transporter:", error);
      setMessage("Failed to add transporter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    settransporterData({ ...transporterData, [name]: value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
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
          Add a new transporter
        </h2>
        {message && <p className={message.includes("error") ? "text-red-500" : "text-green-500"}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

          <div>
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Transporter
              </label>
              <input
                type="text"
                name="transporter_name"
                id="transporter_name"
                value={transporterData.transporter_name}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Select a transporter"
                required
              />
            </div>

            <div className="w-full">
              <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Representative
              </label>
              <input
                type="text"
                name="representative"
                id="representative"
                value={transporterData.representative}
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
                value={transporterData.contact}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Choose the quantity unit"
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="SKU" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={transporterData.username}
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
            {loading ? "Adding..." : "Add Transporter"}
          </button>
        </form>
      </div>
    </div>
  );
};

TransporterAdd.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddTransporter: PropTypes.func.isRequired
};
