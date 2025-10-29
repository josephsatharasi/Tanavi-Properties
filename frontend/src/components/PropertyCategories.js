import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiPlantSeed, GiHouse, GiBarn, GiBriefcase } from 'react-icons/gi';
import { FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';

const PropertyCategories = () => {
  const navigate = useNavigate();
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

    const section = document.getElementById('categories');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);
  
  const categories = [
    { icon: <GiPlantSeed className="text-6xl text-primary" />, name: 'Agriculture Land', slug: 'agricultural-lands' },
    { icon: <GiHouse className="text-6xl text-primary" />, name: 'Independent house', slug: 'independent-house' },
    { icon: <FaMapMarkerAlt className="text-6xl text-primary" />, name: 'Open plots', slug: 'open-plots' },
    { icon: <GiBarn className="text-6xl text-primary" />, name: 'Farmhouses', slug: 'farmhouses' },
    { icon: <FaBuilding className="text-6xl text-primary" />, name: 'Apartment', slug: 'apartment' },
    { icon: <GiBriefcase className="text-6xl text-primary" />, name: 'Office space', slug: 'office-space' },
  ];

  const handleCategoryClick = (slug) => {
    navigate(`/category/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="categories" className="py-6 md:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 md:mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>Property Categories</h2>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index} 
              onClick={() => handleCategoryClick(category.slug)}
              className={`flex flex-col items-center justify-center p-6 border-2 border-gray-300 rounded-lg hover:shadow-xl hover:border-primary hover:scale-110 transition-all duration-500 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="hover:rotate-12 transition-transform duration-300">
                {category.icon}
              </div>
              <p className="mt-4 text-center font-medium text-gray-700">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyCategories;
