import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const WhyChoose = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('why-choose');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const features = [
    'Verified Properties',
    'Transparent Deals',
    'Direct Owner Listings',
    'Expert Consultation'
  ];

  return (
    <section id="why-choose" className="py-6 md:py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 md:mb-8 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>Why Choose Tanavi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className={`flex items-center justify-center space-x-3 bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 150}ms` }}>
              <FaCheckCircle className="text-primary text-2xl flex-shrink-0 animate-pulse" />
              <span className="text-lg text-gray-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
