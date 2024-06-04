import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import axiosClient from '../AxiosClient';
import backgroundImage from "/oilbg6.jpg";
import axios from 'axios'

const Register = () => {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState(3); // Default role set to DRIVER
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isError, setIsError] = useState(false);

    const roles = [
        { value: 1, label: 'Admin' },
        { value: 2, label: 'Dispatch_chemist' },
        { value: 3, label: 'Transporter' },
        { value: 4, label: 'Trader' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username === '' || email === '' || password === '' || firstName === '' || lastName === '' || role === '') {
            setErrorMessage('All fields are required');
            setIsError(true);
        } else if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            setIsError(true);
        }
        else {
            const payload = {
                username,
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                role,
            };
            console.log(payload)
            try {
                const response = await axios.post('http://127.0.0.1:8000/register/', payload);
                console.log('User registered successfully:', response.data);
                navigate('/login')
                // return response.data;

            } catch (error) {
                console.error('Error registering user:', error.response.data);
                setIsError(true)
                setErrorMessage('Failed to Register')
                throw error.response.data;
            }
        }
    };

    useEffect(() => {
        if (isError) {
            const timer = setTimeout(() => {
                setIsError(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isError]);

    const handleShowPassword = () => {
        setShowPass(!showPass);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen"

            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                // Optional: Ensures background stays fixed while content scrolls
                backgroundAttachment: "fixed",
            }}>
            <form className='border p-10 my- md:w-4/12 w-8/12  bg-lime-300  rounded-md' onSubmit={handleSubmit}>
                <img className="w-10 mx-auto mb- rounded-full" src="/logo.png" alt="Tiger" />

                {isError && (
                    <motion.div
                        initial={{ scale: 0, y: 0 }}
                        animate={{ scale: 1, y: 2 }}
                        duration={{ duration: 4 }}
                        className='bg-red-600 bsolute w-/12 text-center p-1 text-white rounded'>
                        {errorMessage}
                    </motion.div>
                )}
                <div className='flex justify-around'>
                    {/* <p className='text-center text-xl text-neutral-300 font-bold'>Register Here</p> */}
                    {/* <p className='' title='Home'>
                        <Link to='/'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Link>
                    </p> */}
                </div>
                <div className=''>
                    <label className="mb- text-black" htmlFor="username">Username</label><br />
                    <input
                        type="text"
                        name='username'
                        onChange={(e) => setUsername(e.target.value)}
                        className='w-full p-1 mb-1 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300'
                        required
                    />
                </div>
                <div className=''>
                    <label className='mb- text-black'>Email</label><br />
                    <input
                        type="email"
                        name='email'
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full p-1 mb-1 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300'
                        required
                    />
                </div>
                <div className=''>
                    <label className='mb- text-black'>First Name</label><br />
                    <input
                        type="text"
                        name='first_name'
                        onChange={(e) => setFirstName(e.target.value)}
                        className='w-full p-1 mb-1 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300'
                        required
                    />
                </div>
                <div className=''>
                    <label className='mb- text-black'>Last Name</label><br />
                    <input
                        type="text"
                        name='last_name'
                        onChange={(e) => setLastName(e.target.value)}
                        className='w-full p-1 mb-1 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300'
                        required
                    />
                </div>
                <div className=''>
                    <label className='mb- text-black'>Password</label><br />
                    <input
                        type={showPass ? 'text' : 'password'}
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full p-1 mb-1 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300'
                        required
                    />
                </div>
                <div className=''>
                    <label className='mb- text-black'>Confirm Password</label><br />
                    <input
                        type={showPass ? 'text' : 'password'}
                        name='confirm_password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='w-full p-1 mb-1 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300'
                        required
                    />
                </div>

                <div className=''>
                    <label className='mb- text-black'>Role</label><br />
                    <select
                        name='role'
                        value={role}
                        onChange={(e) => setRole(Number(e.target.value))}
                        className='w-full p-1 mb-1 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300'
                        required
                    >
                        <option value="" key="">Chose Role</option>
                        {roles.map((role) => (
                            <option key={role.value} value={role.value}>
                                {role.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='text-blackspace-x-1 text-xs p-2'>
                    <input
                        type="checkbox"
                        name='checkbox'
                        checked={showPass}
                        onChange={handleShowPassword}
                    />
                    <span>Show password</span>
                </div>
                <div className='w-full flex flex-col items-center'>
                    <button type="submit" className='bg-indigo-700 hover:bg-pink-700 text-white font-bold w-10/12 rounded font-bold text-neutral-300 hover:bg-green-500 h-8 mb-2'>
                        Register
                    </button>
                    <Link className="text-xs hover:font-bold text-black underline" to="/login">
                        Already Registered?
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
