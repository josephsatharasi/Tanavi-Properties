import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GalleryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  const galleryData = {
    1: {
      title: 'Agricultural Land',
      category: 'Land',
      description: 'Explore our vast collection of fertile agricultural lands perfect for farming and cultivation. These properties offer excellent soil quality, water access, and are located in prime agricultural zones.',
      images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
        'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800'
      ],
      features: ['Fertile Soil', 'Water Supply', 'Road Access', 'Electricity Available']
    },
    2: {
      title: 'Independent House',
      category: 'House',
      description: 'Beautiful independent houses designed for modern living. These properties feature spacious layouts, contemporary architecture, and are located in well-connected residential areas.',
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'
      ],
      features: ['Modern Design', 'Spacious Rooms', 'Parking Space', 'Garden Area']
    },
    3: {
      title: 'Open Plot',
      category: 'Plot',
      description: 'Premium open plots ready for construction. HMDA approved plots in gated communities with all modern amenities and excellent connectivity.',
      images: [
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
        'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800'
      ],
      features: ['HMDA Approved', 'Gated Community', 'Clear Title', 'Ready to Build']
    },
    4: {
      title: 'Luxury Apartment',
      category: 'Apartment',
      description: 'High-rise luxury apartments with world-class amenities. Experience premium living with stunning views, modern facilities, and excellent security.',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
      ],
      features: ['Swimming Pool', 'Gym', 'Clubhouse', '24/7 Security']
    },
    5: {
      title: 'Farmhouse',
      category: 'Farmhouse',
      description: 'Serene farmhouses perfect for weekend getaways. These properties combine rural charm with modern comforts, featuring orchards and open spaces.',
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
      ],
      features: ['Orchard', 'Open Space', 'Well Water', 'Peaceful Location']
    },
    6: {
      title: 'Office Space',
      category: 'Commercial',
      description: 'Modern commercial office spaces in prime IT corridors. Fully equipped with contemporary infrastructure and excellent connectivity.',
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
      ],
      features: ['Prime Location', 'Modern Infrastructure', 'Ample Parking', 'High-Speed Internet']
    },
    7: {
      title: 'Green Fields',
      category: 'Land',
      description: 'Lush green agricultural fields ideal for organic farming and sustainable agriculture. These lands offer natural irrigation and rich biodiversity.',
      images: [
        'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'
      ],
      features: ['Natural Irrigation', 'Organic Farming Ready', 'Eco-Friendly', 'Scenic Views']
    },
    8: {
      title: 'Modern Villa',
      category: 'House',
      description: 'Contemporary villas with cutting-edge design and luxury amenities. Perfect for families seeking upscale living in premium neighborhoods.',
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'
      ],
      features: ['Premium Finishes', 'Smart Home', 'Private Pool', 'Landscaped Garden']
    },
    9: {
      title: 'City Apartment',
      category: 'Apartment',
      description: 'Urban apartments in the heart of the city. Enjoy convenient access to shopping, dining, and entertainment with modern living spaces.',
      images: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'
      ],
      features: ['Central Location', 'Modern Amenities', 'Public Transport', 'Shopping Nearby']
    }
  };

  const item = galleryData[id];

  useEffect(() => {
    if (!item) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % item.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [item]);

  if (!item) {
    return <div className="pt-20 text-center">Gallery item not found</div>;
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button 
          onClick={() => navigate('/blogs')} 
          className="mb-6 text-primary hover:underline flex items-center gap-2"
        >
          ← Back to Gallery
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96 overflow-hidden">
            {item.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${item.title} ${index + 1}`}
                className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentImage ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {item.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentImage ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-8">
            <span className="text-sm text-primary font-semibold">{item.category}</span>
            <h1 className="text-4xl font-bold mt-2 mb-6">{item.title}</h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">{item.description}</p>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => navigate('/category/all')}
              className="w-full bg-primary text-white py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition"
            >
              View Available Properties
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryDetail;
