import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaCalendar, FaSignOutAlt, FaEdit, FaTrash, FaTimes, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import LoadingSpinner from '../../components/LoadingSpinner';
import API_URL, { getImageUrl } from '../../utils/api';
import { compressImage } from '../../utils/imageCompressor';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [properties, setProperties] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [buySell, setBuySell] = useState([]);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [showBuySellForm, setShowBuySellForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [editingGallery, setEditingGallery] = useState(null);
  const [editingBuySell, setEditingBuySell] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [propertyForm, setPropertyForm] = useState({
    title: '', category: '', price: '', location: '', area: '',
    bedrooms: '', bathrooms: '', description: '', features: '', images: [], status: 'available', section: 'featured'
  });
  const [galleryForm, setGalleryForm] = useState({ title: '', category: '', image: '', description: '' });
  const [buySellForm, setBuySellForm] = useState({ title: '', location: '', price: '', area: '', type: 'sold', date: '', image: '' });
  const [uploading, setUploading] = useState(false);

  const locations = ['Hyderabad', 'Secunderabad', 'Gachibowli', 'Madhapur', 'Kondapur', 'Kukatpally', 'Miyapur', 'Nizampet', 'Bachupally', 'Kompally'];
  const areas = ['500-1000 sq.ft', '1000-1500 sq.ft', '1500-2000 sq.ft', '2000-3000 sq.ft', '3000+ sq.ft', '1 Acre', '2 Acres', '5 Acres', '10+ Acres'];

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!token || user.role !== 'admin') {
      navigate('/admin/login');
      return;
    }
    Promise.all([fetchProperties(), fetchSchedules(), fetchGallery(), fetchBuySell()]).then(() => setLoading(false));
  }, [navigate]);

  const fetchProperties = async () => {
    try {
      const res = await fetch(`${API_URL}/api/properties`);
      const data = await res.json();
      setProperties(data);
      return data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      return [];
    }
  };

  const fetchSchedules = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/schedules`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setSchedules(data);
      return data;
    } catch (error) {
      console.error('Error fetching schedules:', error);
      return [];
    }
  };

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API_URL}/api/gallery`);
      const data = await res.json();
      setGallery(data);
      return data;
    } catch (error) {
      console.error('Error fetching gallery:', error);
      return [];
    }
  };

  const fetchBuySell = async () => {
    try {
      const res = await fetch(`${API_URL}/api/buysell`);
      const data = await res.json();
      setBuySell(data);
      return data;
    } catch (error) {
      console.error('Error fetching buy/sell:', error);
      return [];
    }
  };

  const formatPrice = (value) => {
    const num = value.replace(/[^0-9]/g, '');
    if (!num) return '';
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const handlePriceChange = (e) => {
    const formatted = formatPrice(e.target.value);
    setPropertyForm({...propertyForm, price: formatted});
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

    const formData = new FormData();
    formData.append('image', uploadFile);

    try {
      const token = localStorage.getItem('token');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);
      
      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`
        },
        body: formData,
        signal: controller.signal,
        mode: 'cors',
        credentials: 'omit'
      });
      clearTimeout(timeoutId);
      
      const data = await res.json();
      if (res.ok) {
        setPropertyForm({...propertyForm, images: [...propertyForm.images, data.url]});
        showToast('Image uploaded successfully!', 'success');
      } else {
        alert(`Upload failed: ${data.message || 'Server error'}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      if (error.name === 'AbortError') {
        alert('Upload timeout. Please check your internet connection and try again.');
      } else if (error.message === 'Failed to fetch') {
        alert('Cannot connect to server. Please check:\n1. Your internet connection\n2. Backend server is running\n3. Try again in a moment');
      } else {
        alert(`Error: ${error.message}`);
      }
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const removeImage = (index) => {
    setPropertyForm({...propertyForm, images: propertyForm.images.filter((_, i) => i !== index)});
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handlePropertySubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editingProperty 
      ? `${API_URL}/api/properties/${editingProperty._id}`
      : `${API_URL}/api/properties`;
    
    const body = {
      ...propertyForm,
      features: propertyForm.features.split(',').map(f => f.trim()).filter(f => f),
      images: propertyForm.images,
      bedrooms: propertyForm.bedrooms ? Number(propertyForm.bedrooms) : undefined,
      bathrooms: propertyForm.bathrooms ? Number(propertyForm.bathrooms) : undefined
    };

    try {
      const res = await fetch(url, {
        method: editingProperty ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        const updatedProperty = await res.json();
        
        if (editingProperty) {
          setProperties(properties.map(p => p._id === updatedProperty._id ? updatedProperty : p));
        } else {
          setProperties([updatedProperty, ...properties]);
        }
        
        setShowPropertyForm(false);
        setEditingProperty(null);
        setPropertyForm({ title: '', category: '', price: '', location: '', area: '', bedrooms: '', bathrooms: '', description: '', features: '', images: [], status: 'available', section: 'featured' });
        showToast(editingProperty ? 'Property updated successfully!' : 'Property added successfully!', 'success');
      } else {
        const error = await res.json();
        showToast(error.message || 'Failed to save property', 'error');
      }
    } catch (error) {
      console.error('Error saving property:', error);
      showToast('Failed to save property', 'error');
    }
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Delete this property?')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/api/properties/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setProperties(properties.filter(p => p._id !== id));
        showToast('Property deleted successfully!', 'success');
      } else {
        const error = await res.json();
        showToast(error.message || 'Failed to delete property', 'error');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      showToast('Failed to delete property', 'error');
    }
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setPropertyForm({
      title: property.title,
      category: property.category,
      price: property.price,
      location: property.location,
      area: property.area || '',
      bedrooms: property.bedrooms || '',
      bathrooms: property.bathrooms || '',
      description: property.description || '',
      features: property.features?.join(', ') || '',
      images: property.images || [],
      status: property.status,
      section: property.section || 'featured'
    });
    setShowPropertyForm(true);
  };

  const handleScheduleStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/api/schedules/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        const updatedSchedule = await res.json();
        setSchedules(schedules.map(s => s._id === updatedSchedule._id ? updatedSchedule : s));
        showToast('Schedule updated!', 'success');
      } else {
        showToast('Failed to update schedule', 'error');
      }
    } catch (error) {
      console.error('Error updating schedule:', error);
      showToast('Failed to update schedule', 'error');
    }
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editingGallery ? `${API_URL}/api/gallery/${editingGallery._id}` : `${API_URL}/api/gallery`;
    try {
      const res = await fetch(url, {
        method: editingGallery ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(galleryForm)
      });
      if (res.ok) {
        const updatedItem = await res.json();
        
        if (editingGallery) {
          setGallery(gallery.map(g => g._id === updatedItem._id ? updatedItem : g));
        } else {
          setGallery([updatedItem, ...gallery]);
        }
        
        setShowGalleryForm(false);
        setEditingGallery(null);
        setGalleryForm({ title: '', category: '', image: '', description: '' });
        showToast(editingGallery ? 'Gallery updated!' : 'Gallery added!', 'success');
      } else {
        const error = await res.json();
        showToast(error.message || 'Failed to save gallery', 'error');
      }
    } catch (error) {
      showToast('Failed to save gallery', 'error');
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!window.confirm('Delete this gallery item?')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setGallery(gallery.filter(g => g._id !== id));
        showToast('Gallery deleted!', 'success');
      } else {
        showToast('Failed to delete', 'error');
      }
    } catch (error) {
      showToast('Failed to delete', 'error');
    }
  };

  const handleBuySellSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editingBuySell ? `${API_URL}/api/buysell/${editingBuySell._id}` : `${API_URL}/api/buysell`;
    try {
      const res = await fetch(url, {
        method: editingBuySell ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(buySellForm)
      });
      if (res.ok) {
        const updatedItem = await res.json();
        
        if (editingBuySell) {
          setBuySell(buySell.map(b => b._id === updatedItem._id ? updatedItem : b));
        } else {
          setBuySell([updatedItem, ...buySell]);
        }
        
        setShowBuySellForm(false);
        setEditingBuySell(null);
        setBuySellForm({ title: '', location: '', price: '', area: '', type: 'sold', date: '', image: '' });
        showToast(editingBuySell ? 'Item updated!' : 'Item added!', 'success');
      } else {
        const error = await res.json();
        showToast(error.message || 'Failed to save', 'error');
      }
    } catch (error) {
      showToast('Failed to save', 'error');
    }
  };

  const handleDeleteBuySell = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/api/buysell/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setBuySell(buySell.filter(b => b._id !== id));
        showToast('Item deleted!', 'success');
      } else {
        showToast('Failed to delete', 'error');
      }
    } catch (error) {
      showToast('Failed to delete', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100">
      {toast.show && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fadeIn">
          <div className={`bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 animate-scaleIn ${toast.type === 'success' ? 'border-t-4 border-green-500' : 'border-t-4 border-red-500'}`}>
            <div className="flex flex-col items-center text-center">
              {toast.type === 'success' ? (
                <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-bounce" />
              ) : (
                <FaTimesCircle className="text-red-500 text-6xl mb-4 animate-bounce" />
              )}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {toast.type === 'success' ? 'Success!' : 'Error!'}
              </h3>
              <p className="text-gray-600 text-lg">{toast.message}</p>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-4 mb-6 overflow-x-auto">
          <button onClick={() => setActiveTab('properties')} className={`flex items-center gap-2 px-6 py-3 rounded whitespace-nowrap ${activeTab === 'properties' ? 'bg-blue-600 text-white' : 'bg-white'}`}>
            <FaHome /> Properties
          </button>
          <button onClick={() => setActiveTab('schedules')} className={`flex items-center gap-2 px-6 py-3 rounded whitespace-nowrap ${activeTab === 'schedules' ? 'bg-blue-600 text-white' : 'bg-white'}`}>
            <FaCalendar /> Schedules
          </button>
          <button onClick={() => setActiveTab('gallery')} className={`flex items-center gap-2 px-6 py-3 rounded whitespace-nowrap ${activeTab === 'gallery' ? 'bg-blue-600 text-white' : 'bg-white'}`}>
            Gallery
          </button>
          <button onClick={() => setActiveTab('buysell')} className={`flex items-center gap-2 px-6 py-3 rounded whitespace-nowrap ${activeTab === 'buysell' ? 'bg-blue-600 text-white' : 'bg-white'}`}>
            Buy/Sell
          </button>
        </div>

        {activeTab === 'properties' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Manage Properties</h2>
              <button onClick={() => { setShowPropertyForm(true); setEditingProperty(null); setPropertyForm({ title: '', category: '', price: '', location: '', area: '', bedrooms: '', bathrooms: '', description: '', features: '', images: [], status: 'available', section: 'featured' }); }} className="bg-green-600 text-white px-4 py-2 rounded">
                Add Property
              </button>
            </div>

            {showPropertyForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slideIn">
                  <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                    <h3 className="text-xl font-bold">{editingProperty ? 'Edit' : 'Add'} Property</h3>
                    <button onClick={() => { setShowPropertyForm(false); setEditingProperty(null); }} className="text-gray-500 hover:text-gray-700 text-2xl">
                      <FaTimes />
                    </button>
                  </div>
                  <div className="p-6">
                <form onSubmit={handlePropertySubmit} className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Title" value={propertyForm.title} onChange={(e) => setPropertyForm({...propertyForm, title: e.target.value})} className="border p-2 rounded" required />
                  <select value={propertyForm.category} onChange={(e) => setPropertyForm({...propertyForm, category: e.target.value, bedrooms: '', bathrooms: ''})} className="border p-2 rounded" required>
                    <option value="">Select Category</option>
                    <option value="Agricultural Land">Agricultural Land</option>
                    <option value="Independent House">Independent House</option>
                    <option value="Open Plot">Open Plot</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Farmhouse">Farmhouse</option>
                  </select>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Price (INR)</label>
                    <input type="text" placeholder="e.g., 50,00,000" value={propertyForm.price} onChange={handlePriceChange} className="border p-2 rounded w-full" required />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Location</label>
                    <select value={propertyForm.location} onChange={(e) => setPropertyForm({...propertyForm, location: e.target.value})} className="border p-2 rounded w-full" required>
                      <option value="">Select Location</option>
                      {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Area</label>
                    <select value={propertyForm.area} onChange={(e) => setPropertyForm({...propertyForm, area: e.target.value})} className="border p-2 rounded w-full">
                      <option value="">Select Area</option>
                      {areas.map(area => <option key={area} value={area}>{area}</option>)}
                    </select>
                  </div>
                  {propertyForm.category && !['Agricultural Land', 'Open Plot'].includes(propertyForm.category) && (
                    <>
                      <input type="number" placeholder="Bedrooms" value={propertyForm.bedrooms} onChange={(e) => setPropertyForm({...propertyForm, bedrooms: e.target.value})} className="border p-2 rounded" />
                      <input type="number" placeholder="Bathrooms" value={propertyForm.bathrooms} onChange={(e) => setPropertyForm({...propertyForm, bathrooms: e.target.value})} className="border p-2 rounded" />
                    </>
                  )}
                  <select value={propertyForm.status} onChange={(e) => setPropertyForm({...propertyForm, status: e.target.value})} className="border p-2 rounded">
                    <option value="available">Available</option>
                    <option value="pending">Pending</option>
                    <option value="sold">Sold</option>
                  </select>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Display Section</label>
                    <select value={propertyForm.section} onChange={(e) => setPropertyForm({...propertyForm, section: e.target.value})} className="border p-2 rounded w-full">
                      <option value="featured">Featured Properties</option>
                      <option value="highlights">Tanavi Highlights</option>
                    </select>
                  </div>
                  <textarea placeholder="Description" value={propertyForm.description} onChange={(e) => setPropertyForm({...propertyForm, description: e.target.value})} className="border p-2 rounded col-span-2" rows="3" />
                  <input type="text" placeholder="Features (comma separated)" value={propertyForm.features} onChange={(e) => setPropertyForm({...propertyForm, features: e.target.value})} className="border p-2 rounded col-span-2" />
                  
                  <div className="col-span-2">
                    <label className="block text-sm text-gray-600 mb-2">Property Images</label>
                    <div className="mb-2">
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="border p-2 rounded w-full" disabled={uploading} />
                      {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
                    </div>
                    {propertyForm.images.length > 0 && (
                      <div className="grid grid-cols-4 gap-2">
                        {propertyForm.images.map((img, idx) => (
                          <div key={idx} className="relative">
                            <img src={getImageUrl(img)} alt="Property" className="w-full h-20 object-cover rounded" onError={(e) => e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'} />
                            <button type="button" onClick={() => removeImage(idx)} className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs">×</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="col-span-2 flex gap-2">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition">Save</button>
                    <button type="button" onClick={() => { setShowPropertyForm(false); setEditingProperty(null); }} className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded transition">Cancel</button>
                  </div>
                </form>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Title</th>
                    <th className="px-6 py-4 text-left font-semibold">Category</th>
                    <th className="px-6 py-4 text-left font-semibold">Price</th>
                    <th className="px-6 py-4 text-left font-semibold">Location</th>
                    <th className="px-6 py-4 text-left font-semibold">Section</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map(property => (
                    <tr key={property._id} className="border-b hover:bg-blue-50 transition-colors duration-200">
                      <td className="px-6 py-4 font-medium">{property.title}</td>
                      <td className="px-6 py-4 text-gray-700">{property.category}</td>
                      <td className="px-6 py-4 text-gray-700 font-semibold">₹{property.price}</td>
                      <td className="px-6 py-4 text-gray-700">{property.location}</td>
                      <td className="px-6 py-4"><span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">{property.section === 'highlights' ? 'Highlights' : 'Featured'}</span></td>
                      <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${property.status === 'available' ? 'bg-green-100 text-green-800' : property.status === 'sold' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{property.status}</span></td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => handleEditProperty(property)} className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-2 rounded-full transition mr-2" title="Edit">
                          <FaEdit size={18} />
                        </button>
                        <button onClick={() => handleDeleteProperty(property._id)} className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-full transition" title="Delete">
                          <FaTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Manage Gallery</h2>
              <button onClick={() => { setShowGalleryForm(true); setEditingGallery(null); setGalleryForm({ title: '', category: '', image: '', description: '' }); }} className="bg-green-600 text-white px-4 py-2 rounded">
                Add Gallery Item
              </button>
            </div>

            {showGalleryForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl">
                  <div className="border-b px-6 py-4 flex justify-between items-center">
                    <h3 className="text-xl font-bold">{editingGallery ? 'Edit' : 'Add'} Gallery Item</h3>
                    <button onClick={() => { setShowGalleryForm(false); setEditingGallery(null); }} className="text-gray-500 hover:text-gray-700 text-2xl"><FaTimes /></button>
                  </div>
                  <form onSubmit={handleGallerySubmit} className="p-6 space-y-4">
                    <input type="text" placeholder="Title" value={galleryForm.title} onChange={(e) => setGalleryForm({...galleryForm, title: e.target.value})} className="w-full border p-2 rounded" required />
                    <select value={galleryForm.category} onChange={(e) => setGalleryForm({...galleryForm, category: e.target.value})} className="w-full border p-2 rounded" required>
                      <option value="">Select Category</option>
                      <option value="Land">Land</option>
                      <option value="House">House</option>
                      <option value="Plot">Plot</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Farmhouse">Farmhouse</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                    <div>
                      <label className="block text-sm mb-1">Image</label>
                      <input type="file" accept="image/*" onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const formData = new FormData();
                        formData.append('image', file);
                        setUploading(true);
                        try {
                          const token = localStorage.getItem('token');
                          const res = await fetch(`${API_URL}/api/upload`, {
                            method: 'POST',
                            headers: { Authorization: `Bearer ${token}` },
                            body: formData
                          });
                          const data = await res.json();
                          if (res.ok) setGalleryForm({...galleryForm, image: data.url});
                        } finally {
                          setUploading(false);
                          e.target.value = '';
                        }
                      }} className="w-full border p-2 rounded" disabled={uploading} />
                      {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
                      {galleryForm.image && <img src={getImageUrl(galleryForm.image)} alt="Preview" className="mt-2 h-32 object-cover rounded" onError={(e) => e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'} />}
                    </div>
                    <textarea placeholder="Description (optional)" value={galleryForm.description} onChange={(e) => setGalleryForm({...galleryForm, description: e.target.value})} className="w-full border p-2 rounded" rows="3" />
                    <div className="flex gap-2">
                      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Save</button>
                      <button type="button" onClick={() => { setShowGalleryForm(false); setEditingGallery(null); }} className="bg-gray-400 text-white px-6 py-2 rounded">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Image</th>
                    <th className="px-6 py-4 text-left">Title</th>
                    <th className="px-6 py-4 text-left">Category</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {gallery.map(item => (
                    <tr key={item._id} className="border-b hover:bg-blue-50">
                      <td className="px-6 py-4"><img src={getImageUrl(item.image)} alt={item.title} className="h-16 w-16 object-cover rounded" onError={(e) => e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'} /></td>
                      <td className="px-6 py-4 font-medium">{item.title}</td>
                      <td className="px-6 py-4">{item.category}</td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => { setEditingGallery(item); setGalleryForm(item); setShowGalleryForm(true); }} className="text-blue-600 hover:bg-blue-100 p-2 rounded mr-2"><FaEdit /></button>
                        <button onClick={() => handleDeleteGallery(item._id)} className="text-red-600 hover:bg-red-100 p-2 rounded"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'buysell' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Manage Buy/Sell</h2>
              <button onClick={() => { setShowBuySellForm(true); setEditingBuySell(null); setBuySellForm({ title: '', location: '', price: '', area: '', type: 'sold', date: '', image: '' }); }} className="bg-green-600 text-white px-4 py-2 rounded">
                Add Item
              </button>
            </div>

            {showBuySellForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl">
                  <div className="border-b px-6 py-4 flex justify-between items-center">
                    <h3 className="text-xl font-bold">{editingBuySell ? 'Edit' : 'Add'} Buy/Sell Item</h3>
                    <button onClick={() => { setShowBuySellForm(false); setEditingBuySell(null); }} className="text-gray-500 hover:text-gray-700 text-2xl"><FaTimes /></button>
                  </div>
                  <form onSubmit={handleBuySellSubmit} className="p-6 space-y-4">
                    <input type="text" placeholder="Title" value={buySellForm.title} onChange={(e) => setBuySellForm({...buySellForm, title: e.target.value})} className="w-full border p-2 rounded" required />
                    <select value={buySellForm.location} onChange={(e) => setBuySellForm({...buySellForm, location: e.target.value})} className="w-full border p-2 rounded" required>
                      <option value="">Select Location</option>
                      {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                    </select>
                    <input type="text" placeholder="Price" value={buySellForm.price} onChange={(e) => setBuySellForm({...buySellForm, price: e.target.value})} className="w-full border p-2 rounded" required />
                    <input type="number" placeholder="Area (sq.ft)" value={buySellForm.area} onChange={(e) => setBuySellForm({...buySellForm, area: e.target.value})} className="w-full border p-2 rounded" required />
                    <select value={buySellForm.type} onChange={(e) => setBuySellForm({...buySellForm, type: e.target.value})} className="w-full border p-2 rounded" required>
                      <option value="sold">Sold</option>
                      <option value="bought">Bought</option>
                    </select>
                    <input type="text" placeholder="Date (e.g., Jan 2024)" value={buySellForm.date} onChange={(e) => setBuySellForm({...buySellForm, date: e.target.value})} className="w-full border p-2 rounded" required />
                    <div>
                      <label className="block text-sm mb-1">Image</label>
                      <input type="file" accept="image/*" onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const formData = new FormData();
                        formData.append('image', file);
                        setUploading(true);
                        try {
                          const token = localStorage.getItem('token');
                          const res = await fetch(`${API_URL}/api/upload`, {
                            method: 'POST',
                            headers: { Authorization: `Bearer ${token}` },
                            body: formData
                          });
                          const data = await res.json();
                          if (res.ok) setBuySellForm({...buySellForm, image: data.url});
                        } finally {
                          setUploading(false);
                          e.target.value = '';
                        }
                      }} className="w-full border p-2 rounded" disabled={uploading} />
                      {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
                      {buySellForm.image && <img src={getImageUrl(buySellForm.image)} alt="Preview" className="mt-2 h-32 object-cover rounded" onError={(e) => e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'} />}
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Save</button>
                      <button type="button" onClick={() => { setShowBuySellForm(false); setEditingBuySell(null); }} className="bg-gray-400 text-white px-6 py-2 rounded">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Image</th>
                    <th className="px-6 py-4 text-left">Title</th>
                    <th className="px-6 py-4 text-left">Location</th>
                    <th className="px-6 py-4 text-left">Price</th>
                    <th className="px-6 py-4 text-left">Type</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {buySell.map(item => (
                    <tr key={item._id} className="border-b hover:bg-blue-50">
                      <td className="px-6 py-4"><img src={getImageUrl(item.image)} alt={item.title} className="h-16 w-16 object-cover rounded" onError={(e) => e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'} /></td>
                      <td className="px-6 py-4 font-medium">{item.title}</td>
                      <td className="px-6 py-4">{item.location}</td>
                      <td className="px-6 py-4">₹{item.price}</td>
                      <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.type === 'sold' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{item.type}</span></td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => { setEditingBuySell(item); setBuySellForm(item); setShowBuySellForm(true); }} className="text-blue-600 hover:bg-blue-100 p-2 rounded mr-2"><FaEdit /></button>
                        <button onClick={() => handleDeleteBuySell(item._id)} className="text-red-600 hover:bg-red-100 p-2 rounded"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'schedules' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Schedules</h2>
            <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Property</th>
                    <th className="px-6 py-4 text-left font-semibold">Customer</th>
                    <th className="px-6 py-4 text-left font-semibold">Contact</th>
                    <th className="px-6 py-4 text-left font-semibold">Date & Time</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map(schedule => (
                    <tr key={schedule._id} className="border-b hover:bg-blue-50 transition-colors duration-200">
                      <td className="px-6 py-4 font-medium">{schedule.propertyTitle}</td>
                      <td className="px-6 py-4 text-gray-700">{schedule.name}</td>
                      <td className="px-6 py-4 text-gray-700">{schedule.phone}<br/><span className="text-sm text-gray-500">{schedule.email}</span></td>
                      <td className="px-6 py-4 text-gray-700">{schedule.date} {schedule.time}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${schedule.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : schedule.status === 'approved' ? 'bg-blue-100 text-blue-800' : schedule.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {schedule.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {schedule.status === 'pending' && (
                          <button onClick={() => handleScheduleStatus(schedule._id, 'approved')} className="text-blue-600 hover:bg-blue-100 px-3 py-1 rounded transition mr-2">Approve</button>
                        )}
                        {schedule.status === 'approved' && (
                          <button onClick={() => handleScheduleStatus(schedule._id, 'completed')} className="text-green-600 hover:bg-green-100 px-3 py-1 rounded transition mr-2">Complete</button>
                        )}
                        <button onClick={() => handleScheduleStatus(schedule._id, 'cancelled')} className="text-red-600 hover:bg-red-100 px-3 py-1 rounded transition">Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
