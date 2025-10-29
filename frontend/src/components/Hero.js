import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

const Hero = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (propertyType) params.append('type', propertyType);
    if (priceRange) params.append('price', priceRange);
    navigate(`/category/all?${params.toString()}`);
  };

  return (
    <section id="home" className="pt-16 min-h-[500px] flex items-center" style={{
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Dream Property<br />with Tanavi Properties
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Trusted platform for Agricultural Lands, Homes,<br />Open Plots, Flats & Farmhouses.
          </p>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-lg p-6 max-w-4xl shadow-lg">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <select 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded text-gray-700 focus:outline-none focus:border-primary appearance-none"
                >
                  <option value="">Location</option>
                  <option value="Gachibowli">Gachibowli</option>
                  <option value="Hitech City">Hitech City</option>
                  <option value="Madhapur">Madhapur</option>
                  <option value="Kondapur">Kondapur</option>
                  <option value="Shamshabad">Shamshabad</option>
                  <option value="Kompally">Kompally</option>
                  <option value="Jubilee Hills">Jubilee Hills</option>
                  <option value="Banjara Hills">Banjara Hills</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <select 
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded text-gray-700 focus:outline-none focus:border-primary appearance-none"
                  >
                    <option value="">Property Type</option>
                    <option value="Agricultural Land">Agricultural Land</option>
                    <option value="Independent House">Independent House</option>
                    <option value="Open Plot">Open Plot</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Farmhouse">Farmhouse</option>
                    <option value="Office Space">Office Space</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
                <div className="relative">
                  <select 
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded text-gray-700 focus:outline-none focus:border-primary appearance-none"
                  >
                    <option value="">Budget Range</option>
                    <option value="0-50">Under 50 Lakhs</option>
                    <option value="50-100">50L - 1 Cr</option>
                    <option value="100-200">1 Cr - 2 Cr</option>
                    <option value="200-500">2 Cr - 5 Cr</option>
                    <option value="500+">Above 5 Cr</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <button 
                onClick={handleSearch}
                className="w-full bg-primary text-white px-6 py-3 rounded hover:bg-opacity-90 transition font-medium"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
