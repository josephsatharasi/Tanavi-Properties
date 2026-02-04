import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaBath, FaCar, FaRulerCombined } from 'react-icons/fa';
import { getImageUrl } from '../utils/api';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const getAreaUnit = (type) => {
    if (type === 'Agricultural Land' || type === 'Farmhouse') return 'Acres/Guntas';
    if (type === 'Open Plot') return 'Sq Yards';
    if (type === 'Independent House' || type === 'Apartment' || type === 'Office / Commercial Space') return 'SFT';
    return '';
  };

  const getPropertyDetails = () => {
    const type = property.category || property.type;
    const unit = getAreaUnit(type);
    
    if (type === 'Agricultural Land' || type === 'Farmhouse') {
      return (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaRulerCombined />
          <span>{property.area || 'N/A'} {unit}</span>
        </div>
      );
    }
    
    if (type === 'Open Plot') {
      return (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaRulerCombined />
          <span>{property.area || 'N/A'} {unit}</span>
        </div>
      );
    }
    
    if (type === 'Office / Commercial Space') {
      return (
        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FaRulerCombined />
            <span>{property.area || 'N/A'} {unit}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaCar />
            <span>{property.parking || 'N/A'}</span>
          </div>
        </div>
      );
    }
    
    return (
      <div className="flex justify-between text-sm text-gray-600">
        {property.bedrooms && (
          <div className="flex items-center gap-1">
            <FaBed />
            <span>{property.bedrooms}</span>
          </div>
        )}
        {property.bathrooms && (
          <div className="flex items-center gap-1">
            <FaBath />
            <span>{property.bathrooms}</span>
          </div>
        )}
        {property.area && (
          <div className="flex items-center gap-1">
            <FaRulerCombined />
            <span>{property.area} {unit}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 border border-gray-200 h-full flex flex-col">
      <div className="relative">
        <img src={getImageUrl(property.images?.[0] || property.image)} alt={property.title} className="w-full h-48 object-cover" loading="lazy" />
        {property.propertyCode && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            ID: {property.propertyCode}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{property.title}</h3>
          {property.propertyCode && (
            <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded">
              {property.propertyCode}
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-2">{property.location}</p>
        <p className="text-xl font-bold text-gray-900 mb-3">₹ {property.price}</p>
        <div className="mb-4 flex-grow">
          {getPropertyDetails()}
        </div>
        <button 
          onClick={() => navigate(`/property/${property._id || property.id}`)}
          className="w-full bg-primary text-white py-2 rounded hover:opacity-90 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
