import { useState } from "react";
import axios from "axios";

export const Products = () => {
  const [product_type, setProductType] = useState("");
  const [brand, setBrand] = useState("");
  const [SKU, setSKU] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false); // Tracking whether a request is currently being processed
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const productData = {
      product_type: product_type,
      brand: brand,
      SKU: SKU,
      price: price,
    };

    setLoading(true); // Loading set to true whilst submission is underway

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/products/", productData);
      console.log("Product added successfully:", response.data);
      setMessage("Product added successfully");

      // Clearing the success message after 2 seconds so that the user has a chance to add another product
      setTimeout(() => {
        setMessage("");
      }, 5000);

    } catch (error) {
      console.error("There was an error adding the product:", error);
      setMessage("Failed to add product. Please try again.");
    } finally {
      setLoading(false); // loading set back to false after response is received
    }
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new product
          </h2>
          {message && <p className={message.includes("error") ? "text-red-500" : "text-green-500"}>{message}</p>}
          <form action="#" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Type
                </label>
                <select
                  name="product_type"
                  id="category"
                  onChange={(event) => setProductType(event.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected>Select type</option>
                  <option>Cooking Oil</option>
                  <option>Cooking Fat</option>
                  <option>Soap</option>
                  <option>Stearine</option>
                  <option>Olein</option>
                </select>
              </div>
              <div className="w-full">
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  onChange={(event) => setBrand(event.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter brand"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  SKU
                </label>
                <input
                  type="text"
                  name="SKU"
                  id="SKU"
                  onChange={(event) => setSKU(event.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Choose the quantity unit"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="item-weight"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  onChange={(event) => setPrice(event.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Input product price"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading} // Disable button while loading
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              {loading ? "Adding..." : "Add product"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};



