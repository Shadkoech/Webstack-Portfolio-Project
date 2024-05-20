import React from 'react'
import { useAuth } from '../../ContextProvider'

export const Dispatcher = () => {
  const { logout } = useAuth()
  return (
    <div><div className='bg-green-700 text-5xl'>Welcome to Admin Panel</div><button onClick={logout}>logout</button></div>
    
  )
}
