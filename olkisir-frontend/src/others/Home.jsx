import React from 'react'
import { useAuth } from '../../ContextProvider'
import { Link } from 'react-router-dom'


const Home = () => {
  const {role, token} = useAuth()
  return (
    <div className='text-center bg-slate-400 h-screen'>
     <div className='text-2xl flex justify-between pr-5'> 
     <div className='text-3xl'>
     Welcome to dispatcher
     </div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div><Link to='/register'>Register</Link></div>
     <div>
     <Link to='/login'>Login</Link>
     </div>
       </div>
     
    </div>
  )
}

export default Home
