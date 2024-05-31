import React, { useEffect, useState } from "react";
import { TransporterOderView } from "./TransporterOrderView";
import Modal from "../modal/Modal";
import axios from "axios";
import { ReturnsForm } from "../Returns/returnsForm";
import { useAuth } from "../../ContextProvider";

// const orderId = 2;

export const TransporterOrders = () => {
  const {user, username} = useAuth()
  console.log('user', user)
  const [activeComponent, setActiveComponent] = useState("");
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); // Setting the pagesize for pagination
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [transporterId, setTransporterId] = useState('')



  const totalPages = Math.ceil(orders.length / pageSize); // calculating total no of pages

  const toggleViewModal = () => {
    setShowViewModal(!showViewModal);
  };

  const toggleReturnForm = (orderId) => {
    setSelectedOrderId(orderId);
    setShowReturnForm(!showReturnForm);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    toggleViewModal();
  };

  const renderCrud = () => {
    switch (activeComponent) {
      case "view":
        return (
          <div>
            <TransporterOderView />
          </div>
        );
      default:
        return null;
      case "initiatereturns":
        return (
          <div>
            <ReturnsForm />
          </div>
        );
    }
  };
  console.log('username', username)
  const fetchTransporterId = async()=>{
    try{
      const transporterData = await axios.get('http://127.0.0.1:8000/api/transporters/by-username/', {params: {
        username: username      
    }})
  
    setTransporterId(transporterData.data.transporter_id)
    
    }
    catch(error){
      console.error(error.message)
    }
  }
  
  useEffect(() => {
    if (username){
      fetchTransporterId()
    }
  }, [username]);
  console.log('ti', transporterId)

  console.log('transporter', transporterId)

  const handleOrders = async (transporterId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/orders/${transporterId}/transporter_orders/`
      );
      setOrders(response.data);
   
    } catch (error) {
      console.error(
        "There was an error fetching products from backend:",
        error.message
      );
    }
  };

  useEffect(() => {
    if (transporterId){
      handleOrders(transporterId);
    }
    
  }, [transporterId]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedOrders = orders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );


  return (
    <div className="relative overflow-x-auto shadow-md mt-20 sm:rounded-lg mr-20">
      <div className="rounded-lg overflow-hidden border border-gray-500">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-black uppercase bg-orange-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Loading ID
              </th>
              <th scope="col" className="px-6 py-3">
                Destination
              </th>
              <th scope="col" className="px-6 py-3">
                Time Dispatched
              </th>
              <th scope="col" className="px-6 py-3">
                Transporter
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedOrders.map((order, index) => (
              <tr
                key={order.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                >
                  {pageSize * currentPage - pageSize + index + 1}
                </th>
                <td className="px-6 py-4">{order.loading_id}</td>
                <td className="px-6 py-4">{order.destination}</td>
                <td className="px-6 py-4">{order.time_dispatched}</td>
                <td className="px-6 py-4">
                  {order.transporter.transporter_name}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="text-left flex justify-between space-x-3 w-4">
                    <a
                      onClick={() => handleViewOrder(order)}
                      className="text-blue-500 mt-2 size-5"
                    >
                      {/* View button */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </a>
                  
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    <div className="p-4 sm:ml-64">{renderCrud()}</div>

    <Modal
        isOpen={showViewModal}
    >
        {showViewModal && (
            <TransporterOderView
                orderData={selectedOrder}
                isOpen={showViewModal}
                onClose={toggleViewModal}
            />
        )}
    </Modal>
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
            Previous
          </button>
          {/* Next button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-orange-200 hover:bg-orange-300 text-black font-bold py-1 px-2 rounded-md text-sm mr-5"
          >
            Next
          </button>
        </div>
      </div>

      <div className="p-4 sm:ml-64">{renderCrud()}</div>

      {/* <Modal isOpen={showViewModal} onClose={toggleViewModal}>
        {showViewModal && (
          <TransporterOderView
            productData={selectedOrder}
            isOpen={showViewModal}
            onClose={toggleViewModal}
          />
        )}
      </Modal> */}

      {/* <Modal isOpen={showReturnForm} onClose={toggleReturnForm}>
        {showReturnForm && (
          <ReturnsForm
            orderData={selectedOrderId}
            isOpen={showReturnForm}
            onClose={toggleReturnForm}
          />
        )}
      </Modal> */}
    </div>
  );
};
