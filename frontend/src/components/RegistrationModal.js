import React, { useState } from 'react';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';

const RegistrationModal = ({ isOpen, onClose }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    location: '',
    price: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      propertyType: '',
      location: '',
      price: '',
      description: ''
    });
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center animate-scale-in">
          <div className="mb-6">
            <FaCheckCircle className="text-green-500 text-7xl mx-auto animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Success!</h2>
          <p className="text-gray-600 text-lg mb-6">
            Registration submitted successfully! We will contact you soon.
          </p>
          <button
            onClick={handleSuccessClose}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition font-medium text-lg"
          >
            Got it!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Register Your Property</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              pattern="[A-Za-z\s]+"
              title="Name should only contain letters"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              pattern="[a-zA-Z0-9._%+-]+@gmail\.com$"
              title="Email must be a valid Gmail address (e.g., example@gmail.com)"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Number <span className="text-red-500">*</span></label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              maxLength="10"
              title="Phone number must be exactly 10 digits"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
              placeholder="Enter 10-digit phone number"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Property Type <span className="text-red-500">*</span></label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
            >
              <option value="">Select Property Type</option>
              <option value="Agricultural Land">Agricultural Land</option>
              <option value="Independent House">Independent House</option>
              <option value="Open Plot">Open Plot</option>
              <option value="Apartment">Apartment</option>
              <option value="Farmhouse">Farmhouse</option>
              <option value="Office Space">Office Space</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Location <span className="text-red-500">*</span></label>
            <textarea
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
              placeholder="Enter full address (Landmark, Village, Mandal, District, State)"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Expected Price <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
              placeholder="Enter expected price"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Property Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
              placeholder="Describe your property (optional)"
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded hover:bg-opacity-90 transition font-medium"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
