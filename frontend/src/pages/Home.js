import React from 'react';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import PropertyCategories from '../components/PropertyCategories';
import WhyChoose from '../components/WhyChoose';
import RegisterCTA from '../components/RegisterCTA';
import { properties } from '../data/properties';

const Home = () => {
  return (
    <div>
      <Hero />
      
      <section id="properties" className="pt-16 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Featured Properties</h2>
          <div className="md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 flex md:flex-none overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
            {properties.slice(0, 4).map((property) => (
              <div key={property.id} className="flex-shrink-0 w-[45%] md:w-auto snap-start">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <PropertyCategories />
      <WhyChoose />
      <RegisterCTA />
    </div>
  );
};

export default Home;
