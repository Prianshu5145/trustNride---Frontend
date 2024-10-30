import React, { useState } from 'react';
import Navbar from '../components/Navbar';
const ForgotPassword = () => {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://trustnride-backend-production.up.railway.app/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrMobile }),
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage('Something went wrong, try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div><Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

      {message && <p className="mb-4 text-sm text-blue-500">{message}</p>}

      <input
        type="text"
        value={emailOrMobile}
        onChange={(e) => setEmailOrMobile(e.target.value)}
        placeholder="Enter your email or mobile"
        required
        className="w-full p-2 border rounded-lg mb-4"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full p-2 rounded-lg text-white ${
          loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? 'Sending...' : 'Send Reset Link'}
      </button>
    </form>
  </div></div>
  );
};

export default ForgotPassword;
