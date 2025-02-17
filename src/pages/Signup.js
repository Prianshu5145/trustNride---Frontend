import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer'); // Default role
  const [message, setMessage] = useState(''); // Store success or error messages
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader

    const userData = { name, email, mobile, password, role };

    try {
      const response = await fetch('https://trustnride-backend.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json(); // Parse response data

      if (response.ok) {
        setMessage(result.message || 'User signed up successfully!');
        setTimeout(() => navigate('/login'), 1000); // Redirect to login
      } else {
        setMessage(result.message || 'Error signing up');
      }
    } catch (error) {
      console.error('Failed to sign up:', error);
      setMessage('Failed to sign up. Please try again later.');
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div><Navbar/><div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-96"
    >
      <h2 className="text-2xl font-bold mb-2">Signup</h2>

      {message && (
        <p className={`mb-4 text-sm ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}

      <p className="text-red-500 mb-6 text-sm">
        Please enter a memorable email ID and password. These will be used for login.
      </p>

      <div>
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded-lg"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded-lg"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Mobile <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          className="w-full p-2 border rounded-lg"
          placeholder="Enter your mobile number"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded-lg"
          placeholder="Enter your password"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Role <span className="text-red-500">*</span>
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="w-full p-2 border rounded-lg"
        >
          <option value="buyer">Buyer</option>
          
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full p-2 rounded-lg ${
          loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
      >
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </form>

    {loading && (
      <div className="fixed inset-0 bg-white bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-blue-700 font-medium">Please wait...</p>
        </div>
      </div>
    )}
  </div></div>
  );
};

export default Signup;
