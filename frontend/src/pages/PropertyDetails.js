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

  const getAreaUnit = (type) => {
    if (type === 'Agricultural Land' || type === 'Farmhouse') return 'Acres/Guntas';
    if (type === 'Open Plot') return 'Sq Yards';
    if (type === 'Independent House' || type === 'Apartment' || type === 'Office Space') return 'SFT';
    return '';
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/properties/${id}`)
      .then(res => res.json())
      .then(data => {
        setProperty(data);
        setLoading(false);
        
        // Update meta tags for sharing
        if (data) {
          const imageUrl = data.images?.[0] ? getImageUrl(data.images[0]) : '';
          const propertyId = data.propertyCode ? `[${data.propertyCode}]` : '';
          
          document.title = `${propertyId} ${data.title} - Tanavi Properties`;
          
          // Update or create meta tags
          updateMetaTag('og:title', `${propertyId} ${data.title}`);
          updateMetaTag('og:description', `${data.title} - ₹${data.price} at ${data.location}`);
          updateMetaTag('og:image', imageUrl);
          updateMetaTag('og:url', window.location.href);
          updateMetaTag('twitter:card', 'summary_large_image');
          updateMetaTag('twitter:image', imageUrl);
        }
      })
      .catch(err => {
        console.error('Error fetching property:', err);
        setLoading(false);
      });
  }, [id]);

  const updateMetaTag = (property, content) => {
    let element = document.querySelector(`meta[property="${property}"]`) || 
                  document.querySelector(`meta[name="${property}"]`);
    
    if (!element) {
      element = document.createElement('meta');
      if (property.startsWith('og:') || property.startsWith('twitter:')) {
        element.setAttribute('property', property);
      } else {
        element.setAttribute('name', property);
      }
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  const handleShare = async () => {
    const backendUrl = API_URL.replace('/api', '');
    const shareUrl = `${backendUrl}/api/share/${property._id}`;
    const propertyId = property.propertyCode ? `[${property.propertyCode}]` : '';
    const text = `${propertyId} ${property.title} - ₹${property.price} at ${property.location}. Your trusted partner in finding the perfect property!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${propertyId} ${property.title}`,
          text: text,
          url: shareUrl
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          navigator.clipboard.writeText(shareUrl);
          alert('Link copied to clipboard!');
        }
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
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
            onClick={() => navigate(-1)} 
            className="text-primary hover:underline flex items-center gap-2"
          >
            ← Back to Properties
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:opacity-90 transition"
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
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96 overflow-hidden">
            {property.images && property.images.length > 0 ? (
              <>
                {property.images.map((img, index) => (
                  <img
                    key={index}
                    src={getImageUrl(img, property.propertyCode)}
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
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-4xl font-bold">{property.title}</h1>
              {property.propertyCode && (
                <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm">
                  ID: {property.propertyCode}
                </div>
              )}
            </div>
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
                  <p className="text-gray-600">{getAreaUnit(property.category || property.type)}</p>
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

            {property.video && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Property Video</h2>
                <video src={getImageUrl(property.video)} controls className="w-full rounded-lg" />
              </div>
            )}

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
              className="w-full bg-primary text-white py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition"
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
        propertyCode={property?.propertyCode}
      />
    </div>
  );
};

export default PropertyDetails;
