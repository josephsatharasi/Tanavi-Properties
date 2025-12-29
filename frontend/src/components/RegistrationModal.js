import React, { useState } from 'react';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';
import API_URL, { getImageUrl } from '../utils/api';
import { compressImage } from '../utils/imageCompressor';

const RegistrationModal = ({ isOpen, onClose, modalType = 'register' }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    location: '',
    price: '',
    description: '',
    userType: '',
    images: [],
    video: ''
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (formData.images.length >= 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      e.target.value = '';
      return;
    }

    setUploading(true);
    let uploadFile = file;
    try {
      uploadFile = await compressImage(file, 2);
    } catch (err) {
      console.log('Compression failed, using original:', err);
    }

    const formDataUpload = new FormData();
    formDataUpload.append('image', uploadFile);

    try {
      const res = await fetch(`${API_URL}/api/upload/public`, {
        method: 'POST',
        body: formDataUpload
      });
      
      const data = await res.json();
      if (res.ok) {
        setFormData({...formData, images: [...formData.images, data.url]});
      } else {
        alert(`Upload failed: ${data.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = async function() {
      window.URL.revokeObjectURL(video.src);
      if (video.duration > 30) {
        alert('Video must be 30 seconds or less');
        e.target.value = '';
        return;
      }

      if (file.size > 50 * 1024 * 1024) {
        alert('Video size must be less than 50MB');
        e.target.value = '';
        return;
      }

      setUploading(true);
      const formDataUpload = new FormData();
      formDataUpload.append('video', file);

      try {
        const res = await fetch(`${API_URL}/api/upload/public/video`, {
          method: 'POST',
          body: formDataUpload
        });
        
        const data = await res.json();
        if (res.ok) {
          setFormData({...formData, video: data.url});
        } else {
          alert(`Upload failed: ${data.message}`);
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      } finally {
        setUploading(false);
        e.target.value = '';
      }
    };
    video.src = URL.createObjectURL(file);
  };

  const removeImage = (index) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      title: `${formData.propertyType} in ${formData.location.split(',')[0]}`,
      category: formData.propertyType,
      location: formData.location,
      price: formData.price,
      description: formData.description,
      images: formData.images,
      video: formData.video
    };

    try {
      const res = await fetch(`${API_URL}/api/properties/user-listing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });
      
      if (res.ok) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          propertyType: '',
          location: '',
          price: '',
          description: '',
          userType: '',
          images: [],
          video: ''
        });
      } else {
        const error = await res.json();
        alert(error.message || 'Failed to submit');
      }
    } catch (error) {
      alert('Failed to submit property');
    }
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

          {modalType === 'list' && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">You are <span className="text-red-500">*</span></label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
              >
                <option value="">Select</option>
                <option value="Owner">Owner</option>
                <option value="Agent">Agent</option>
              </select>
            </div>
          )}

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

          {modalType === 'list' && (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Images (Max 5)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={formData.images.length >= 5 || uploading}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                />
                {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative">
                        <img src={getImageUrl(img)} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Video (Max 30 seconds)</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  disabled={uploading || formData.video}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                />
                {uploading && <p className="text-sm text-blue-600 mt-1">Uploading video...</p>}
                {formData.video && (
                  <div className="mt-3 relative">
                    <video src={getImageUrl(formData.video)} controls className="w-full max-h-40 rounded" />
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, video: ''})}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded px-3 py-1 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

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
