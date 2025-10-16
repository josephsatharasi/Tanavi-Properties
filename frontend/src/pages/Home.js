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
