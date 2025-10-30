import React, { useEffect, useRef, useState } from 'react';

const Testimonials = () => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "David Johnson",
      role: "Villa Owner",
      text: "Tanavi Properties helped me find my dream villa in Jubilee Hills. Professional service and great support!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      role: "Apartment Buyer",
      text: "Excellent experience! They understood my requirements and found the perfect apartment in Gachibowli.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      name: "Michael Anderson",
      role: "Investor",
      text: "Trustworthy and reliable. Tanavi Properties made my property investment journey smooth and hassle-free.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/46.jpg"
    },
    {
      id: 4,
      name: "Rebecca Thompson",
      role: "Farmhouse Buyer",
      text: "Found the perfect farmhouse for my family. The team was patient and helped us through every step.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      id: 5,
      name: "Joshua Williams",
      role: "Land Investor",
      text: "Best real estate consultants in Hyderabad. Their market knowledge and transparency are commendable.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/52.jpg"
    },
    {
      id: 6,
      name: "Elizabeth Davis",
      role: "Independent House Owner",
      text: "Sold my property quickly at a great price. Tanavi Properties handled everything professionally.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/65.jpg"
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">What Our Customers Say</h2>
        <div ref={scrollRef} className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide px-8 md:px-0">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white border border-gray-200 p-8 rounded-lg shadow-lg hover:shadow-2xl flex-shrink-0 w-80 snap-center flex flex-col items-center text-center transition-all duration-500 hover:scale-105 hover:border-primary"
            >
              <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full mb-4 object-cover border-2 border-black" />
              <p className="font-bold text-lg mb-2">{testimonial.name}</p>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
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
