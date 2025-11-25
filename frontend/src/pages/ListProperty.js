import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import API_URL, { getImageUrl } from '../utils/api';
import { compressImage } from '../utils/imageCompressor';

const ListProperty = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', title: '', category: '', price: '', location: '', area: '', 
    bedrooms: '', bathrooms: '', description: '', images: [], video: ''
  });
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const locations = ['Hyderabad', 'Secunderabad', 'Gachibowli', 'Madhapur', 'Kondapur', 'Kukatpally', 'Miyapur', 'Nizampet', 'Bachupally', 'Kompally'];
  const categories = ['Agricultural Land', 'Independent House', 'Open Plot', 'Apartment', 'Farmhouse'];

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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
        showToast('Image uploaded!', 'success');
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

  const handleVideoUpload = async (e) => {
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
          showToast('Video uploaded!', 'success');
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
    setFormData({...formData, images: formData.images.filter((_, i) => i !== index)});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/properties/user-listing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        showToast('Property submitted successfully! We will review and contact you.', 'success');
        setFormData({ name: '', email: '', phone: '', title: '', category: '', price: '', location: '', area: '', bedrooms: '', bathrooms: '', description: '', images: [], video: '' });
      } else {
        const error = await res.json();
        showToast(error.message || 'Failed to submit', 'error');
      }
    } catch (error) {
      showToast('Failed to submit property', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {toast.show && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className={`bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 ${toast.type === 'success' ? 'border-t-4 border-green-500' : 'border-t-4 border-red-500'}`}>
            <div className="flex flex-col items-center text-center">
              {toast.type === 'success' ? (
                <FaCheckCircle className="text-green-500 text-6xl mb-4" />
              ) : (
                <FaTimesCircle className="text-red-500 text-6xl mb-4" />
              )}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {toast.type === 'success' ? 'Success!' : 'Error!'}
              </h3>
              <p className="text-gray-600 text-lg">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">List Your Property</h1>
          <p className="text-gray-600">Fill in the details below to list your property with us</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Your Name *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border p-3 rounded" required />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email *</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border p-3 rounded" required />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone *</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border p-3 rounded" required />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Property Title *</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full border p-3 rounded" required />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Category *</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full border p-3 rounded" required>
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Location *</label>
                <select value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full border p-3 rounded" required>
                  <option value="">Select Location</option>
                  {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Price (INR) *</label>
                <input type="text" placeholder="e.g., 50,00,000" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full border p-3 rounded" required />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Area (sq.ft)</label>
                <input type="text" value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})} className="w-full border p-3 rounded" />
              </div>
              {formData.category && !['Agricultural Land', 'Open Plot'].includes(formData.category) && (
                <>
                  <div>
                    <label className="block text-gray-700 mb-2">Bedrooms</label>
                    <input type="number" value={formData.bedrooms} onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} className="w-full border p-3 rounded" />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Bathrooms</label>
                    <input type="number" value={formData.bathrooms} onChange={(e) => setFormData({...formData, bathrooms: e.target.value})} className="w-full border p-3 rounded" />
                  </div>
                </>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border p-3 rounded" rows="4" />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Property Images</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border p-3 rounded" disabled={uploading} />
              {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img src={getImageUrl(img)} alt="Property" className="w-full h-20 object-cover rounded" />
                      <button type="button" onClick={() => removeImage(idx)} className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs">×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Property Video (Max 30 seconds)</label>
              <input type="file" accept="video/*" onChange={handleVideoUpload} className="w-full border p-3 rounded" disabled={uploading} />
              {uploading && <p className="text-sm text-blue-600 mt-1">Uploading video...</p>}
              {formData.video && (
                <div className="mt-3 relative">
                  <video src={getImageUrl(formData.video)} controls className="w-full max-h-60 rounded" />
                  <button type="button" onClick={() => setFormData({...formData, video: ''})} className="absolute top-2 right-2 bg-red-600 text-white rounded px-3 py-1 text-sm">Remove</button>
                </div>
              )}
            </div>

            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Submit Property
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListProperty;
