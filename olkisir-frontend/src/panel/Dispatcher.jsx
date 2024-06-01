import { useState } from "react";
import { useAuth } from "../../ContextProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ProductsList } from "../products/productsList";
import { Home } from "../home/dispatcherhome";

import { OrderAdd } from "../orders/orderAdd";
import backgroundImage from "/oilbg6.jpg";
import { TraderList } from "../traders/traderList";
// Transporter imports
import { TransporterList } from "../transporters/transporterList";
import logo from '/logo.png';
import { ChemistList } from "../chemist/chemistList";
// import { useAuth } from "../../ContextProvider";
import { OrderList } from "../orders/orderList";
import { ReturnList } from "../Returns/returnList";
import axios from "axios";



export const Dispatcher = () => {
  // const {user} = useAuth();
  const navigate = useNavigate();
  const { logout, token, user } = useAuth();
  const [activeComponent, setActiveComponent] = useState("home");
  const[returnsLength, setReturnsLength] = useState()

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "products":
        return (
          <div>
            <ProductsList />
          </div>
        );
      case "home":
      default:
        return (
          <div>
            <Home />
          </div>
        );
      case "trader":
        return (
          <div>
            <TraderList />
          </div>
        );
      case "transporter":
        return (
          <div>
            <TransporterList />
          </div>
        );
      case "orders":
        return (
          <div>
            <OrderAdd />
          </div>
        );
      case "chemist":
        return (<div>
          <ChemistList />
        </div>)
      case "orderlist":
        return (
          <div>
            <OrderList />
          </div>
        )
      case 'returns':
        return(
          <div><ReturnList/></div>
        )

    }
  };
  const handleReturns = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/returns/");
        setReturnsLength(response.data.length);
       
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
  return (
    <div>
      <nav
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="bg-orange-400 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 right-0 border-b border-gray-200 dark:border-gray-600 h-20"
      >
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <div className='w-14 h-14 mb-8'>
            <img className='mb-8 rounded-full' src={logo} alt='image'></img>
          </div>
          {/* <div className="text-xl text"><span className="text-xl text-sl-400 font-bold">Welcome,</span> {!user ? 'Loading user....' : user.first_name}</div> */}

          <div>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-end space-x-3">

            {/* <div><span className="text-xl font-bold">Role,</span> {!user ? 'loading role...' : user.role === 1 ? "Admin" : user.role === 2 ? 'Dispatch Chemist' : user.role === 3 ? 'Transporter' : user.role === 4 ? 'Trader' : ""}</div> */}
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-20 left-0 z-40  w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-lime-500 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                onClick={() => setActiveComponent("home")}
                className={`flex items-center p-2 text-gray-900 ${activeComponent === 'home' ? 'bg-gray-100' : ''} rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12l-10-10v6c0 .55-.45 1-1 1s-1-.45-1-1V2L2 12h2v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V12h2z" />
                </svg>
                {/* {user.role} */}
                <span className="ms-3 text-black">Home </span>
              </a>
            </li>
            <li>
              <a
                onClick={() => setActiveComponent("orders")}
                className={`flex items-center p-2 text-gray-900 rounded-lg ${activeComponent === 'orders' ? 'bg-gray-100' : ''}  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Make order
                </span>
                {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
              </a>
            </li>
            <li>
              <a
                onClick={() => setActiveComponent("orderlist")}
                className={`flex items-center p-2 ${activeComponent === 'orderlist' ? 'bg-gray-100' : ''}  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M16 6V4a4 4 0 1 0-8 0v2H5v2h10V6h-1zM8 4a2 2 0 1 1 4 0v2H8V4zm7 8H5v6h2v-4h6v4h2v-6zm-2 2H7v2h6v-2z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Orders
                </span>
              </a>
            </li>


            <li>
              <a
                onClick={() => setActiveComponent("trader")}
                className={`flex items-center p-2 text-gray-900 ${activeComponent === 'trader' ? 'bg-gray-100' : ''}  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Trader</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => setActiveComponent("products")}
                className={`flex items-center p-2 text-gray-900 rounded-lg ${activeComponent === 'products' ? 'bg-gray-100' : ''}  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-black">
                  Products
                </span>
              </a>
            </li>
            <li>
              <a
                onClick={() => setActiveComponent("transporter")}
                className={`flex items-center p-2 text-gray-900 rounded-lg ${activeComponent === 'transporter' ? 'bg-gray-100' : ''}  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-black">
                  Transporter
                </span>
                {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
              </a>
            </li>
            <li>
              <a
                onClick={() => setActiveComponent("chemist")}
                className={`flex items-center p-2 text-gray-900 ${activeComponent === 'chemist' ? 'bg-gray-100' : ''}  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-black">
                  Dispatch Chemists
                </span>
                {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
              </a>
            </li>
            <li>
              <a
              onClick={()=>setActiveComponent('returns')}
                href="#"
                className={`flex items-center p-2 ${activeComponent === 'returns'? 'bg-gray-100': ''} text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-black">
                  Returns
                </span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {returnsLength}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">{renderComponent()}</div>
    </div>
  );
};

export default Dispatcher;