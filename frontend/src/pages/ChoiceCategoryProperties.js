import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import LoadingSpinner from '../components/LoadingSpinner';
import API_URL from '../utils/api';

const ChoiceCategoryProperties = () => {
  const { category } = useParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, [category]);

  const fetchProperties = async () => {
    try {
      const res = await fetch(`${API_URL}/api/properties`);
      const data = await res.json();
      console.log('All properties:', data);
      const filtered = data.filter(p => {
        const sections = p.sections || [p.section];
        console.log(`Property: ${p.title}, sections:`, sections, 'category:', p.category);
        return p.category === category && p.status === 'available' && sections.includes('choice');
      });
      console.log('Filtered choice properties:', filtered);
      setProperties(filtered);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">{category}</h1>
        
        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties available in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChoiceCategoryProperties;
