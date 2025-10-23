import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import PropertyCategories from '../components/PropertyCategories';
import TanaviHighlights from '../components/TanaviHighlights';
import WhyChoose from '../components/WhyChoose';
import Testimonials from '../components/Testimonials';
import RegisterCTA from '../components/RegisterCTA';

const Home = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch('https://tanavi-properties-backend.onrender.com/api/properties')
      .then(res => res.json())
      .then(data => setProperties(data.filter(p => p.section === 'featured' && p.status === 'available')))
      .catch(err => console.error('Error fetching properties:', err));
  }, []);

  return (
    <div>
      <Hero />
      
      <section id="properties" className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Properties</h2>
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
      <WhyChoose />
      <Testimonials />
      <RegisterCTA />
    </div>
  );
};

export default Home;
