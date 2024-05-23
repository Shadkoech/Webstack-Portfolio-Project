
import axios from 'axios';
import { useState } from 'react';

function ProductDelete({ productId, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);


  const handleDelete = async () => {
    try {
        await axios.delete(`http://localhost:8000/api/products/${productId}`)
        onDelete(productId);
        closeModal();
    } catch (error) {
        console.error(error.message);
    }
  }

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };


  return (
    <div>
      <button 
        onClick={openModal}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Delete Product
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Delete Product</h2>
            <p className="mb-4">Are you sure you want to delete this product?</p>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Yes, Delete
            </button>
            <button
              onClick={closeModal}
              className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDelete;
