import axiosClient from "./AxiosClient";

import React, { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [role, setRole] = useState(0)
    const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))
    

    const login = async (payload) => {
        try {
            const response = await axiosClient.post('/login/', payload);
            // console.log('User logged in successfully:', response.data);
            
            // setUser(response.data.role)
            setRole(response.data.role)
            setToken(response.data.access)
            localStorage.setItem('ACCESS_TOKEN', response.data.access);
            // console.log(response.data)
        } catch (error) {
            console.error('Error logging in:', error.response.data);
            // setErrorMessage('Invalid username or password');
            // setIsError(true);
        }
    }

    const logout = async () => {
        try {
            const accessToken = localStorage.getItem('ACCESS_TOKEN');
            const refreshToken = localStorage.getItem('REFRESH_TOKEN');
            await axiosClient.post('/logout/', {accessToken});
            localStorage.removeItem('ACCESS_TOKEN', 'REFRESH_TOKEN');
        } catch (error) {
            console.error(error.message)
        }
    }

    return (<AuthContext.Provider value={{ login, role, token, logout }}>
        {children}
    </AuthContext.Provider>)

}

const useAuth = () => useContext(AuthContext)
export { AuthProvider, useAuth }