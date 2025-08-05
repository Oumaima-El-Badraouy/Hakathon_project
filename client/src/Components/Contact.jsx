import React, { useState } from "react";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [alert, setAlert] = useState({ show: false, message: "", isError: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlert = (message, isError = false) => {
    setAlert({ show: true, message, isError });
    setTimeout(() => {
      setAlert({ show: false, message: "", isError: false });
    }, 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/contacts", formData);
      showAlert(res.data.message || "راسلنا توصل بنجاح!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      showAlert(err.response?.data?.message || "وقع مشكل فالإرسال.", true);
    }
  };

  return (
    <div className="min-h-[75vh] bg-white flex items-center justify-center px-4 py-12">
      {alert.show && (
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full px-4 py-3 rounded-md shadow text-sm flex justify-between items-center
            ${alert.isError ? "bg-red-600 text-white" : "bg-green-600 text-white"}
            animate-fade-in-down`}
          style={{ animationDuration: "0.5s" }}
        >
          <span>{alert.message}</span>
          <button
            onClick={() => setAlert({ show: false, message: "", isError: false })}
            className="ml-3 hover:opacity-80"
          >
            ✖
          </button>
        </div>
      )}

      <div className="bg-white  p-6 rounded-xl w-full max-w-lg">
        <h2 className="text-center text-2xl text-gray-800 mb-5 font-bold pt-10">
          تواصل معنا
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1">الإسم الكامل</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="مثلاً: ياسين"
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@site.com"
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">الرسالة ديالك</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="شنو باغي تقول لينا..."
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
          >
            صيفط الرسالة
          </button>
        </form>
      </div>

      <style>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation-name: fade-in-down;
          animation-duration: 0.5s;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}

export default Contact;
