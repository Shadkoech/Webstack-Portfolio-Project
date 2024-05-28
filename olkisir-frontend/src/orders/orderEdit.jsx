import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import Modal from "../modal/Modal";

export const OrderEdit = ({ orderId, isOpen, onClose, onUpdateOrder }) => {
  const [orderData, setOrderData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [traders, setTraders] = useState([]);
  const [transporters, setTransporters] = useState([]);
  const [chemists, setChemists] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loadingId, setLoadingId] = useState('')
  const [destination, setDestination] = useState()
  const [selectedTransporter, setSelectedTransporter] = useState('')
  const [selectedChemist, setSelectedChemist] = useState('')
  const [selectedTrader, setSelectedTrader] = useState('')



  useEffect(() => {
    fetchProducts();
    fetchTraders();
    fetchTransporters();
    fetchChemists();
  }, []);

  useEffect(() => {
    if (orderId) {
      axios.get(`http://127.0.0.1:8000/api/orders/${orderId}/`)
        .then(response => {
          setOrderData(response.data);
          setSelectedProducts(response.data.product || []);
        })
        .catch(error => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [orderId]);

  // const [loadingId, setLoadingId] = useState(orderData.loading_id)

  // setLoadingId(orderData.loading_id)
  console.log(selectedProducts);

  useEffect(() => {
    console.log("samw", orderData); // Logs the updated orderData
    // const [loadingId, setLoadingId] = useState(orderData.loading_id)
  }, [orderData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let response;
      const payload = {
        loading_id: loadingId,
        destination: destination,
        dispatch_chemist: selectedChemist,
        transporter: selectedTransporter,
        trader: selectedTrader,
        product: selectedProducts
      };
      console.log('payload', payload)
      if (orderId) {
        response = await axios.put(`http://127.0.0.1:8000/api/orders/${orderId}/`, payload);
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

  const fetchTraders = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/traders/');
      setTraders(response.data);
    } catch (error) {
      console.error('There was an error fetching traders:', error.message);
    }
  };

  const fetchTransporters = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/transporters/');
      setTransporters(response.data);
    } catch (error) {
      console.error('There was an error fetching transporters:', error.message);
    }
  };


  const fetchChemists = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/dispatchers/');
      setChemists(response.data);
    } catch (error) {
      console.error('There was an error fetching dispatch chemists:', error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('There was an error fetching products:', error.message);
    }
  };



  const handleAddProduct = () => {
    if (selectedProduct && quantity > 0) {
      const product = products.find((p) => p.product_type === selectedProduct);
      setSelectedProducts((prevProducts) => [
        ...prevProducts,
        { ...product, quantity },
      ]);
      setSelectedProduct('');
      setQuantity(1);
      setShowModal(false);
    }
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrderData({ ...orderData, [name]: value });
  };

  if (!isOpen) return null;

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Update a Order
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="loading_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Loading ID
                </label>
                <input
                  type="text"
                  name="loading_id"
                  id="loading_id"
                  value={orderData.loading_id}
                  onChange={(e) => setLoadingId(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Loading ID"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="trader"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Trader
                </label>
                <select
                  name="trader"
                  id="trader"
                  // value={orderData.trader['trader_name']}
                  onChange={(e) => setSelectedTrader(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                >
                  <option> {orderData.trader?.trader_name} - {orderData.trader?.trader_address} - {orderData.trader?.contact}</option>
                  {traders.map((trader) => (
                    <option key={trader.id} value={trader.id}>
                      {trader.trader_name} - {trader.trader_address} - {trader.contact}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <label
                  htmlFor="product"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product
                </label>
                <input
                  type="text"
                  name="product"
                  id="product"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Choose the product"
                  onClick={() => setShowModal(true)}
                  readOnly
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="transporter"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Transporter
                </label>
                <select
                  name="transporter"
                  id="transporter"
                  value={selectedTransporter}
                  onChange={(e) => setSelectedTransporter(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                >
                  <option value="">{orderData.transporter?.transporter_name} - {orderData.transporter?.representative} - {orderData.transporter?.contact}</option>
                  {transporters.map((transporter) => (
                    <option key={transporter.id} value={transporter.id}>
                      {transporter.transporter_name} - {transporter.representative} - {transporter.contact}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="destination"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  id="destination"
                  value={orderData.destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Input destination"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="chemist"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Dispatch Chemist
                </label>
                <select
                  name="chemist"
                  id="chemist"
                  value={selectedChemist}
                  onChange={(e) => setSelectedChemist(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                >
                  <option value="">{orderData.dispatch_chemist?.chemist_name} - {orderData.dispatch_chemist?.contact}</option>
                  {chemists.map((chemist) => (
                    <option key={chemist.id} value={chemist.id}>
                      {chemist.chemist_name} - {chemist.contact}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Selected Products</h3>
              <ul>
                {selectedProducts.map((product, index) => (
                  <li className='space-x-3'
                    key={index}>
                    <span>{product.product_type} - {product.brand} - {product.SKU} - {product.quantity}</span>
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      className="bg-white text-red-500 px-2 py-1 rounded"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="8" stroke="currentColor" class="size-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>

                    </button>

                  </li>
                ))}
              </ul>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Create order
            </button>
          </form>
        </div>
      </section>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-4">Select Products</h2>
        <div className="mb-4">
          <label htmlFor="product" className="block text-sm font-medium text-gray-700">
            Product
          </label>
          <select
            id="product"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.product_type}>
                {product.product_type} - {product.brand} - {product.SKU}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            min="1"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleAddProduct}
            className="bg-primary-500 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>
      </Modal>
    </div>
  );
};


OrderEdit.propTypes = {
  orderId: PropTypes.any, // Define the type for productId
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};