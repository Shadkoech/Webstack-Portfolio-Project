import React from 'react';
import transporterBg from '/truck.jpg';
import { useAuth } from '../../ContextProvider';



export const Home = () => {
    const {user} = useAuth()
  return (
    <div
      style={{
        backgroundImage: `url(${transporterBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 'calc(100vh - 5rem)', // Adjust height to be below the navbar
        marginTop: '3rem', // Adjust for the navbar height
        marginLeft: '-2rem', // Adjust for the sidebar width
        marginRight: '-2rem',
        position: 'relative',
        zIndex: 1
      }}
    >

     <div className='flex justify-end'>
       <div className='text-white font-bold'>
       <p className=' mx-4 pt-[1rem]'>Welcome, {user?.first_name}</p>
        
        <p className='mx-4 pt-[1rem]'>Transporter</p>
       </div>
     </div>
    </div>
  );
};
