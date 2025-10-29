import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import PropertyCategories from '../components/PropertyCategories';
import TanaviHighlights from '../components/TanaviHighlights';
import WhyChoose from '../components/WhyChoose';
import Testimonials from '../components/Testimonials';
import RegisterCTA from '../components/RegisterCTA';
import LoadingSpinner from '../components/LoadingSpinner';
import API_URL, { fetchWithTimeout } from '../utils/api';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = () => {
      fetchWithTimeout(`${API_URL}/api/properties?t=${Date.now()}`, { cache: 'no-store' }, 30000)
        .then(res => res.json())
        .then(data => {
          setProperties(data.filter(p => p.section === 'featured' && p.status === 'available'));
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

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <Hero />
      
      <section id="properties" className="py-6 md:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Featured Properties</h2>
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {properties.slice(0, 4).map((property) => (
              <div key={property._id} className="flex-shrink-0 w-[calc(50%-8px)] snap-start md:w-auto">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <PropertyCategories />
      <TanaviHighlights />
      
      <section className="py-6 md:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200" 
              alt="Tanavi Properties Banner" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Building Your Dreams</h2>
                <p className="text-lg md:text-xl">Experience luxury living with Tanavi Properties</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyChoose />
      <Testimonials />
      <RegisterCTA />
    </div>
  );
};

export default Home;
