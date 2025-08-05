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
 const API_BASE = 'http://localhost:5001/api/medications';

  const fetchMedicines = async () => {
    try {
      const res = await axios.get(API_BASE, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMedicines(res.data);
    } catch (err) {
      console.error('Error fetching:', err);
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
      fetchMedicines();
    } catch (err) {
      console.error('Error saving:', err);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('متأكد بغيتي تحذف؟')) return;
    try {
      await axios.delete(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchMedicines();
    } catch (err) {
      console.error('Error deleting:', err);
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
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">📋 إدارة الأدوية</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input name="name" value={form.name} onChange={handleChange} placeholder="إسم الدواء" className="border p-2 rounded" required />
        <input name="dosage" value={form.dosage} onChange={handleChange} placeholder="الجرعة" className="border p-2 rounded" />
        <input name="frequency" value={form.frequency} onChange={handleChange} placeholder="عدد المرات" className="border p-2 rounded" />
        <input name="time" value={form.time} onChange={handleChange} placeholder="مثلاً: 08:00, 20:00" className="border p-2 rounded" />
        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="border p-2 rounded" />
        <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="border p-2 rounded" />
        <button type="submit" className="col-span-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          {editingId ? 'تعديل الدواء' : 'إضافة الدواء'}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border rounded">
          <thead className="bg-gray-200 text-sm">
            <tr>
              <th className="p-2">الإسم</th>
              <th className="p-2">الجرعة</th>
              <th className="p-2">عدد المرات</th>
              <th className="p-2">الأوقات</th>
              <th className="p-2">من</th>
              <th className="p-2">إلى</th>
              <th className="p-2">التحكم</th>
            </tr>
          </thead>
          <tbody>
            {medicines.length > 0 ? medicines.map(med => (
              <tr key={med._id} className="text-center border-t">
                <td className="p-2">{med.name}</td>
                <td className="p-2">{med.dosage}</td>
                <td className="p-2">{med.frequency}</td>
                <td className="p-2">{med.time.join(', ')}</td>
                <td className="p-2">{med.startDate?.slice(0, 10)}</td>
                <td className="p-2">{med.endDate?.slice(0, 10)}</td>
                <td className="p-2 space-x-2">
                  <button onClick={() => handleEdit(med)} className="bg-blue-500 text-white px-2 py-1 rounded">تعديل</button>
                  <button onClick={() => handleDelete(med._id)} className="bg-red-500 text-white px-2 py-1 rounded">حذف</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" className="text-center py-4">لا يوجد أدوية</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicineCRUD;
