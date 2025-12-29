import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaShieldAlt, FaHandshake, FaUserTie, FaAward } from 'react-icons/fa';

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
    { icon: FaShieldAlt, title: 'Verified Properties', color: 'from-blue-500 to-blue-600' },
    { icon: FaHandshake, title: 'Transparent Deals', color: 'from-green-500 to-green-600' },
    { icon: FaUserTie, title: 'Direct Owner Listings', color: 'from-purple-500 to-purple-600' },
    { icon: FaAward, title: 'Expert Consultation', color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <section id="why-choose" className="py-12 md:py-16 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Why Choose Tanavi Properties</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Your trusted partner for transparent and verified property deals</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border-t-4 border-transparent hover:border-blue-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="text-white text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800 mb-2">{feature.title}</h3>
                <div className="flex justify-center">
                  <FaCheckCircle className="text-green-500 text-xl" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
