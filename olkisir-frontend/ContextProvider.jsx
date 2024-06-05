import axiosClient from "./AxiosClient";
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(0);
    const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [username, setUserName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const login = async (payload) => {
        try {
            const response = await axiosClient.post('/login/', payload);
            setRole(response.data.role);
            setToken(response.data.access);
            localStorage.setItem('ACCESS_TOKEN', response.data.access);
            localStorage.setItem('REFRESH_TOKEN', response.data.refresh);
            const res = await axiosClient.get('/api/user/details/');
            setUser(res.data);
            setErrorMessage('');
            setIsError(false);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.non_field_errors) {
                setErrorMessage('Invalid username or password');
                setIsError(true);
            } else {
                setErrorMessage('An error occurred. Please try again.');
                setIsError(true);
            }
            // Automatically hide the error message after 5 seconds
            setTimeout(() => {
                setIsError(false);
                setErrorMessage('');
            }, 3000);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosClient.get('/api/user/details/');
                setUser(response.data);
                setUserName(response.data.username);
            } catch (e) {
                console.error('Error fetching user', e);
            }
        };
        if (token) fetchUser();
    }, [token]);

    return (
        <AuthContext.Provider value={{ login, role, token, logout, user, username, errorMessage, isError, setErrorMessage, setIsError }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
