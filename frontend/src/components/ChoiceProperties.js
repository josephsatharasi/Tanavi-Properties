import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLeaf, FaHome, FaMapMarkedAlt, FaBuilding, FaWarehouse, FaStore } from 'react-icons/fa';

const ChoiceProperties = () => {
  const navigate = useNavigate();
  const properties = [
    { icon: FaLeaf, title: 'Agricultural Land', description: 'Fertile lands for farming and cultivation', color: 'from-green-500 to-green-600' },
    { icon: FaHome, title: 'Independent House', description: 'Spacious homes with privacy and comfort', color: 'from-blue-500 to-blue-600' },
    { icon: FaMapMarkedAlt, title: 'Open Plot', description: 'Ready-to-build plots in prime locations', color: 'from-orange-500 to-orange-600' },
    { icon: FaBuilding, title: 'Apartment', description: 'Modern flats with world-class amenities', color: 'from-purple-500 to-purple-600' },
    { icon: FaWarehouse, title: 'Farmhouse', description: 'Luxury farmhouses for weekend getaways', color: 'from-teal-500 to-teal-600' },
    { icon: FaStore, title: 'Commercial Space', description: 'Prime locations for your business', color: 'from-red-500 to-red-600' }
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choice Properties</h2>
          <p className="text-gray-600 text-lg">Explore our diverse range of premium properties</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => {
            const IconComponent = property.icon;
            return (
              <div 
                key={index}
                onClick={() => navigate(`/choice-category/${property.title}`)}
                className="group relative bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = property.color.includes('green') ? '#22c55e' : property.color.includes('blue') ? '#3b82f6' : property.color.includes('orange') ? '#f97316' : property.color.includes('purple') ? '#a855f7' : property.color.includes('teal') ? '#14b8a6' : '#ef4444'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${property.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="p-8 relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${property.color} rounded-full flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <IconComponent className="text-3xl text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {property.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {property.description}
                  </p>
                  
                  <div className={`mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r ${property.color} transition-all duration-500 rounded-full`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChoiceProperties;
