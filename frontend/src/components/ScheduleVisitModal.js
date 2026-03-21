import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import API_URL from '../utils/api';

const ScheduleVisitModal = ({ isOpen, onClose, propertyTitle, propertyId, propertyCode }) => {
  const timeOptions = Array.from({ length: 24 * 2 }, (_, index) => {
    const totalMinutes = index * 30;
    const hours24 = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
    return `${String(hours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/schedules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, propertyId, propertyTitle })
      });
      if (res.ok) {
        alert('Visit scheduled successfully! We will contact you soon.');
        onClose();
        setFormData({ name: '', email: '', phone: '', date: '', time: '', message: '' });
      }
    } catch (error) {
      alert('Error scheduling visit. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Schedule a Visit</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
          </div>
          <div className="mb-6">
            <p className="text-gray-600 capitalize font-medium">{propertyTitle}</p>
            {propertyCode && (
              <div className="mt-2 inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                Property ID: {propertyCode}
              </div>
            )}
            <p className="text-sm text-gray-500 mt-2">Reference this Property ID when contacting us</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone <span className="text-red-500">*</span></label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Preferred Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Preferred Time <span className="text-red-500">*</span></label>
              <select
                required
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-primary"
              >
                <option value="">Select Time</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows="3"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded font-semibold"
            >
              Schedule Visit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleVisitModal;
