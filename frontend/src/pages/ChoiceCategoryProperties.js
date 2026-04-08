import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import PropertyCard from '../components/PropertyCard';
import LoadingSpinner from '../components/LoadingSpinner';
import API_URL from '../utils/api';

const ChoiceCategoryProperties = () => {
  const { category: categorySlug } = useParams();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map slugs to actual category names
  const categoryMap = {
    'agricultural-land': 'Agricultural Land',
    'independent-house': 'Independent House',
    'open-plot': 'Open Plot',
    'apartment': 'Apartment',
    'farmhouse': 'Farmhouse',
    'office-commercial-space': 'Office / Commercial Space'
  };

  const category = categoryMap[categorySlug] || categorySlug;

  console.log('ChoiceCategoryProperties rendered, slug:', categorySlug, 'category:', category);

  useEffect(() => {
    fetchProperties();
    
    // Always start at top when entering category page
    const returnSection = sessionStorage.getItem('returnSection');
    
    if (returnSection === 'choice') {
      // Returning from property details - go to top of page
      window.scrollTo(0, 0);
      // Reset returnSection back to 'choice-properties' for home navigation
      sessionStorage.setItem('returnSection', 'choice-properties');
      sessionStorage.removeItem('returnCategory');
    } else if (!returnSection) {
      // Coming fresh from home - start at top
      window.scrollTo(0, 0);
    }
  }, [categorySlug]);

  const fetchProperties = async () => {
    try {
      const res = await fetch(`${API_URL}/api/properties`);
      const data = await res.json();
      console.log('All properties:', data);
      console.log('Looking for category:', category);
      const filtered = data.filter(p => {
        const sections = p.sections || [p.section];
        console.log(`Property: ${p.title}, sections:`, sections, 'category:', p.category, 'match:', p.category === category);
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

  const handleBackClick = () => {
    // Store the section for Home to restore (same as HighlightCard)
    // returnSection and scrollPosition are already in sessionStorage from when we navigated here
    navigate('/');
  };

  if (loading) {
    console.log('Still loading...');
    return <LoadingSpinner />;
  }

  console.log('Rendering page, properties count:', properties.length);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12" style={{ minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-primary hover:text-secondary transition-colors font-semibold"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">{category}</h1>
        
        {properties.length === 0 ? (
          <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl p-12 text-center">
              <div className="text-primary mb-6">
                <svg className="w-32 h-32 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-gray-800 text-2xl font-bold mb-3">No Properties Available</h2>
              <p className="text-gray-600 text-base mb-6">
                We currently don't have any properties in this category. Please check back later or explore other categories.
              </p>
              <button
                onClick={handleBackClick}
                className="bg-primary text-white px-8 py-3 rounded-lg hover:opacity-90 transition font-semibold"
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard 
                key={property._id} 
                property={property} 
                section="choice"
                fromCategory={category}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChoiceCategoryProperties;
