import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaUser } from 'react-icons/fa';
import API_URL from '../utils/api';

const UserManagement = ({ showToast, setModal }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [userForm, setUserForm] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/auth/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data.filter(u => u.role === 'user'));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm({ name: user.name, email: user.email, phone: user.phone || '' });
    setShowEditForm(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/api/auth/users/${editingUser._id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(userForm)
      });
      if (res.ok) {
        const updated = await res.json();
        setUsers(users.map(u => u._id === updated._id ? updated : u));
        setShowEditForm(false);
        setEditingUser(null);
        showToast('User updated successfully!', 'success');
      } else {
        showToast('Failed to update user', 'error');
      }
    } catch (error) {
      showToast('Failed to update user', 'error');
    }
  };

  const handleDeleteUser = (userId, userName) => {
    setModal({
      isOpen: true,
      type: 'warning',
      title: 'Confirm Delete',
      message: `Delete user "${userName}"? This will also delete all their chat messages.`,
      showCancel: true,
      onConfirm: async () => {
        setModal({ isOpen: false });
        const token = localStorage.getItem('token');
        try {
          const res = await fetch(`${API_URL}/api/auth/users/${userId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            setUsers(users.filter(u => u._id !== userId));
            showToast('User deleted successfully!', 'success');
          } else {
            showToast('Failed to delete user', 'error');
          }
        } catch (error) {
          showToast('Failed to delete user', 'error');
        }
      }
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">User Management (Chat Users)</h2>
        <div className="text-sm text-gray-600">Total Users: {users.length}</div>
      </div>

      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">Edit User</h3>
              <button 
                onClick={() => { setShowEditForm(false); setEditingUser(null); }} 
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={userForm.name}
                  onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={userForm.phone}
                  onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  Update User
                </button>
                <button 
                  type="button" 
                  onClick={() => { setShowEditForm(false); setEditingUser(null); }} 
                  className="px-6 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Name</th>
              <th className="px-6 py-4 text-left font-semibold">Email</th>
              <th className="px-6 py-4 text-left font-semibold">Phone</th>
              <th className="px-6 py-4 text-left font-semibold">Joined</th>
              <th className="px-6 py-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user._id} className="border-b hover:bg-blue-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-gray-400" />
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-gray-700">{user.phone || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => handleEditUser(user)} 
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-2 rounded-full transition mr-2"
                      title="Edit User"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user._id, user.name)} 
                      className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-full transition"
                      title="Delete User"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
