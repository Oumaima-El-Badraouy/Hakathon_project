import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (field, value) => {
    setErrors(prev => ({
      ...prev,
      [field]: value ? "" : `حقل ${field} ضروري!`
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const champs = { name, email, password, passwordConfirmation };
    const newErrors = {};

    Object.entries(champs).forEach(([key, value]) => {
      if (!value) newErrors[key] = `حقل ${key} ضروري!`;
    });

    if (password !== passwordConfirmation) {
      setErrors(prev => ({
        ...prev,
        passwordConfirmation: "كلمات السر ماشي متشابهين"
      }));
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post('http://localhost:5001/api/auth/register', {
        name,
        email,
        password,
        passwordConfirmation,
        fullNumber: phone,
      });

      navigate('/api/auth/login');
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        form: err.response?.data.message || "ما قدرناش نسجلوك. حاول مرّة أخرى."
      }));
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-2 sm:px-8 py-8 font-[Press_Start_2P] text-white pt-20">
      <div className="w-full max-w-lg p-6 md:p-4 animate-fade-in-up">
        <form
          onSubmit={handleSubmit}
          className="w-full bg-opacity-0 p-5 rounded-2xl"
        >
          <h2 className="text-3xl text-center mb-6 text-black drop-shadow-lg font-extrabold">سجل حساب جديد</h2>

          <div className="mb-4">
            <input
              type="text"
              placeholder=" الإسم"
              className={`w-full px-4 py-3  text-black border ${
                errors.name ? 'border-red-500' : 'border-black'
              } rounded-md placeholder-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validateField("name", e.target.value);
              }}
              onBlur={() => validateField("name", name)}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder=" الإيميل"
              className={`w-full px-4 py-3  text-yellow-300 border ${
                errors.email ? 'border-red-500' : 'border-black'
              } rounded-md placeholder-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateField("email", e.target.value);
              }}
              onBlur={() => validateField("email", email)}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder=" كلمة السر"
              className={`w-full px-4 py-3  text-gray-400 border ${
                errors.password ? 'border-red-500' : 'border-black'
              } rounded-md placeholder-black focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateField("password", e.target.value);
              }}
              onBlur={() => validateField("password", password)}
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder=" عاود كلمة السر"
              className={`w-full px-4 py-3  text-gray-400 border ${
                errors.passwordConfirmation ? 'border-red-500' : 'border-black'
              } rounded-md placeholder-black focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200`}
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            {errors.passwordConfirmation && <p className="text-red-400 text-xs mt-1">{errors.passwordConfirmation}</p>}
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder=" رقم الهاتف (اختياري)"
              className="w-full px-4 py-3  text-yellow-300 border border-black rounded-md placeholder-red-500 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
              value={phone}
              
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {errors.form && <p className="text-red-400 text-xs mb-4">{errors.form}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-red-400 hover:bg-red-200 text-black font-bold rounded-md transition duration-300 transform hover:scale-105 shadow-xl"
          >
        بدا دابا 
          </button>

          <div className="text-center mt-6 text-xs text-gray-700">
            عندك حساب؟{' '}
            <NavLink to="/api/auth/login" className="text-red-300 hover:underline">
              دخل دابا
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
