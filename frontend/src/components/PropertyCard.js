import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaBath, FaCar, FaRulerCombined } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const getPropertyDetails = () => {
    const type = property.type;
    
    if (type === 'Agricultural Land' || type === 'Open Plot') {
      return (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaRulerCombined />
          <span>{property.area} sq.ft</span>
        </div>
      );
    }
    
    if (type === 'Office Space') {
      return (
        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FaRulerCombined />
            <span>{property.area} sq.ft</span>
          </div>
          <div className="flex items-center gap-1">
            <FaCar />
            <span>{property.parking}</span>
          </div>
        </div>
      );
    }
    
    return (
      <div className="flex justify-between text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <FaBed />
          <span>{property.bedrooms}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaBath />
          <span>{property.bathrooms}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaRulerCombined />
          <span>{property.area}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200">
      <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1">{property.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{property.location}</p>
        <p className="text-xl font-bold text-gray-900 mb-3">₹ {property.price}</p>
        <div className="mb-4">
          {getPropertyDetails()}
        </div>
        <button 
          onClick={() => navigate(`/property/${property.id}`)}
          className="w-full bg-primary text-white py-2 rounded hover:bg-opacity-90 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
