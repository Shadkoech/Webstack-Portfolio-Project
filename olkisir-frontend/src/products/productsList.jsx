import React, { useEffect, useState } from "react";
import { ProductEdit } from "./productEdit";
import { ProductView } from "./productView";
import Modal from "../modal/Modal";
import axios from "axios";
import ProductDelete from "./productDelete";
import { ProductAdd } from "./productAdd";

export const ProductsList = () => {
    let i = 1
    const [activeComponent, setActiveComponent] = useState("");
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10); // Setting the pagesize for pagination
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    const handleViewProduct = (product) => {
        setSelectedProduct(product);
        toggleViewModal();
    };

    const handleDeleteProduct = (productId) => {
        setProducts(products.filter((product) => product.id !== productId));
    };

    const handleUpdateProductList = (updatedProduct) => {
        setProducts((prevProducts) => {
            const updatedProducts = prevProducts.map((product) => {
                if (product.id === updatedProduct.id) {
                    return updatedProduct;
                }
                return product;
            });
            return updatedProducts;
        });
    };

    const handleAddProductList = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
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
        <div className="relative overflow-x-auto shadow-md mt-20 sm:rounded-lg mr-20">
            <div className="flex justify-between mt-2">
                <div></div>
                <button
                    onClick={toggleAddForm}
                    className="bg-blue-500 rounded-md py-2 px-4 text-white mb-2 hover:bg-blue-400"
                >
                    Add
                </button>
            </div>
            {showAddForm && (
                <ProductAdd
                    isOpen={showAddForm}
                    onClose={toggleAddForm}
                    onAddProduct={handleAddProductList}
                />
            )}

            <div className="rounded-lg overflow-hidden border border-gray-500">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-black uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No.
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
                            <th scope="col" className="px-6 py-3">
                                Actions
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
                                    className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                                >
                                    {i++}
                                </th>
                                <td className="px-6 py-4">{product.product_type}</td>
                                <td className="px-6 py-4">{product.brand}</td>
                                <td className="px-6 py-4">{product.SKU}</td>
                                <td className="px-6 py-4">{product.price}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="text-left flex justify-between space-x-2 w-4">
                                        <button
                                            onClick={() => toggleEditForm(product.id)}
                                            className=" py-2 px-4 text-blue-500"
                                        >
                                            {/* Edit button */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                />
                                            </svg>
                                        </button>
                                        <a
                                            onClick={() => handleViewProduct(product)}
                                            className="font-medium text-green-600 dark:text-green-500 hover:underline"
                                        >
                                            {/* View button */}
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
                                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                                />
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                />
                                            </svg>
                                        </a>
                                        <ProductDelete
                                            productId={product.id}
                                            onDelete={handleDeleteProduct}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Logic at the table foot */}
            <div className="mt-4 flex justify-between items-center">
                <div>
                    {/* Display the number of available pages */}
                    <span className="text-sm text-black ml-2">
                        Page {currentPage} of {totalPages}
                    </span>
                </div>
                <div>
                    {/* Previous button */}
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mr-2 bg-gray-200 hover:bg-gray-300 text-black font-bold py-1 px-2 rounded-md text-sm"
                    >
                        {/* {"<"} */}
                        Previous
                    </button>
                    {/* Next button */}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-1 px-2 rounded-md text-sm mr-5"
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
                        onUpdateProduct={handleUpdateProductList}
                    />
                )}
                {showViewModal && (
                    <ProductView
                        productData={selectedProduct}
                        isOpen={showViewModal}
                        onClose={toggleViewModal}
                    />
                )}
            </Modal>
        </div>
    );
};
