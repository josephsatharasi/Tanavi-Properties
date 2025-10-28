import React, { useState, useEffect } from 'react';
import HighlightCard from './HighlightCard';
import API_URL from '../utils/api';

const TanaviHighlights = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/properties`)
      .then(res => res.json())
      .then(data => setProperties(data.filter(p => p.section === 'highlights' && p.status === 'available')))
      .catch(err => console.error('Error fetching properties:', err));
  }, []);

  return (
    <section className="py-6 md:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Tanavi Highlights</h2>
        {properties.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No highlighted properties available at the moment.</p>
        ) : (
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {properties.slice(0, 4).map((property) => (
              <div key={property._id} className="flex-shrink-0 w-[85%] snap-start md:w-auto">
                <HighlightCard property={property} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TanaviHighlights;
