import React from 'react';
import { useAuth } from '../../ContextProvider';
import dispatcherBg from '/warehouse.jpg'


export const Home = () => {
    const {user} = useAuth()
  return (
    <div
      style={{
        backgroundImage: `url(${dispatcherBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 'calc(100vh - 5rem)', // Adjust height to be below the navbar
        marginTop: '3.5rem', // Adjust for the navbar height
        marginLeft: '-1rem', // Adjust for the sidebar width
        marginRight: '-1rem',
        position: 'relative',
        zIndex: 1
      }}
    >

     <div className='flex justify-end'>
       <div className='text-white font-bold'>
       <p className=' mx-4 pt-[1rem]'>Welcome, {user?.first_name}</p>
        
        <p className='mx-4 pt-[1rem]'>Dispatcher</p>
       </div>
     </div>
    </div>
  );
};
