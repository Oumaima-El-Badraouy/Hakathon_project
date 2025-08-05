import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg(null);
    setError(null);
    try {
      const res = await axios.post(`http://localhost:5001/api/auth/reset-password/${token}`, {
        newPassword,
      });
      setMsg(res.data.message);
      setTimeout(() => navigate('/api/auth/login'), 1000); 
    } catch (err) {
      setError(err.response?.data?.message || 'شي حاجة مشات غلط');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">تغيير كلمة السر</h2>
        <input
          type="password"
          required
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          placeholder="كلمة السر الجديدة"
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          حفظ كلمة السر
        </button>
        {msg && <p className="text-green-600 mt-3 text-sm">{msg}</p>}
        {error && <p className="text-red-600 mt-3 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
