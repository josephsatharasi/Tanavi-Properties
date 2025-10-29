import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ScheduleVisitModal from '../components/ScheduleVisitModal';
import LoadingSpinner from '../components/LoadingSpinner';
import API_URL, { getImageUrl } from '../utils/api';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/properties/${id}`)
      .then(res => res.json())
      .then(data => {
        setProperty(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching property:', err);
        setLoading(false);
      });
  }, [id]);

  const handleShare = () => {
    const url = window.location.href;
    const text = `🏡 Tanavi Properties\n\nCheck out this property: ${property.title} - ₹${property.price} at ${property.location}\n\nYour trusted partner in finding the perfect property!`;
    
    if (navigator.share) {
      navigator.share({ title: property.title, text, url })
        .catch(() => setShowShareMenu(true));
    } else {
      setShowShareMenu(true);
    }
  };

  const shareToWhatsApp = () => {
    const url = window.location.href;
    const text = `🏡 *Tanavi Properties*\n\nCheck out this property: ${property.title} - ₹${property.price} at ${property.location}\n\n${url}\n\nYour trusted partner in finding the perfect property!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    setShowShareMenu(false);
  };

  const shareToFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    setShowShareMenu(false);
  };

  const shareToTwitter = () => {
    const url = window.location.href;
    const text = `Check out this property: ${property.title}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    setShowShareMenu(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
    setShowShareMenu(false);
  };

  useEffect(() => {
    if (!property || !property.images || property.images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % property.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [property]);

  if (loading) return <LoadingSpinner />;
  if (!property) return <div className="pt-20 text-center">Property not found</div>;

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => {
              navigate('/');
              setTimeout(() => window.scrollTo(0, 0), 0);
            }} 
            className="text-primary hover:underline flex items-center gap-2"
          >
            ← Back to Properties
          </button>
          <div className="relative">
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              Share
            </button>
            {showShareMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 py-2">
                <button onClick={shareToWhatsApp} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                  <span className="text-green-500">📱</span> WhatsApp
                </button>
                <button onClick={shareToFacebook} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                  <span className="text-blue-600">📘</span> Facebook
                </button>
                <button onClick={shareToTwitter} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                  <span className="text-blue-400">🐦</span> Twitter
                </button>
                <button onClick={copyLink} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                  <span>🔗</span> Copy Link
                </button>
                <button onClick={() => setShowShareMenu(false)} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
                  ✕ Close
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96 overflow-hidden">
            {property.images && property.images.length > 0 ? (
              <>
                {property.images.map((img, index) => (
                  <img
                    key={index}
                    src={getImageUrl(img)}
                    alt={`${property.title} ${index + 1}`}
                    loading="lazy"
                    className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                      index === currentImage ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImage ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <img src="https://via.placeholder.com/800x400?text=No+Image" alt={property.title} className="w-full h-full object-cover" />
            )}
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
            <p className="text-2xl text-primary font-bold mb-6">₹{property.price}</p>
            <p className="text-gray-600 mb-8">{property.location}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {property.bedrooms > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-primary">{property.bedrooms}</p>
                  <p className="text-gray-600">Bedrooms</p>
                </div>
              )}
              {property.area && (
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-primary">{property.area}</p>
                  <p className="text-gray-600">Area</p>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-primary">{property.bathrooms}</p>
                  <p className="text-gray-600">Bathrooms</p>
                </div>
              )}
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-lg font-bold text-primary">{property.category || property.type}</p>
                <p className="text-gray-600">Property Type</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Property Description</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {property.features && property.features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {property.dimensions && property.dimensions.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Dimensions</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.dimensions.map((dim, index) => (
                      <div key={index} className="flex justify-between border-b pb-2">
                        <span className="font-semibold">{dim.room}:</span>
                        <span className="text-gray-600">{dim.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-primary text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Schedule a Visit
            </button>
          </div>
        </div>
      </div>
      
      <ScheduleVisitModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        propertyTitle={property?.title}
        propertyId={property?._id}
      />
    </div>
  );
};

export default PropertyDetails;
