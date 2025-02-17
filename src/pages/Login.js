import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // To store success/error message from backend
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Disable scrolling
    document.body.classList.add('no-scroll');

    // Cleanup function to enable scrolling again
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setMessage(''); // Clear previous messages

    try {
      const response = await axios.post('https://trustnride-backend.onrender.com/api/auth/login', { email, password });
      const { token, role, message } = response.data; // Assuming backend sends a message too
      login(token, role); // Save token and role in context
      setMessage(message); // Set success message from backend (if available)
      setTimeout(() => navigate('/'), 300); // Use navigate instead of history.push with delay
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Show backend error message
      } else {
        setError('Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="relative bg-cover bg-center min-h-screen flex justify-center items-center opacity-90">
        {/* Background Image for Mobile */}
        <div className="absolute inset-0 bg-loginSignup-mobile lg:hidden opacity-30" />
        {/* Background Image for Laptop */}
        <div className="absolute inset-0 hidden lg:block bg-loginSignup-desktop opacity-30" />

        <form className="bg-white bg-opacity-80 shadow-lg rounded-lg p-8 w-full max-w-md mx-auto relative z-10 border border-gray-300" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          {/* Display Backend Error or Success Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {message && <p className="text-green-500 text-center">{message}</p>}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Registered Email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password <span className="text-red-500">*</span></label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              required
            />
          </div>

          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200" type="submit">Login</button>

          <p className="mt-4 text-center">
            Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
          </p>
          <p className="text-center">
            Forgot your password? <a href="/forgot-Password" className="text-blue-500 hover:underline">Reset Password</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
