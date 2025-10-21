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
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Choose Tanavi</h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <FaCheckCircle className="text-primary text-xl flex-shrink-0" />
                  <span className="text-lg text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">What Our Customers Say</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                Tanavi Properties helped me find the perfect farmhwaee. Their service was tricellent and the property was as described.
              </p>
              <p className="font-semibold text-gray-900">Neha Sharma</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
