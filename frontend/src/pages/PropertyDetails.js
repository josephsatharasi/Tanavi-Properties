import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { properties } from '../data/properties';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === parseInt(id));
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!property) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % property.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [property]);

  if (!property) {
    return <div className="pt-20 text-center">Property not found</div>;
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => navigate('/')} 
          className="mb-6 text-primary hover:underline flex items-center gap-2"
        >
          ← Back to Properties
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96 overflow-hidden">
            {property.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${property.title} ${index + 1}`}
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
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
            <p className="text-2xl text-primary font-bold mb-6">₹{property.price}</p>
            <p className="text-gray-600 mb-8">{property.location}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {property.type !== 'Agricultural Land' && property.type !== 'Open Plot' && property.bedrooms > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-primary">{property.bedrooms}</p>
                  <p className="text-gray-600">Bedrooms</p>
                </div>
              )}
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">{property.area}</p>
                <p className="text-gray-600">Sq.ft</p>
              </div>
              {property.type !== 'Agricultural Land' && property.type !== 'Open Plot' && property.bathrooms > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-primary">{property.bathrooms}</p>
                  <p className="text-gray-600">Bathrooms</p>
                </div>
              )}
              {property.parking > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-primary">{property.parking}</p>
                  <p className="text-gray-600">Parking</p>
                </div>
              )}
              {property.type === 'Agricultural Land' && (
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-primary">{property.type}</p>
                  <p className="text-gray-600">Property Type</p>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Property Description</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

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

            <button className="w-full bg-primary text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
              Schedule a Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
