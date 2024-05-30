import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import axios from "axios";
import ReturnDelete from "./returnDelete";
import { ProcessReturn } from "./processReturn";
import { ReturnView } from "./returnView";


export const ReturnList = () => {

    const [activeComponent, setActiveComponent] = useState("");
    const [returns, setReturns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5); // Setting the pagesize for pagination
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedReturnId, setSelectedReturnId] = useState(null);
    const [selectedReturn, setSelectedReturn] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const totalPages = Math.ceil(returns.length / pageSize); // calculating total no of pages

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    };

    const toggleEditForm = (returnId) => {
        setSelectedReturnId(returnId);
        setShowEditForm(!showEditForm);
    };

    const toggleViewModal = () => {
        setShowViewModal(!showViewModal);
    };

    const handleViewReturn = (remit) => {
        setSelectedReturn(remit);
        toggleViewModal();
    };

    const handleDeleteReturn = (returnId) => {
        setReturns(returns.filter((remit) => remit.id !== returnId));
    };






    const renderCrud = () => {
        switch (activeComponent) {
            case "edit":
                return (
                    <div>
                        <ReturnEdit
                            returnId={selectedReturnId}
                            isOpen={showEditForm}
                            onClose={() => setShowEditForm(false)}
                        />
                    </div>
                );
            case "view":
                return (
                    <div>
                        <ReturnView />
                    </div>
                );
            default:
                return null;
        }
    };

    const handleReturns = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/returns/");
            setReturns(response.data);
            console.log('res', response.data)
        } catch (error) {
            console.error(
                "There was an error fetching returns from backend:",
                error.message
            );
        }
    };

    useEffect(() => {
        handleReturns();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginatedReturns = returns.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="relative overflow-x-auto shadow-md mt-20 sm:rounded-lg mr-20">
            {/* <div className="flex justify-between mt-2">
                <div></div>
                <button
                    onClick={toggleAddForm}
                    className="bg-blue-500 rounded-md py-2 px-4 text-white mb-2 hover:bg-blue-400"
                >
                    Create return
                </button>
            </div>
            {showAddForm && (
                <ReturnAdd
                    isOpen={showAddForm}
                    onClose={toggleAddForm}
                    onAddReturn={handleAddReturnList}
                />
            )} */}

            <div className="rounded-lg overflow-hidden border border-gray-500">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-black uppercase bg-orange-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                OrderId
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Trader
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Transporter
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Destination
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedReturns.map((remit, index) => (
                            <tr
                                key={remit.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                                >
                                    {pageSize * currentPage - pageSize + index + 1}
                                </th>
                                <td className="px-6 py-4">{remit.order_id}</td>
                                <td className="px-6 py-4">{remit.trader}</td>
                                <td className="px-6 py-4">{remit.transporter}</td>
                                <td className="px-6 py-4">{remit.destination}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="text-left flex justify-between space-x-2 w-4">
                                        <button
                                            onClick={() => toggleEditForm(remit.id)}
                                            className=" text-blue-500"
                                        >
                                            {/* Edit button */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                                            </svg>

                                        </button>
                                        <a
                                            onClick={() => handleViewReturn(remit)}
                                            className="text-blue-500 mt-2 size-5"
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
                                        <ReturnDelete
                                            returnId={remit.id}
                                            onDelete={handleDeleteReturn}
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
                        className="mr-2 bg-orange-200 hover:bg-orange-300 text-black font-bold py-1 px-2 rounded-md text-sm"
                    >
                        {/* {"<"} */}
                        Previous
                    </button>
                    {/* Next button */}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-orange-200 hover:bg-orange-300 text-black font-bold py-1 px-2 rounded-md text-sm mr-5"
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
                    <ProcessReturn
                        isOpen={showEditForm}
                        onClose={() => setShowEditForm(false)}
                    />
                )}
                {showViewModal && (
                    <ReturnView
                        returnData={selectedReturn}
                        isOpen={showViewModal}
                        onClose={toggleViewModal}
                    />
                )}
            </Modal>
        </div>
    );
};
