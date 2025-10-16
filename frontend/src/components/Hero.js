import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="pt-16 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Dream Property in Hyderabad
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Premium Villas, Apartments & Commercial Spaces
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
            Explore Properties
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
