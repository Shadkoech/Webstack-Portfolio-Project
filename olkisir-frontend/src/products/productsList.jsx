import { useEffect, useState } from 'react';
// import { ProductEdit } from './productEdit';
import { ProductView } from './productView'; 
import { Products } from './products'; // Import the Products component
import axios from "axios";
import { Link } from 'react-router-dom';
import ProductDelete from './productDelete';
import { ProductEdit } from './productEdit';


export const ProductsList = () => {
    const [activeComponent, setActiveComponent] = useState('');
    const [products, setProducts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false); // State to show form or keep it hidden(default)
 
    

    const handleDelete = (productId) => {
        console.log(`Product with ID ${productId} deleted.`);
        // Add your delete logic here
      };
  


    // Toggling the display of the add form
    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    };

    // Function to toggle the display of the edit form
// const toggleEditForm = () => {
//     setShowEditForm(!showEditForm);
// };

    const renderCrud = () => {
        switch (activeComponent) {
          case 'edit':
            return <div>
              <ProductEdit />
            </div>;
          case 'view':
            return <div>
              <ProductView/>
            </div>;
        }
      };

      const handleProducts = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/products/");
            setProducts(response.data);
        } catch (error) {
            console.error("There was an error fetching products from backend:", error.message);
        }
      }
      console.log(products);

      useEffect(() => {
        handleProducts();
      }, []);


  return (
    <div className="relative overflow-x-auto shadow-md mt-20 sm:rounded-lg">
        <div className='flex justify-between mt-2'>
            <div></div>
            {/*<button className='bg-blue-500 rounded-md py-2 px-4 text-white'>Add</button>*/}
            <button onClick={toggleAddForm} className='bg-blue-500 rounded-md py-2 px-4 text-white'>Add</button>
        </div>
        {/* Render the add form (Products component) conditionally */}
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
    {products && products.map((product) => (
        <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product.id}
            </th>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product.product_type}
            </th>
            <td className="px-6 py-4">
                {product.brand}
            </td>
            <td className="px-6 py-4">
                {product.SKU}
            </td>
            <td className="px-6 py-4">
                {product.price}
            </td>
            <td className="px-6 py-4 text-right">
                {/* <a onClick={() => setActiveComponent('edit')} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                <Link to={`/editProduct/${product.id}`}><button className='bg-blue-500 text-white py-2 px-4'>Edit</button></Link>
                
            </td>
            <td className="px-6 py-4 text-right">
                {/* <a onClick={() => setActiveComponent('view')} className="font-medium text-green-600 dark:text-green-500 hover:underline">View</a> */}
                <Link to={`/viewProduct/${product.id}`}><button className='text-green-500'>view</button></Link>
                
            </td>
            <td className="px-6 py-4 text-right">
                {/* <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a> */}
                {/* <Link to={`/deleteProduct/${product.id}`}><button className='text-red-500'>Delete</button></Link> */}
                <ProductDelete productId={product.id} onDelete={handleDelete} />

            </td>
        </tr>
    ))}
</tbody>

    </table>
    <div className="p-4 sm:ml-64">{renderCrud()}</div>
</div>

  )
}