import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const BuySell = () => {
  const [activeTab, setActiveTab] = useState('sold');

  const soldProperties = [
    {
      id: 1,
      title: 'Agricultural Land',
      location: 'Shamshabad, Hyderabad',
      price: '45,00,000',
      area: 5000,
      soldDate: 'Jan 2024',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500'
    },
    {
      id: 2,
      title: 'Independent House',
      location: 'Gachibowli, Hyderabad',
      price: '1.2 Cr',
      area: 2500,
      soldDate: 'Feb 2024',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500'
    },
    {
      id: 3,
      title: 'Luxury Apartment',
      location: 'Hitech City, Hyderabad',
      price: '95,00,000',
      area: 1800,
      soldDate: 'Mar 2024',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500'
    },
    {
      id: 4,
      title: 'Open Plot',
      location: 'Kompally, Hyderabad',
      price: '28,00,000',
      area: 3000,
      soldDate: 'Dec 2023',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500'
    }
  ];

  const boughtProperties = [
    {
      id: 1,
      title: 'Farmhouse with Orchard',
      location: 'Chevella, Hyderabad',
      price: '2.5 Cr',
      area: 8000,
      boughtDate: 'Jan 2024',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500'
    },
    {
      id: 2,
      title: 'Commercial Plot',
      location: 'Kukatpally, Hyderabad',
      price: '1.8 Cr',
      area: 4500,
      boughtDate: 'Feb 2024',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500'
    },
    {
      id: 3,
      title: 'Villa',
      location: 'Jubilee Hills, Hyderabad',
      price: '3.5 Cr',
      area: 4000,
      boughtDate: 'Mar 2024',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500'
    }
  ];

  const displayProperties = activeTab === 'sold' ? soldProperties : boughtProperties;

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">Buy & Sell</h1>
        <p className="text-center text-gray-600 mb-12">Our successful property transactions</p>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('sold')}
            className={`px-8 py-3 rounded-lg font-semibold transition ${
              activeTab === 'sold'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Sold Properties
          </button>
          <button
            onClick={() => setActiveTab('bought')}
            className={`px-8 py-3 rounded-lg font-semibold transition ${
              activeTab === 'bought'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Bought Properties
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="relative">
                <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
                <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                  <FaCheckCircle />
                  <span>{activeTab === 'sold' ? 'Sold' : 'Bought'}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{property.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                <p className="text-xl font-bold text-gray-900 mb-2">₹ {property.price}</p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{property.area} sq.ft</span>
                  <span>{property.soldDate || property.boughtDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuySell;
