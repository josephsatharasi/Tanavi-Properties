import React from 'react';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in">
      <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-2">{property.location}</p>
        <p className="text-2xl font-bold text-primary mb-4">₹{property.price}</p>
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>{property.bedrooms} BHK</span>
          <span>{property.area} sq.ft</span>
          <span>{property.type}</span>
        </div>
        <button 
          onClick={() => navigate(`/property/${property.id}`)}
          className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
