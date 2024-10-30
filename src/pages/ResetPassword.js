import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match!');
      setLoading(false);
      return;
    }
    console.log(token);
    try {
      const response = await fetch('https://trustnride-backend-production.up.railway.app/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const result = await response.json();
      setMessage(result.message);

      if (response.ok) {
        setTimeout(() => navigate('/login'), 1000);
      }
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
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

      {message && <p className={`mb-4 text-sm ${message.includes('not match') ? 'text-red-500' : 'text-blue-500'}`}>{message}</p>}

      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
        required
        className="w-full p-2 border rounded-lg mb-4"
      />

      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm new password"
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
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>
    </form>
  </div></div>
  );
};

export default ResetPassword;
