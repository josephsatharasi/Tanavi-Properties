import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import LoadingSpinner from '../components/LoadingSpinner';
import API_URL from '../utils/api';

const CategoryProperties = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const location = searchParams.get('location');
  const type = searchParams.get('type');
  const priceRange = searchParams.get('price');
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    const fetchProperties = () => {
      fetch(`${API_URL}/api/properties?t=${Date.now()}`, { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
          const activeProps = data.filter(p => {
            const isNotExpired = !p.expiryDate || new Date(p.expiryDate) > new Date();
            const isActiveProperty = p.isActive !== false;
            return p.status === 'available' && isNotExpired && isActiveProperty;
          });
          setProperties(activeProps);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching properties:', err);
          setLoading(false);
        });
    };

    fetchProperties();
    const interval = setInterval(fetchProperties, 5000);
    return () => clearInterval(interval);
  }, []);
  
  const categoryMap = {
    'agricultural-lands': 'Agricultural Land',
    'independent-house': 'Independent House',
    'open-plots': 'Open Plot',
    'farmhouses': 'Farmhouse',
    'apartment': 'Apartment',
    'office-space': 'Office / Commercial Space',
    'all': 'All Properties'
  };

  const categoryName = categoryMap[category] || category;
  
  const getPriceInLakhs = (priceStr) => {
    const price = priceStr.replace(/,/g, '');
    if (price.includes('Cr')) {
      return parseFloat(price) * 100;
    }
    if (price.includes('Lakhs')) {
      return parseFloat(price);
    }
    return parseFloat(price) / 100000;
  };
  
  let filteredProperties = category === 'all' ? properties : properties.filter(p => p.category === categoryName || p.type === categoryName);
  
  if (searchQuery) {
    filteredProperties = filteredProperties.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.propertyCode && p.propertyCode.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }
  
  if (location) {
    filteredProperties = filteredProperties.filter(p => p.location.includes(location));
  }
  
  if (type) {
    filteredProperties = filteredProperties.filter(p => p.type === type);
  }
  
  if (priceRange) {
    filteredProperties = filteredProperties.filter(p => {
      const price = getPriceInLakhs(p.price);
      if (priceRange === '0-50') return price < 50;
      if (priceRange === '50-100') return price >= 50 && price < 100;
      if (priceRange === '100-200') return price >= 100 && price < 200;
      if (priceRange === '200-500') return price >= 200 && price < 500;
      if (priceRange === '500+') return price >= 500;
      return true;
    });
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">{categoryName}</h1>
        {(location || type || priceRange || searchQuery) && (
          <div className="mb-4 flex gap-2 flex-wrap">
            {searchQuery && <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Search: {searchQuery}</span>}
            {location && <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Location: {location}</span>}
            {type && <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Type: {type}</span>}
            {priceRange && <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Budget: {priceRange === '500+' ? 'Above 5 Cr' : priceRange.split('-').join('L - ') + (priceRange.includes('-') ? 'L' : '')}</span>}
          </div>
        )}
        <p className="text-gray-600 mb-8">{filteredProperties.length} properties found</p>
        
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property._id || property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProperties;
