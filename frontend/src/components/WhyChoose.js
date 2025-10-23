import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const WhyChoose = () => {
  const features = [
    'Verified Properties',
    'Transparent Deals',
    'Direct Owner Listings',
    'Expert Consultation'
  ];

  return (
    <section className="py-6 md:py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 text-center">Why Choose Tanavi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center justify-center space-x-3 bg-white p-6 rounded-lg shadow-md">
              <FaCheckCircle className="text-primary text-2xl flex-shrink-0" />
              <span className="text-lg text-gray-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
