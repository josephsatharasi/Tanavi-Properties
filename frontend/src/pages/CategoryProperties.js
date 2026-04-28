import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import PropertyCard from '../components/PropertyCard';
import LoadingSpinner from '../components/LoadingSpinner';
import API_URL from '../utils/api';

const CategoryProperties = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const propertyRefs = useRef({});
  const hasRestoredRef = useRef(false);
  
  const locationParam = searchParams.get('location');
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

  // Get ref for a specific property card
  const getPropertyRef = useCallback((propertyId) => {
    if (!propertyRefs.current[propertyId]) {
      propertyRefs.current[propertyId] = React.createRef();
    }
    return propertyRefs.current[propertyId];
  }, []);

  // Restore scroll and highlight card when returning from detail page
  useEffect(() => {
    if (hasRestoredRef.current || loading) return;

    const shouldRestore = location.state?.restoreContext === true;
    const clickedPropertyId = location.state?.clickedPropertyId;
    const savedScrollPosition = location.state?.scrollPosition;

    if (shouldRestore) {
      if (clickedPropertyId && propertyRefs.current[clickedPropertyId]) {
        // Scroll to the clicked card and highlight it
        setTimeout(() => {
          const cardRef = propertyRefs.current[clickedPropertyId];
          if (cardRef?.current) {
            cardRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });

            // Add highlight effect
            cardRef.current.classList.add('card-highlight');
            setTimeout(() => {
              cardRef.current?.classList.remove('card-highlight');
            }, 2000);
          }
        }, 150);
      } else if (savedScrollPosition !== undefined) {
        // Fallback to scroll position
        setTimeout(() => {
          window.scrollTo({
            top: savedScrollPosition,
            behavior: 'smooth',
          });
        }, 150);
      }
      hasRestoredRef.current = true;
    } else {
      // Fresh navigation - scroll to top
      window.scrollTo(0, 0);
    }
  }, [loading, location.state]);
  
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
  
  if (locationParam) {
    filteredProperties = filteredProperties.filter(p => p.location === locationParam);
  }
  
  if (type) {
    filteredProperties = filteredProperties.filter(p => p.category === type);
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

  const handleBackClick = () => {
    // Navigate back to home with restoration context
    const categorySlug = location.state?.categorySlug || category;
    const scrollPosition = location.state?.scrollPosition;

    navigate('/', {
      state: {
        restoreContext: true,
        clickedPropertyId: categorySlug, // Use category slug as the "card" ID
        scrollPosition: scrollPosition,
      }
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-primary hover:text-secondary transition-colors font-semibold"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">{categoryName}</h1>
        {(locationParam || type || priceRange || searchQuery) && (
          <div className="mb-4 flex gap-2 flex-wrap">
            {searchQuery && <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Search: {searchQuery}</span>}
            {locationParam && <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Location: {locationParam}</span>}
            {type && <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Type: {type}</span>}
            {priceRange && <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">Budget: {priceRange === '500+' ? 'Above 5 Cr' : priceRange.split('-').join('L - ') + (priceRange.includes('-') ? 'L' : '')}</span>}
          </div>
        )}
        <p className="text-gray-600 mb-8">{filteredProperties.length} properties found</p>
        
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <div
                key={property._id || property.id}
                ref={getPropertyRef(property._id || property.id)}
              >
                <PropertyCard 
                  property={property}
                  section="category"
                  fromCategory={category}
                />
              </div>
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
