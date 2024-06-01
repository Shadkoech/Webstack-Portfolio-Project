import React, { useState, useEffect } from "react";
import { useAuth } from "../../ContextProvider";
import { useNavigate } from "react-router-dom";
import { OrderAdd } from "../orders/orderAdd";
import { OrderList } from "../orders/orderList";
import backgroundImage from "/oilbg6.jpg";
import logo from '/logo.png';
import { TraderOders } from "../orders/TraderOders";
import { Home } from "../home/traderhome";

export const TraderDashboard = () => {
  const navigate = useNavigate();
  const { logout, token, user } = useAuth();
  const [activeComponent, setActiveComponent] = useState("home");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "home":
      default:
        return <Home />;
      case "orders":
        return <OrderAdd />;
      case "orderlist":
        return <TraderOders />;
    }
  };

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
            <img className='mb-8 rounded-full' src={logo} alt='logo' />
          </div>
          {/* <div className="text-xl"><span className="text-xl text-sl-400 font-bold">Welcome,</span> {!user ? 'Loading user....' : user.first_name}</div> */}
          <div className="flex items-center justify-end space-x-3">
            {/* <div><span className="text-xl font-bold">Role,</span> {!user ? 'loading role...' : user.role === 4 ? 'Trader' : ""}</div> */}
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
        className="fixed top-20 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-lime-500 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                onClick={() => setActiveComponent("home")}
                className={`flex items-center p-2 text-gray-900 rounded-lg ${activeComponent === 'home'? 'bg-gray-100': ''} dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75  dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12l-10-10v6c0 .55-.45 1-1 1s-1-.45-1-1V2L2 12h2v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V12h2z" />
                </svg>
                <span className="ms-3 text-black">Home</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => setActiveComponent("orderlist")}
                className={`flex items-center p-2 text-gray-900 rounded-lg ${activeComponent === 'orderlist'? 'bg-gray-100': ''} dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
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
                <span className="flex-1 ms-3 whitespace-nowrap">Order list</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => setActiveComponent("orders")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
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
                <span className="flex-1 ms-3 whitespace-nowrap">Initiate Returns</span>
              </a>
            </li>
            
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">{renderComponent()}</div>
    </div>
  );
};
