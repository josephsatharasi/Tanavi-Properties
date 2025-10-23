import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';

const TanaviHighlights = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch('https://tanavi-properties-backend.onrender.com/api/properties')
      .then(res => res.json())
      .then(data => setProperties(data.filter(p => p.section === 'highlights' && p.status === 'available')))
      .catch(err => console.error('Error fetching properties:', err));
  }, []);

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Tanavi Highlights</h2>
        {properties.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No highlighted properties available at the moment.</p>
        ) : (
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {properties.slice(0, 4).map((property) => (
              <div key={property._id} className="flex-shrink-0 w-[calc(50%-8px)] snap-start md:w-auto">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TanaviHighlights;
