import React, { useState, useEffect } from "react";
import { NavLink, useLocation, Link, Outlet } from "react-router-dom";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const isDarkPage = location.pathname === "/";
  const linkColor = isDarkPage ? "text-white" : "text-black";

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  });

  const links = [
    { name: "الرئيسية", path: "/" },
  
    { name: "تواصل معنا", path: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-white/20 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-16">
            {/* الشعار */}
            <Link to="/" className="flex items-center space-x-2">
              <img src="/images/logo.webp" alt="لوغو" className="h-10" />
            </Link>

            {/* قائمة الديسكتوب */}
            <div className="hidden sm:flex space-x-8 items-center">
              {links.map(({ name, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `relative font-medium ${linkColor} text-lg transition
                     ${isActive ? linkColor : ""}
                     after:block after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 after:mt-1
                     ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
                  }
                >
                  {name}
                </NavLink>
              ))}

              {/* أزرار التسجيل والدخول */}
              {!isAuthenticated && (
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-0 sm:space-x-3">
                  <Link
                    to="/api/auth/login"
                    className={`px-4 py-2 text-sm border border-blue-500 rounded-full font-medium hover:bg-blue-500 hover:text-white transition ${linkColor}`}
                  >
                    سجل الدخول
                  </Link>
                  <Link
                    to="/api/auth/register"
                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition"
                  >
                    دير حساب
                  </Link>
                </div>
              )}
            </div>

            {/* زر الهامبرغر */}
            <div className="sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${isDarkPage ? "text-white" : "text-black"} focus:outline-none`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

   {/* قائمة الموبايل */}
<div
  className={`fixed inset-0 bg-gray-900 z-40 transform transition-transform duration-300 ${
    isMenuOpen ? "translate-x-0" : "translate-x-full"
  } sm:hidden`}
  dir="rtl"
>
  <div className="p-6 flex flex-col space-y-6 h-full text-right items-end">
    <button
      className="self-end text-white text-2xl"  // دير self-end باش يجي اليمين
      onClick={() => setIsMenuOpen(false)}
    >
      ✕
    </button>

    {/* الروابط */}
    <div className="flex flex-col space-y-6 mt-6 w-full">
      {links.map(({ name, path }) => (
        <Link
          key={path}
          to={path}
          onClick={() => setIsMenuOpen(false)}
          className="text-white text-xl font-medium hover:text-red-400 transition text-right block w-full"
        >
          {name}
        </Link>
      ))}
    </div>

    {/* أزرار التسجيل والدخول */}
    {!isAuthenticated && (
      <div className="mt-auto space-y-4 w-full">
        <Link
          to="/api/auth/login"
          onClick={() => setIsMenuOpen(false)}
          className="block text-center px-4 py-3 border border-blue-500 text-blue-400 rounded-full font-medium hover:bg-blue-500 hover:text-white transition"
        >
          سجل الدخول
        </Link>
        <Link
          to="/api/auth/register"
          onClick={() => setIsMenuOpen(false)}
          className="block text-center px-4 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition"
        >
          دير حساب
        </Link>
      </div>
    )}
  </div>
</div>


      {/* محتوى الصفحة */}
      <div className="min-h-screen p-0 m-0 top-0 ">
        <Outlet />
      </div>
    </div>
  );
}
