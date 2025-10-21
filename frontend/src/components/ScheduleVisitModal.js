import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const ScheduleVisitModal = ({ isOpen, onClose, propertyTitle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Schedule Visit Data:', { ...formData, property: propertyTitle });
    alert('Visit scheduled successfully! We will contact you soon.');
    onClose();
    setFormData({ name: '', email: '', phone: '', date: '', time: '', message: '' });
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
          <p className="text-gray-600 mb-6">{propertyTitle}</p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Preferred Date *</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Preferred Time *</label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
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
              className="w-full bg-primary text-white py-3 rounded hover:bg-opacity-90 transition font-semibold"
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
