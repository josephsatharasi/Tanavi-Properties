import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Villa Owner",
      text: "Tanavi Properties helped me find my dream villa in Jubilee Hills. Professional service and great support!",
      rating: 5
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Apartment Buyer",
      text: "Excellent experience! They understood my requirements and found the perfect apartment in Gachibowli.",
      rating: 5
    },
    {
      id: 3,
      name: "Anil Reddy",
      role: "Investor",
      text: "Trustworthy and reliable. Tanavi Properties made my property investment journey smooth and hassle-free.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
