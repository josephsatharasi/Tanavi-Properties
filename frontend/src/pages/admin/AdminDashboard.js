import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaCalendar, FaSignOutAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [properties, setProperties] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const navigate = useNavigate();

  const [propertyForm, setPropertyForm] = useState({
    title: '', category: '', price: '', location: '', area: '',
    bedrooms: '', bathrooms: '', description: '', features: '', images: [], status: 'available'
  });
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
    fetchProperties();
    fetchSchedules();
  }, [navigate]);

  const fetchProperties = async () => {
    try {
      const res = await fetch('https://tanavi-properties-backend.onrender.com/api/properties');
      const data = await res.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const fetchSchedules = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://tanavi-properties-backend.onrender.com/api/schedules', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setSchedules(data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
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

    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://tanavi-properties-backend.onrender.com/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setPropertyForm({...propertyForm, images: [...propertyForm.images, `https://tanavi-properties-backend.onrender.com${data.url}`]});
      } else {
        alert(`Upload failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Error uploading image: ${error.message}`);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const removeImage = (index) => {
    setPropertyForm({...propertyForm, images: propertyForm.images.filter((_, i) => i !== index)});
  };

  const handlePropertySubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editingProperty 
      ? `https://tanavi-properties-backend.onrender.com/api/properties/${editingProperty._id}`
      : 'https://tanavi-properties-backend.onrender.com/api/properties';
    
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
        fetchProperties();
        setShowPropertyForm(false);
        setEditingProperty(null);
        setPropertyForm({ title: '', category: '', price: '', location: '', area: '', bedrooms: '', bathrooms: '', description: '', features: '', images: [], status: 'available' });
      }
    } catch (error) {
      console.error('Error saving property:', error);
    }
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Delete this property?')) return;
    const token = localStorage.getItem('token');
    try {
      await fetch(`https://tanavi-properties-backend.onrender.com/api/properties/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
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
      status: property.status
    });
    setShowPropertyForm(true);
  };

  const handleScheduleStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`https://tanavi-properties-backend.onrender.com/api/schedules/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      fetchSchedules();
    } catch (error) {
      console.error('Error updating schedule:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-4 mb-6">
          <button onClick={() => setActiveTab('properties')} className={`flex items-center gap-2 px-6 py-3 rounded ${activeTab === 'properties' ? 'bg-blue-600 text-white' : 'bg-white'}`}>
            <FaHome /> Properties
          </button>
          <button onClick={() => setActiveTab('schedules')} className={`flex items-center gap-2 px-6 py-3 rounded ${activeTab === 'schedules' ? 'bg-blue-600 text-white' : 'bg-white'}`}>
            <FaCalendar /> Schedules
          </button>
        </div>

        {activeTab === 'properties' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Manage Properties</h2>
              <button onClick={() => { setShowPropertyForm(true); setEditingProperty(null); setPropertyForm({ title: '', category: '', price: '', location: '', area: '', bedrooms: '', bathrooms: '', description: '', features: '', images: [], status: 'available' }); }} className="bg-green-600 text-white px-4 py-2 rounded">
                Add Property
              </button>
            </div>

            {showPropertyForm && (
              <div className="bg-white p-6 rounded shadow mb-6">
                <h3 className="text-lg font-bold mb-4">{editingProperty ? 'Edit' : 'Add'} Property</h3>
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
                            <img src={img} alt="Property" className="w-full h-20 object-cover rounded" />
                            <button type="button" onClick={() => removeImage(idx)} className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs">×</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="col-span-2 flex gap-2">
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Save</button>
                    <button type="button" onClick={() => { setShowPropertyForm(false); setEditingProperty(null); }} className="bg-gray-400 text-white px-6 py-2 rounded">Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">Title</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Price</th>
                    <th className="px-4 py-3 text-left">Location</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map(property => (
                    <tr key={property._id} className="border-t">
                      <td className="px-4 py-3">{property.title}</td>
                      <td className="px-4 py-3">{property.category}</td>
                      <td className="px-4 py-3">{property.price}</td>
                      <td className="px-4 py-3">{property.location}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-xs ${property.status === 'available' ? 'bg-green-100 text-green-800' : property.status === 'sold' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{property.status}</span></td>
                      <td className="px-4 py-3">
                        <button onClick={() => handleEditProperty(property)} className="text-blue-600 mr-3">Edit</button>
                        <button onClick={() => handleDeleteProperty(property._id)} className="text-red-600">Delete</button>
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
            <div className="bg-white rounded shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">Property</th>
                    <th className="px-4 py-3 text-left">Customer</th>
                    <th className="px-4 py-3 text-left">Contact</th>
                    <th className="px-4 py-3 text-left">Date & Time</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map(schedule => (
                    <tr key={schedule._id} className="border-t">
                      <td className="px-4 py-3">{schedule.propertyTitle}</td>
                      <td className="px-4 py-3">{schedule.name}</td>
                      <td className="px-4 py-3">{schedule.phone}<br/><span className="text-sm text-gray-600">{schedule.email}</span></td>
                      <td className="px-4 py-3">{schedule.date} {schedule.time}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs ${schedule.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : schedule.status === 'approved' ? 'bg-blue-100 text-blue-800' : schedule.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {schedule.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {schedule.status === 'pending' && (
                          <button onClick={() => handleScheduleStatus(schedule._id, 'approved')} className="text-blue-600 mr-2">Approve</button>
                        )}
                        {schedule.status === 'approved' && (
                          <button onClick={() => handleScheduleStatus(schedule._id, 'completed')} className="text-green-600 mr-2">Complete</button>
                        )}
                        <button onClick={() => handleScheduleStatus(schedule._id, 'cancelled')} className="text-red-600">Cancel</button>
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
