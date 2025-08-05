import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicineCRUD = () => {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({
    name: '',
    dosage: '',
    frequency: '',
    time: '',
    startDate: '',
    endDate: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const API_BASE = 'http://localhost:5001/api/medications';

  const fetchMedicines = async () => {
    try {
      const res = await axios.get(API_BASE, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMedicines(res.data);
    } catch (err) {
      console.error('كاين مشكل ف تحميل الدوا:', err);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        time: form.time.split(',').map(t => t.trim())
      };

      if (editingId) {
        await axios.put(`${API_BASE}/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        await axios.post(API_BASE, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }

      setForm({ name: '', dosage: '', frequency: '', time: '', startDate: '', endDate: '' });
      setEditingId(null);
      setShowForm(false);
      fetchMedicines();
    } catch (err) {
      console.error('كاين مشكل ف الحفظ:', err);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('واش متأكد باغي تحيد هاد الدوا؟')) return;
    try {
      await axios.delete(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchMedicines();
    } catch (err) {
      console.error('كاين مشكل ف الحذف:', err);
    }
  };

  const handleEdit = med => {
    setForm({
      name: med.name,
      dosage: med.dosage,
      frequency: med.frequency,
      time: med.time.join(', '),
      startDate: med.startDate?.slice(0, 10),
      endDate: med.endDate?.slice(0, 10),
    });
    setEditingId(med._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // تنقز للفورم
  };

  const handleCancel = () => {
    setForm({ name: '', dosage: '', frequency: '', time: '', startDate: '', endDate: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 p-6 pt-10 bg-gradient-to-r from-indigo-50 via-white to-pink-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-indigo-600">
        🩺 تسيير الدوايات
      </h1>

      {!showForm && (
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 transition"
          >
            + زيد دوا جديد
          </button>
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-5 mb-10"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="سمية الدوا"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            name="dosage"
            value={form.dosage}
            onChange={handleChange}
            placeholder="الجرعة (مثلاً: 500mg)"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            name="frequency"
            value={form.frequency}
            onChange={handleChange}
            placeholder="شحال من مرة ف النهار (مثلاً: جوج مرات)"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            name="time"
            value={form.time}
            onChange={handleChange}
            placeholder="الأوقات (مثلاً: 08:00, 20:00)"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <div className="md:col-span-3 flex justify-between items-center mt-2">
            <button
              type="submit"
              className="bg-pink-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-pink-700 transition"
            >
              {editingId ? 'بدّل الدوا' : 'زيد الدوا'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-md hover:bg-gray-400 transition"
            >
              سحاب
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-30">
        {medicines.length > 0 ? (
          medicines.map(med => (
           <div key={med._id} className="bg-white rounded-xl shadow-md p-8 flex flex-col justify-between hover:shadow-xl transition min-w-[280px] min-h-[220px]">
  <div>
    <h3 className="text-2xl font-bold mb-3 text-pink-600">{med.name}</h3>
    <p className="text-lg"><strong>الجرعة:</strong> {med.dosage || '-'}</p>
    <p className="text-lg"><strong>شحال من مرة:</strong> {med.frequency || '-'}</p>
    <p className="text-lg"><strong>الأوقات:</strong> {med.time.join(', ')}</p>
    <p className="text-lg"><strong>من:</strong> {med.startDate?.slice(0, 10) || '-'}</p>
    <p className="text-lg"><strong>حتى:</strong> {med.endDate?.slice(0, 10) || '-'}</p>
  </div>
  <div className="mt-6 flex justify-between">
    <button
      onClick={() => handleEdit(med)}
      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition text-lg"
    >
      بدّل
    </button>
    <button
      onClick={() => handleDelete(med._id)}
      className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition text-lg"
    >
      حيد
    </button>
  </div>
</div>

          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-10 text-lg">
            ما كاين حتى دوا دابا.
          </p>
        )}
      </div>
    </div>
  );
};

export default MedicineCRUD;
