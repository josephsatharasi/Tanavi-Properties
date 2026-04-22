import React, { useState, useEffect, useCallback } from 'react';
import { FaCheckCircle, FaTimesCircle, FaEdit, FaClipboardList, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import API_URL, { getImageUrl } from '../utils/api';

const UserSubmissions = ({ onEditProperty, onSwitchToProperties, showToast }) => {
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSubmissionDetail, setShowSubmissionDetail] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const fetchUserSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/properties`);
      const data = await res.json();
      // Filter for user-submitted properties with pending status
      const submissions = data.filter(p => 
        p.sections && p.sections.includes('user-submitted') && p.status === 'pending'
      );
      setUserSubmissions(submissions);
    } catch (error) {
      console.error('Error fetching user submissions:', error);
      showToast('Failed to fetch user submissions', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchUserSubmissions();
  }, [fetchUserSubmissions]);

  const formatIndianPrice = (price) => {
    if (!price) return '0';
    const numericPrice = price.toString().replace(/[^0-9]/g, '');
    if (!numericPrice) return '0';
    return new Intl.NumberFormat('en-IN').format(numericPrice);
  };

  const formatSubmissionFieldValue = (key, value) => {
    if (value === null || value === undefined || value === '') return '-';

    if (key === 'road') {
      const roadStr = String(value).trim();
      const match = roadStr.match(/\d+/);
      if (match) return `${match[0]} Feet Road`;
      return roadStr;
    }

    return value;
  };

  const handleApproveSubmission = async (id) => {
    if (!window.confirm('Approve this property submission? It will be published on the public portal.')) return;
    const token = localStorage.getItem('token');
    
    // Find the submission to get all its data
    const submission = userSubmissions.find(s => s._id === id);
    if (!submission) {
      showToast('Submission not found', 'error');
      return;
    }

    try {
      // Prepare the update data - keep all existing fields and update status to available
      // Remove 'user-submitted' from sections so it doesn't show in pending list anymore
      const updateData = {
        status: 'available',
        sections: ['featured'] // Add to featured section so it shows on home page and category pages
      };

      const res = await fetch(`${API_URL}/api/properties/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(updateData)
      });
      
      if (res.ok) {
        await fetchUserSubmissions();
        showToast('Property approved and published on public portal!', 'success');
      } else {
        const error = await res.json();
        showToast(error.message || 'Failed to approve property', 'error');
      }
    } catch (error) {
      console.error('Approval error:', error);
      showToast('Failed to approve property', 'error');
    }
  };

  const handleRejectSubmission = async (id) => {
    if (!window.confirm('Reject and delete this property submission?')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/api/properties/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        await fetchUserSubmissions(); // Refresh the list
        showToast('Property submission rejected and deleted!', 'success');
      } else {
        showToast('Failed to reject property', 'error');
      }
    } catch (error) {
      showToast('Failed to reject property', 'error');
    }
  };

  const handleEditAndApprove = (submission) => {
    onEditProperty({
      title: submission.title,
      category: submission.category,
      price: submission.price,
      location: submission.location,
      area: submission.area || '',
      bedrooms: submission.bedrooms || '',
      bathrooms: submission.bathrooms || '',
      description: submission.description || '',
      features: submission.features?.join(', ') || '',
      images: submission.images || [],
      status: 'available',
      sections: ['featured']
    }, submission);
    onSwitchToProperties();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">User Property Submissions</h2>
          <p className="text-sm text-gray-600 mt-1">Review and approve properties submitted by users from the public portal</p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
          {userSubmissions.length} Pending
        </div>
      </div>

      {userSubmissions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <FaClipboardList className="mx-auto text-gray-300 text-6xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Pending Submissions</h3>
          <p className="text-gray-500">All user property submissions have been reviewed</p>
        </div>
      ) : (
        <div>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4 rounded">
            <p className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> Click on any row to view complete property details
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Submitted Date</th>
                  <th className="px-6 py-4 text-left font-semibold">User Details</th>
                  <th className="px-6 py-4 text-left font-semibold">Property Details</th>
                  <th className="px-6 py-4 text-left font-semibold">Location & Price</th>
                  <th className="px-6 py-4 text-left font-semibold">Images</th>
                  <th className="px-6 py-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userSubmissions.map(submission => (
                  <tr 
                    key={submission._id} 
                    onClick={() => {
                      setSelectedSubmission(submission);
                      setShowSubmissionDetail(true);
                    }}
                    className="border-b hover:bg-green-50 transition-colors duration-200 cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-semibold text-gray-800">
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {new Date(submission.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-semibold text-gray-800">{submission.name || '-'}</div>
                        <div className="text-gray-600">{submission.email || '-'}</div>
                        <div className="text-gray-600">{submission.phone || '-'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-semibold text-gray-800">{submission.title}</div>
                        <div className="text-gray-600">{submission.category}</div>
                        {submission.area && <div className="text-gray-500 text-xs">{submission.area}</div>}
                        {submission.bedrooms && <div className="text-gray-500 text-xs">{submission.bedrooms} BHK</div>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-semibold text-green-700">₹{formatIndianPrice(submission.price)}</div>
                        <div className="text-gray-600">{submission.location}</div>
                        {submission.locationUrl && (
                          <a 
                            href={submission.locationUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-blue-600 hover:underline text-xs"
                          >
                            View Map
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {submission.images && submission.images.length > 0 ? (
                        <div className="flex gap-1">
                          {submission.images.slice(0, 3).map((img, idx) => (
                            <img 
                              key={idx}
                              src={getImageUrl(img)} 
                              alt="Property" 
                              className="w-12 h-12 object-cover rounded border"
                              onError={(e) => e.target.src = 'https://via.placeholder.com/50x50?text=No+Image'}
                            />
                          ))}
                          {submission.images.length > 3 && (
                            <div className="w-12 h-12 bg-gray-200 rounded border flex items-center justify-center text-xs text-gray-600">
                              +{submission.images.length - 3}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">No images</span>
                      )}
                      {submission.video && (
                        <div className="text-xs text-blue-600 mt-1">Has video</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => handleApproveSubmission(submission._id)} 
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-semibold transition flex items-center justify-center gap-2"
                        >
                          <FaCheckCircle /> Approve
                        </button>
                        <button 
                          onClick={() => handleRejectSubmission(submission._id)} 
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-semibold transition flex items-center justify-center gap-2"
                        >
                          <FaTimesCircle /> Reject
                        </button>
                        <button 
                          onClick={() => handleEditAndApprove(submission)} 
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold transition flex items-center justify-center gap-2"
                        >
                          <FaEdit /> Edit & Approve
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Submission Detail Modal */}
      {showSubmissionDetail && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden my-8">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 flex justify-between items-center z-10">
              <h3 className="text-2xl font-bold truncate pr-4">Property Submission Details</h3>
              <button 
                onClick={() => {
                  setShowSubmissionDetail(false);
                  setSelectedSubmission(null);
                }} 
                className="text-white hover:text-gray-200 text-2xl flex-shrink-0"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto overflow-x-hidden max-h-[calc(90vh-80px)]">
              {/* User Contact Information */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <h4 className="text-lg font-bold text-blue-900 mb-3">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="overflow-hidden">
                    <label className="text-sm font-semibold text-blue-700">Name</label>
                    <p className="text-gray-800 text-lg font-medium break-words">{selectedSubmission.name || 'Not provided'}</p>
                  </div>
                  <div className="overflow-hidden">
                    <label className="text-sm font-semibold text-blue-700">Email</label>
                    <p className="text-gray-800 text-lg break-all">{selectedSubmission.email || 'Not provided'}</p>
                  </div>
                  <div className="overflow-hidden">
                    <label className="text-sm font-semibold text-blue-700">Phone</label>
                    <p className="text-gray-800 text-lg font-medium break-words">{selectedSubmission.phone || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Property Basic Information */}
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                <h4 className="text-lg font-bold text-green-900 mb-3">Property Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="overflow-hidden">
                    <label className="text-sm font-semibold text-green-700">Property Title</label>
                    <p className="text-gray-800 font-semibold text-lg break-words">{selectedSubmission.title}</p>
                  </div>
                  <div className="overflow-hidden">
                    <label className="text-sm font-semibold text-green-700">Category</label>
                    <p className="text-gray-800 text-lg break-words">{selectedSubmission.category}</p>
                  </div>
                  <div className="overflow-hidden">
                    <label className="text-sm font-semibold text-green-700">Price</label>
                    <p className="text-gray-800 font-bold text-green-700 text-xl break-words">₹{formatIndianPrice(selectedSubmission.price)}</p>
                  </div>
                  <div className="overflow-hidden">
                    <label className="text-sm font-semibold text-green-700">Location</label>
                    <p className="text-gray-800 text-lg break-words">{selectedSubmission.location}</p>
                  </div>
                  {selectedSubmission.area && (
                    <div className="overflow-hidden">
                      <label className="text-sm font-semibold text-green-700">Area</label>
                      <p className="text-gray-800 text-lg break-words">{selectedSubmission.area}</p>
                    </div>
                  )}
                  {selectedSubmission.bedrooms && (
                    <div className="overflow-hidden">
                      <label className="text-sm font-semibold text-green-700">Bedrooms</label>
                      <p className="text-gray-800 text-lg">{selectedSubmission.bedrooms} BHK</p>
                    </div>
                  )}
                  {selectedSubmission.bathrooms && (
                    <div className="overflow-hidden">
                      <label className="text-sm font-semibold text-green-700">Bathrooms</label>
                      <p className="text-gray-800 text-lg">{selectedSubmission.bathrooms}</p>
                    </div>
                  )}
                  {selectedSubmission.parkingType && (
                    <div className="overflow-hidden">
                      <label className="text-sm font-semibold text-green-700">Parking Type</label>
                      <p className="text-gray-800 text-lg">{selectedSubmission.parkingType}</p>
                    </div>
                  )}
                  {selectedSubmission.parkingCount > 0 && (
                    <div className="overflow-hidden">
                      <label className="text-sm font-semibold text-green-700">Parking Spaces</label>
                      <p className="text-gray-800 text-lg font-medium">{selectedSubmission.parkingCount} Car{selectedSubmission.parkingCount > 1 ? 's' : ''}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Office Space Specific Fields */}
              {selectedSubmission.category === 'Office Space' && (
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
                  <h4 className="text-lg font-bold text-purple-900 mb-3">Office Space Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedSubmission.builtUpArea && (
                      <div>
                        <label className="text-sm font-semibold text-purple-700">Built-up Area</label>
                        <p className="text-gray-800 text-lg font-medium">{formatIndianPrice(selectedSubmission.builtUpArea)} Sq. Ft</p>
                      </div>
                    )}
                    {selectedSubmission.pricePerSqFt && (
                      <div>
                        <label className="text-sm font-semibold text-purple-700">Price Per Sq.Ft</label>
                        <p className="text-gray-800 text-lg font-medium">₹{formatIndianPrice(selectedSubmission.pricePerSqFt)}</p>
                      </div>
                    )}
                    {selectedSubmission.expectedRent && (
                      <div>
                        <label className="text-sm font-semibold text-purple-700">Expected Rent</label>
                        <p className="text-gray-800 text-lg font-bold text-purple-700">₹{formatIndianPrice(selectedSubmission.expectedRent)}</p>
                      </div>
                    )}
                    {selectedSubmission.depositAmount && (
                      <div>
                        <label className="text-sm font-semibold text-purple-700">Deposit Amount</label>
                        <p className="text-gray-800 text-lg font-bold text-purple-700">₹{formatIndianPrice(selectedSubmission.depositAmount)}</p>
                      </div>
                    )}
                    {selectedSubmission.floor && (
                      <div>
                        <label className="text-sm font-semibold text-purple-700">Floor</label>
                        <p className="text-gray-800 text-lg">{selectedSubmission.floor}</p>
                      </div>
                    )}
                    {selectedSubmission.plugAndPlay && (
                      <div>
                        <label className="text-sm font-semibold text-purple-700">Plug & Play</label>
                        <p className="text-gray-800 text-lg font-medium">{selectedSubmission.plugAndPlay}</p>
                      </div>
                    )}
                    {selectedSubmission.workStations && (
                      <div>
                        <label className="text-sm font-semibold text-purple-700">Work Stations</label>
                        <p className="text-gray-800 text-lg">{selectedSubmission.workStations}</p>
                      </div>
                    )}
                    {selectedSubmission.cabins && (
                      <div>
                        <label className="text-sm font-semibold text-purple-700">Cabins</label>
                        <p className="text-gray-800 text-lg">{selectedSubmission.cabins}</p>
                      </div>
                    )}
                    {selectedSubmission.conferenceHall && (
                      <div>
                        <label className="text-sm font-semibold text-purple-700">Conference Hall</label>
                        <p className="text-gray-800 text-lg">{selectedSubmission.conferenceHall}</p>
                      </div>
                    )}
                    {selectedSubmission.pantry && (
                      <div>
                        <label className="text-sm font-semibold text-purple-700">Pantry</label>
                        <p className="text-gray-800 text-lg">{selectedSubmission.pantry}</p>
                      </div>
                    )}
                    {selectedSubmission.washroomDetails && (
                      <div className="md:col-span-2">
                        <label className="text-sm font-semibold text-purple-700">Washroom Details</label>
                        <p className="text-gray-800 text-lg">{selectedSubmission.washroomDetails}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              {selectedSubmission.description && (
                <div className="bg-gray-50 border-l-4 border-gray-500 p-4 mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Property Description</h4>
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b w-1/3">Field</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          try {
                            if (selectedSubmission.description.trim().startsWith('{')) {
                              const data = JSON.parse(selectedSubmission.description);
                              return Object.entries(data).map(([key, value], idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                  <td className="px-4 py-3 text-sm font-semibold text-gray-700 border-b capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-800 border-b break-words">
                                    {formatSubmissionFieldValue(key, value)}
                                  </td>
                                </tr>
                              ));
                            } else {
                              return (
                                <tr>
                                  <td colSpan="2" className="px-4 py-3 text-sm text-gray-800 break-words">
                                    <div className="whitespace-pre-wrap">{selectedSubmission.description}</div>
                                  </td>
                                </tr>
                              );
                            }
                          } catch (e) {
                            return (
                              <tr>
                                <td colSpan="2" className="px-4 py-3 text-sm text-gray-800 break-words">
                                  <div className="whitespace-pre-wrap">{selectedSubmission.description}</div>
                                </td>
                              </tr>
                            );
                          }
                        })()}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Location URL */}
              {selectedSubmission.locationUrl && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                  <h4 className="text-lg font-bold text-yellow-900 mb-3">Property Location Map</h4>
                  <div className="flex flex-col gap-3">
                    <a 
                      href={selectedSubmission.locationUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition w-fit"
                    >
                      <FaMapMarkerAlt /> Open in Google Maps
                    </a>
                    <div className="text-gray-600 text-sm break-all overflow-wrap-anywhere">
                      {selectedSubmission.locationUrl}
                    </div>
                  </div>
                </div>
              )}

              {/* Images */}
              {selectedSubmission.images && selectedSubmission.images.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Property Images ({selectedSubmission.images.length})</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedSubmission.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img 
                          src={getImageUrl(img)} 
                          alt={`Property ${idx + 1}`} 
                          className="w-full h-40 object-cover rounded-lg border-2 border-gray-200 group-hover:border-green-500 transition"
                          onError={(e) => e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition rounded-lg flex items-center justify-center">
                          <a 
                            href={getImageUrl(img)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-3 py-1 rounded text-sm font-semibold"
                          >
                            View Full
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Video */}
              {selectedSubmission.video && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Property Video</h4>
                  <video 
                    src={getImageUrl(selectedSubmission.video)} 
                    controls 
                    className="w-full max-h-96 rounded-lg border-2 border-gray-200"
                  />
                </div>
              )}

              {/* Submission Date */}
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Submitted On</label>
                    <p className="text-gray-800">
                      {new Date(selectedSubmission.createdAt).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div>
                    <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
                      Status: Pending Review
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-end">
                <button 
                  onClick={() => {
                    setShowSubmissionDetail(false);
                    handleRejectSubmission(selectedSubmission._id);
                  }} 
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 flex-shrink-0"
                >
                  <FaTimesCircle /> Reject & Delete
                </button>
                <button 
                  onClick={() => {
                    setShowSubmissionDetail(false);
                    handleEditAndApprove(selectedSubmission);
                  }} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 flex-shrink-0"
                >
                  <FaEdit /> Edit & Approve
                </button>
                <button 
                  onClick={() => {
                    setShowSubmissionDetail(false);
                    handleApproveSubmission(selectedSubmission._id);
                  }} 
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 flex-shrink-0"
                >
                  <FaCheckCircle /> Approve & Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSubmissions;
