import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (field, value) => {
    setErrors(prev => ({
      ...prev,
      [field]: value ? "" : (field === "email" ? "الإيميل ضروري!" : "كلمة السر ضرورية!")
    }));
  };

  const handleSignupRedirect = () => {
    navigate("/api/auth/register");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrors({
        email: email ? "" : "الإيميل ضروري!",
        password: password ? "" : "كلمة السر ضرورية!"
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", { email, password });
        localStorage.setItem("token", response.data.token); // في login response

      if (response.data.id) {
        localStorage.setItem("userId", response.data.id);
      }

      if (response.data.redirect) {
        navigate(response.data.redirect, { state: response.data.userData });
      } else {
        setErrors(prev => ({
          ...prev,
          form: "ما كايناش وجهة فالرد ديال السيرفر."
        }));
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        form: error.response?.data.message || error.message || "فشل الدخول. حاول مرّة أخرى."
      }));
    }
  };

  return (
    <div className="min-h-[-35vh] flex justify-center items-center via-[#302b63] to-[#24243e] px-2 sm:px-8 py-8 font-[Press_Start_2P] text-white pt-20">
      <div className="w-full max-w-lg p-6 md:p-4 animate-fade-in-up">
        <form
          onSubmit={handleLoginSubmit}
          className="w-full   bg-opacity-0 p-5 rounded-2xl  "
        >
          <h2 className="text-3xl text-center mb-6 text-black drop-shadow-lg font-extrabold"> سجل دخول </h2>
          <p className="text-center text-sm text-gray-500 mb-8">دخل معلوماتك باش تبدا !</p>

          <div className="mb-6">
            <input
              type="email"
              placeholder=" الإيميل ديالك"
              className={`w-full px-4 py-3  text-yellow-300 border ${
                errors.email ? 'border-red-500' : 'border-black'
              } rounded-md placeholder-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200`}
              value={email}
              onBlur={() => validateField("email", email)}
              onChange={(e) => {
                setEmail(e.target.value);
                validateField("email", e.target.value);
              }}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder=" كلمة السر"
              className={`w-full px-4 py-3  text-gray-400 border ${
                errors.password ? 'border-red-500' : 'border-black'
              } rounded-md placeholder-black focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200`}
              value={password}
              onBlur={() => validateField("password", password)}
              onChange={(e) => {
                setPassword(e.target.value);
                validateField("password", e.target.value);
              }}
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          {errors.form && <p className="text-red-400 text-xs mb-4">{errors.form}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-red-400 hover:bg-red-200 text-black font-bold rounded-md transition duration-300 transform hover:scale-105 shadow-xl"
          >
          بدا دابا
          </button>

          <div className="text-center mt-4">
            <NavLink to="/api/auth/forgot-password" className="text-xs text-red-400 hover:underline">
              نسيتي كلمة السر؟
            </NavLink>
          </div>

          <div className="text-center mt-6 text-xs text-gray-300">
            ماعندكش حساب؟{' '}
            <NavLink
              to="/api/auth/register"
              onClick={handleSignupRedirect}
              className="text-red-300 hover:underline"
            >
              صاوب واحد دابا
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
