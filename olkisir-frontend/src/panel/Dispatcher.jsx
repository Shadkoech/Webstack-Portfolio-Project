import React from 'react'
import { useAuth } from '../../ContextProvider'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


export const Dispatcher = () => {
  const navigate = useNavigate()
  const { logout, token } = useAuth()

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token, navigate])

  return (
    <div className='bg-green-400 flex justify-between h-screen p-2'>
      <div className='text-4xl'> Dispatcher Panel </div>
      <div><button className='bg-indigo-500 text-white font-bold p-1 rounded' onClick={logout}>Logout</button></div>
    </div>
  )
}

export default Dispatcher
