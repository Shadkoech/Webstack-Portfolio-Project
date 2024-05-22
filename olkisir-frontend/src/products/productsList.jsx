import React, { useState } from 'react';
import { ProductEdit } from './productEdit';
import { ProductView } from './productView'; 

export const ProductsList = () => {
    const [activeComponent, setActiveComponent] = useState('');


    const renderCrud = () => {
        switch (activeComponent) {
          case 'edit':
            return <div>
              <ProductEdit/>
            </div>;
          case 'view':
            return <div>
              <ProductView/>
            </div>;
        }
      };
  return (
    <div className="relative overflow-x-auto shadow-md mt-20 sm:rounded-lg">
        <div className='flex justify-between mt-2'>
            <div></div>
            <button className='bg-blue-500 rounded-md py-2 px-4 text-white'>Add</button>
        </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
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
                    Batch number
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro``
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4 text-right">
                    <a onClick={() => setActiveComponent('edit')} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
                <td className="px-6 py-4 text-right">
                    <a onClick={() => setActiveComponent('view')} className="font-medium text-green-600 dark:text-green-500 hover:underline">View</a>
                </td>
                <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4">
                    Laptop PC
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
                <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
                <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-green-600 dark:text-green-500 hover:underline">View</a>
                </td>
                <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td className="px-6 py-4">
                    Black
                </td>
                <td className="px-6 py-4">
                    Accessories
                </td>
                <td className="px-6 py-4">
                    $99
                </td>
                <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
                <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-green-600 dark:text-green-500 hover:underline">View</a>
                </td>
                <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                </td>
            </tr>
        </tbody>
    </table>
    <div className="p-4 sm:ml-64">{renderCrud()}</div>
</div>

  )
}
