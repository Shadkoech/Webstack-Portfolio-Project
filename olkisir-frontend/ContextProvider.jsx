import axiosClient from "./AxiosClient";
import axios from "axios";

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
            localStorage.setItem('REFRESH_TOKEN', response.data.refresh);
            // console.log(response.data)
        } catch (error) {
            console.error('Error logging in:', error.response.data);
            // setErrorMessage('Invalid username or password');
            // setIsError(true);
        }
    }
    const logout = async () => {
        try {
            // const refresh_token = localStorage.getItem('REFRESH_TOKEN');
            // const access_token = localStorage.getItem('ACCESS_TOKEN')
            // const config = {
            //     headers: {
            //         'Authorization': `Bearer ${token}`
            //     }
            // };
            // console.log('e', config)
            // await axios.post('http://127.0.0.1:8000/logout/', { refresh_token }, config);
            setRole(0);
            setToken(null);
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('REFRESH_TOKEN');
        } catch (error) {
            console.error('Error logging out:', error.response.data);
        }
    };
    // const logout = () => {
    //     localStorage.removeItem('ACCESS_TOKEN')
    //     localStorage.removeItem('REFRESH_TOKEN')
    //     setToken(null);
    //     setUser({});
    // }

    return (<AuthContext.Provider value={{ login, role, token, logout }}>
        {children}
    </AuthContext.Provider>)

}

const useAuth = () => useContext(AuthContext)
export { AuthProvider, useAuth }