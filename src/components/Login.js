import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Use Link for client-side routing
import { AuthContext } from '../context/AuthContext'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); 

    const handleLogin = (e) => {
        e.preventDefault();

        // Get stored credentials from local storage
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');
        const storedUsername = localStorage.getItem('username');

        // Check if both fields are filled
        if (!email || !password) {
            setErrorMessage('Please fill in both email and password.');
            return;
        }

        // Validate entered credentials against stored ones
        if (email === storedEmail && password === storedPassword) {
            setErrorMessage('');
            login(storedUsername); // Log the user in with username
            navigate('/dashboard'); // Redirect to dashboard
        } else {
            setErrorMessage('Invalid credentials, please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <input
                    className="mb-4 w-full px-3 py-2 border rounded-md focus:outline-none"
                    type="email"
                    aria-label="Email" // Add aria-label for accessibility
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="mb-4 w-full px-3 py-2 border rounded-md focus:outline-none"
                    type="password"
                    aria-label="Password" // Add aria-label for accessibility
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && (
                    <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
                )}
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none" type="submit">
                    Login
                </button>
                <div className="mt-4 text-center">
                    <span className="text-sm">Don't have an account? </span>
                    {/* Use Link instead of <a> to prevent full page reload */}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign up here
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
