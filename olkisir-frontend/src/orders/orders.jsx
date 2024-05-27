import React, { useState, useEffect } from 'react';
import Modal from '../modal/Modal';
import axios from 'axios';

export const Orders = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [traders, setTraders] = useState([]);
  const [transporters, setTransporters] = useState([]);
  const [chemists, setChemists] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedTrader, setSelectedTrader] = useState('');
  const [selectedTransporter, setSelectedTransporter] = useState('');
  const [selectedChemist, setSelectedChemist] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loadingId, setLoadingId] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchTraders();
    fetchTransporters();
    fetchChemists();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('There was an error fetching products:', error.message);
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
      console.error('There was an error fetching dispatch chemist:', error.message);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        loading_id: loadingId,
        destination: destination,
        dispatch_chemist: selectedChemist,
        transporter: selectedTransporter,
        trader: selectedTrader,
        product: selectedProducts
      };
      console.log(payload);
      const response = await axios.post('http://127.0.0.1:8000/api/orders/', payload);
      console.log('Order created:', response.data);
      // This is where you can redirect the user or perform other actions upon successful creation of the order
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Make a new Order 
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
                  value={selectedTrader}
                  onChange={(e) => setSelectedTrader(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                >
                  <option value="">Select a trader</option>
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
                  <option value="">Select a transporter</option>
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
                  <option value="">Select a dispatch chemist</option>
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
                  <li key={index}>
                    {product.product_type} - {product.brand} - {product.SKU} - {product.quantity}
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
            onClick={() => setShowModal(false)}
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
