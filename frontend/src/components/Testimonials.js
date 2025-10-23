import React, { useEffect, useRef, useState } from 'react';

const Testimonials = () => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    },
    {
      id: 4,
      name: "Sneha Patel",
      role: "Farmhouse Buyer",
      text: "Found the perfect farmhouse for my family. The team was patient and helped us through every step.",
      rating: 5
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Land Investor",
      text: "Best real estate consultants in Hyderabad. Their market knowledge and transparency are commendable.",
      rating: 5
    },
    {
      id: 6,
      name: "Lakshmi Devi",
      role: "Independent House Owner",
      text: "Sold my property quickly at a great price. Tanavi Properties handled everything professionally.",
      rating: 5
    }
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const cardWidth = 344;

    const autoScroll = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % testimonials.length;
        scrollContainer.scrollTo({
          left: next * cardWidth,
          behavior: 'smooth'
        });
        return next;
      });
    }, 3000);

    return () => clearInterval(autoScroll);
  }, [testimonials.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    scrollRef.current?.scrollTo({
      left: index * 344,
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-6 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-12">What Our Customers Say</h2>
        <div ref={scrollRef} className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-gray-50 p-6 rounded-lg shadow-md flex-shrink-0 w-80 snap-start"
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
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition ${
                currentIndex === index ? 'bg-primary w-6' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
