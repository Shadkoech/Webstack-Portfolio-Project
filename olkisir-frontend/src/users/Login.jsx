import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../ContextProvider';
import backgroundImage from "/oilbg6.jpg";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, token, role, errorMessage, isError } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            // Client-side validation
            setErrorMessage('Username and password are required');
            setIsError(true);
        } else {
            const payload = { email, password };
            await login(payload);
        }
    };

    useEffect(() => {
        if (token) {
            if (role === '4') {
                navigate('/traderdashboard');
            } else if (role === '3') {
                navigate('/transporterdashboard');
            } else {
                navigate('/dispatcher');
            }
        }
    }, [token, navigate, role]);

    return (
        <div className="flex flex-col items-center justify-center h-screen"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
            }}>
            <div className="w-full max-w-xs m-auto bg-lime-300 rounded-md p-5">
                <header>
                    <img className="w-20 mx-auto mb-5 rounded-full" src="/logo.png" alt="Tiger" />
                </header>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-2 text-black" htmlFor="username">Email</label>
                        <input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                            type="text"
                            name='email'
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label className="block mb-2 text-black" htmlFor="password">Password</label>
                        <input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit" value="Submit">Login</button>
                    </div>
                    {isError && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </form>
                <footer>
                    <Link className="text-black hover:text-pink-700 text-sm float-left" to="#">Forgot Password?</Link>
                    <Link className="text-black hover:text-pink-700 text-sm float-right" to="/register" >Create Account</Link>
                </footer>
            </div>
        </div>
    );
};

export default Login;
