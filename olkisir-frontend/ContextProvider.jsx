import axiosClient from "./AxiosClient";
import axios from "axios";

import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState(0)
    const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))
    const [username, setUserName] = useState('')


    const login = async (payload) => {
        try {
            const response = await axiosClient.post('/login/', payload);
            // console.log('User logged in successfully:', response.data);

            // setUser(response.data.role)
            setRole(response.data.role)
            setToken(response.data.access)
            localStorage.setItem('ACCESS_TOKEN', response.data.access);
            localStorage.setItem('REFRESH_TOKEN', response.data.refresh);
            const res = await axiosClient.get('/api/user/details/')
            setUser(res.data)
            // console.log('u', res.data)
        } catch (error) {
            console.error('Error logging in:', error.response.data);
            // setErrorMessage('Invalid username or password');
            // setIsError(true);
        }
    }
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosClient.get('/api/user/details/')
                setUser(response.data)
                setUserName(response.data.username)
            } catch (e) {
                console.error('Error fetching user', error)
            }
        }
        fetchUser()
        // setUser(response.data)

    }, [])

    const logout = async () => {
        try {
            setUser(null);
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

    return (<AuthContext.Provider value={{ login, role, token, logout, user, username }}>
        {children}
    </AuthContext.Provider>)

}

const useAuth = () => useContext(AuthContext)
export { AuthProvider, useAuth }