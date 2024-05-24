import React, { useEffect, useState } from "react";
import { ProductEdit } from "./productEdit";
import { ProductView } from "./productView";
import { Products } from "./products";
import Modal from "../modal/Modal";
import axios from "axios";
import ProductDelete from "./productDelete";

export const ProductsList = () => {
  const [activeComponent, setActiveComponent] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(7); // Setting the pagesize for pagination
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const totalPages = Math.ceil(products.length / pageSize); // calculating total no of pages

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const toggleEditForm = (productId) => {
    setSelectedProductId(productId);
    setShowEditForm(!showEditForm);
  };

  const toggleViewModal = () => {
    setShowViewModal(!showViewModal);
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    toggleViewModal();
  };

  const handleDeleteProduct = async () => {
    try {
      // Send a DELETE request to the backend API to delete the product
      await axios.delete(
        `http://127.0.0.1:8000/api/products/${productToDelete.id}`
      );
      // Update the product list after deletion
      setProducts(
        products.filter((product) => product.id !== productToDelete.id)
      );
      // Close the delete modal
      toggleDeleteModal();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Product not found:", error);
      } else {
        console.error("Error deleting product:", error);
      }
    }
  };

  const renderCrud = () => {
    switch (activeComponent) {
      case "edit":
        return (
          <div>
            <ProductEdit
              productId={selectedProductId}
              isOpen={showEditForm}
              onClose={() => setShowEditForm(false)}
            />
          </div>
        );
      case "view":
        return (
          <div>
            <ProductView />
          </div>
        );
      default:
        return null;
    }
  };

  const handleProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products/");
      setProducts(response.data);
    } catch (error) {
      console.error(
        "There was an error fetching products from backend:",
        error.message
      );
    }
  };

  useEffect(() => {
    handleProducts();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="relative overflow-x-auto shadow-md mt-20 sm:rounded-lg">
      <div className="flex justify-between mt-2">
        <div></div>
        <button
          onClick={toggleAddForm}
          className="bg-blue-500 rounded-md py-2 px-4 text-white"
        >
          Add
        </button>
      </div>
      {showAddForm && <Products />}

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Product Type
            </th>
            <th scope="col" className="px-6 py-3">
              Brand
            </th>
            <th scope="col" className="px-6 py-3">
              SKU
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
          </tr>
        </thead>

        <tbody>
          {paginatedProducts.map((product) => (
            <tr
              key={product.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {product.id}
              </th>
              <td className="px-6 py-4">{product.product_type}</td>
              <td className="px-6 py-4">{product.brand}</td>
              <td className="px-6 py-4">{product.SKU}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => toggleEditForm(product.id)}
                  className="bg-blue-500 rounded-md py-2 px-4 text-white"
                >
                  Edit
                </button>
              </td>
              <td className="px-6 py-4 text-right">
                <a
                  onClick={() => handleViewProduct(product)}
                  className="font-medium text-green-600 dark:text-green-500 hover:underline"
                >
                  View
                </a>
              </td>
              <td className="px-6 py-4 text-right">
                <ProductDelete
                  productId={product.id}
                  onDelete={() => console.log("Deleted successfully")}
                />
                {/* <a onClick={() => {
                                    setProductToDelete(product.id);
                                    toggleDeleteModal();
                                }} className="font-medium text-red-600 dark:text-red-500 hover:underline"> Delete</a> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Pagination Logic at the table foot */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          {/* Display the number of available pages */}
          <span className="text-sm text-gray-600 ml-2">
            Page {currentPage} of {totalPages}
          </span>
        </div>
        <div>
          {/* Previous button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-md text-sm"
          >
            {/* {"<"} */}
            Previous
          </button>
          {/* Next button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-md text-sm mr-5"
          >
            {/* {">"} */}
            next
          </button>
        </div>
      </div>


      <div className="p-4 sm:ml-64">{renderCrud()}</div>

      <Modal
        isOpen={showEditForm || showViewModal || showDeleteModal}
        onClose={() => setShowEditForm(false)}
      >
        {showEditForm && (
          <ProductEdit
            productId={selectedProductId}
            isOpen={showEditForm}
            onClose={() => setShowEditForm(false)}
          />
        )}
        {showViewModal && (
          <ProductView
            productData={selectedProduct}
            isOpen={showViewModal}
            onClose={toggleViewModal}
          />
        )}
        {/* {showDeleteModal && (
                    <ProductDelete
                        product={productToDelete}
                        onDelete={handleDeleteProduct}
                    />
                )} */}
      </Modal>
    </div>
  );
};
