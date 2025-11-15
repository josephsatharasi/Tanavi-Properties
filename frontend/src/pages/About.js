import React, { useEffect } from 'react';
import { FaBullseye, FaEye, FaStar } from 'react-icons/fa';

const About = () => {
  useEffect(() => {
    document.body.classList.add('allow-screenshot');
    return () => document.body.classList.remove('allow-screenshot');
  }, []);
  const values = [
    { icon: FaBullseye, title: "Our Mission", description: "To deliver exceptional real estate projects that exceed customer expectations and create lasting value." },
    { icon: FaEye, title: "Our Vision", description: "To be the most trusted and preferred real estate developer in Hyderabad, known for quality and innovation." },
    { icon: FaStar, title: "Our Values", description: "Integrity, Excellence, Customer Focus, Innovation, and Sustainability guide everything we do." }
  ];

  const milestones = [
    { year: "2009", event: "Company Founded", description: "Tanavi Properties established with a vision to transform Hyderabad's skyline" },
    { year: "2015", event: "10+ Projects Delivered", description: "Successfully delivered over 10 residential projects across Hyderabad" },
    { year: "2020", event: "50+ Projects Milestone", description: "Reached the milestone of 50 completed projects with 500+ happy families" },
    { year: "2024", event: "Industry Leader", description: "Recognized as one of the top builders in Hyderabad with multiple ongoing projects" }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="relative h-96 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4 animate-fade-in">About Tanavi Properties</h1>
          <p className="text-xl">Building Dreams, Creating Landmarks</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800" 
              alt="Tanavi Properties" 
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">
              WHO WE ARE
              <div className="w-24 h-1 bg-primary mt-2"></div>
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
              <p>
                Founded in 2015 by Mr. Balraj Sinthigari, a visionary entrepreneur driven by a passion for excellence, Tanavi Properties has evolved into a trusted real estate platform connecting people to their dream properties — seamlessly, transparently, and with integrity.
              </p>
              <p>
                We specialize in Agriculture Lands, Open Plots, Independent Houses, Farmhouses, Apartments, and Commercial Spaces, helping buyers and sellers make confident and informed real estate decisions across diverse locations.
              </p>
              <p>
                Beyond property listings, we deliver end-to-end real estate solutions — including farmhouse development, civil engineering, interior design, precast structures, and fencing services. Every project is managed by experienced professionals dedicated to quality, precision, and customer satisfaction.
              </p>
              <p>
                With the support of trusted legal and financial partners and a network of skilled technical experts, Tanavi Properties ensures that every transaction is secure, transparent, and rewarding. Our commitment to eco-friendly development further reflects our responsibility toward sustainable growth.
              </p>
              <p>
                Driven by trust, transparency, and innovation, Tanavi Properties advances with the strategic vision of Mr. Balraj Sinthigari, Founder & Managing Director, turning real-estate aspirations into long-term success. We enable customers and investors to unlock opportunities that shape their future with confidence.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <IconComponent className="text-6xl mb-4 text-primary mx-auto" />
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary hidden md:block"></div>
            <div className="space-y-8 md:space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:gap-8`}
                >
                  <div className={`w-full md:flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                      <h3 className="text-3xl font-bold text-primary mb-2">{milestone.year}</h3>
                      <h4 className="text-xl font-bold mb-2">{milestone.event}</h4>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg z-10 flex-shrink-0"></div>
                  <div className="hidden md:block md:flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-primary text-white rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Why Choose Tanavi Properties?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
            <div>
              <div className="text-5xl font-bold mb-2">15+</div>
              <div className="text-lg">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-lg">Projects Delivered</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-lg">Happy Families</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-lg">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
