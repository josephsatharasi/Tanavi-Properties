import React from 'react';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
  const navigate = useNavigate();
  
  const galleryImages = [
    { id: 1, title: 'Agricultural Land', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800', category: 'Land' },
    { id: 2, title: 'Independent House', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', category: 'House' },
    { id: 3, title: 'Open Plot', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800', category: 'Plot' },
    { id: 4, title: 'Luxury Apartment', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800', category: 'Apartment' },
    { id: 5, title: 'Farmhouse', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', category: 'Farmhouse' },
    { id: 6, title: 'Office Space', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', category: 'Commercial' },
    { id: 7, title: 'Green Fields', image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800', category: 'Land' },
    { id: 8, title: 'Modern Villa', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', category: 'House' },
    { id: 9, title: 'City Apartment', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', category: 'Apartment' },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-4">Property Gallery</h1>
        <p className="text-center text-gray-600 mb-12">Explore our diverse range of properties</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((item) => (
            <div 
              key={item.id}
              onClick={() => navigate(`/gallery/${item.id}`)}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <span className="text-sm text-primary font-semibold">{item.category}</span>
                <h3 className="text-xl font-bold mt-2">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
