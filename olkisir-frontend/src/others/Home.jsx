// import React from 'react'
// import { useAuth } from '../../ContextProvider'
// import { Link } from 'react-router-dom'
// import backgroundImage from "/oilbg6.jpg";


// const Home = () => {
//   const { role, token } = useAuth()
//   return (
//     <div className='text-center bg-slate-400 h-screen'
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         // Optional: Ensures background stays fixed while content scrolls
//         backgroundAttachment: "fixed",
//       }}
//     >
//       <div className='text-2xl flex justify-between pr-5'>
//         <div className='text-3xl text-neutral-400 font-bold hover:text-neutral-200'>
//          Cooking Oil Dispatcher
//         </div>
//         <div></div>
//         <div></div>
//         <div></div>
//         <div></div>
//         <div></div>
//         {token? <Link to='/dispatcher'>Dashboard</Link>: <div className='flex space-x-8'>
//         <div className='text-indigo-500 bg-white mt-2 rounded p-1'><Link to='/register'>Register</Link></div>
//         <div className='text-indigo-500 bg-white mt-2 rounded p-1'>
//           <Link to='/login'>Login</Link>
//         </div>
//           </div>}
//       </div>

//     </div>
//   )
// }

// export default Home

import React from 'react';
import { useAuth } from '../../ContextProvider';
import { Link } from 'react-router-dom';
import backgroundImage from "/oilbg6.jpg";

const Home = () => {
  const { token } = useAuth();

  return (
    <div
      className='bg-slate-400 h-screen'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // Optional: Ensures background stays fixed while content scrolls
        backgroundAttachment: "fixed",
      }}
    >
      <div className='flex flex-col items-center justify-center h-full'>
        <div className='text-3xl text-black font-bold text-center mb-8'>
          Welcome to Olkisir,
        </div>
        <div className='text-2xl text- font-bold text-center mb-8'>
          Your comprehensive solution for efficient sales order management and streamlined returns processing.
        </div>
        <div>
          {token ? (
            <Link to='/dispatcher' className='text-white hover:text-indigo-200'>
              Dashboard
            </Link>
          ) : (
            <div className='flex space-x-8'>
              <div className='text-indigo-500 bg-white mt-2 rounded p-1'>
                <Link to='/register'>Register</Link>
              </div>
              <div className='text-indigo-500 bg-white mt-2 rounded p-1'>
                <Link to='/login'>Login</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
