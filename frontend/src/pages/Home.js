import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Expertise from '../components/Expertise';
import PropertyCard from '../components/PropertyCard';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import { properties } from '../data/properties';

const Home = () => {
  return (
    <div>
      <Hero />
      <Stats />
      <Expertise />
      
      <section id="properties" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800" 
                alt="Tanavi Properties" 
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">
                WHO WE ARE
                <div className="w-24 h-1 bg-red-600 mt-2"></div>
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
                <p>
                  Founded in 2009 by visionary entrepreneurs with a passion for excellence, Tanavi Properties was born out of a commitment to create spaces that elevate urban living. With a deep dedication to design excellence and engineering precision, we have grown into a name synonymous with quality and trust in Hyderabad's real estate landscape.
                </p>
                <p>
                  As one of the <strong>best builders in Hyderabad</strong> for gated community projects, our developments stand as testimony to thoughtful planning, contemporary aesthetics, and uncompromising quality.
                </p>
                <p>
                  Over the years, Tanavi Properties has shaped some of the city's most iconic neighborhoods and continues to set benchmarks in luxury residential and commercial development. With a strong presence in Gachibowli, Jubilee Hills, and beyond, we are proud to be recognized as a leading <strong>construction company in Hyderabad</strong>, delivering homes that inspire and endure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      <section id="contact" className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
          <form className="space-y-6">
            <input type="text" placeholder="Name" className="w-full px-4 py-3 border rounded-lg" />
            <input type="email" placeholder="Email" className="w-full px-4 py-3 border rounded-lg" />
            <input type="tel" placeholder="Phone" className="w-full px-4 py-3 border rounded-lg" />
            <textarea placeholder="Message" rows="4" className="w-full px-4 py-3 border rounded-lg"></textarea>
            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-700 transition">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
