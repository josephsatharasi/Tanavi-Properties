import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { getImageUrl } from '../utils/api';

const HighlightCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 h-full">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={getImageUrl(property.images?.[0] || property.image)} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          loading="lazy" 
        />
        <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          ₹ {property.price}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors">{property.title}</h3>
        <div className="flex items-center text-gray-600 mb-4">
          <FaMapMarkerAlt className="mr-2 text-primary" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <button 
          onClick={() => {
            navigate(`/property/${property._id || property.id}`);
            window.scrollTo(0, 0);
          }}
          className="flex items-center justify-between w-full text-primary font-semibold group-hover:text-secondary transition-colors"
        >
          <span>View Details</span>
          <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

export default HighlightCard;
