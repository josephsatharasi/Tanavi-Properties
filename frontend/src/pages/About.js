import React from 'react';

const About = () => {
  const values = [
    { icon: "🎯", title: "Our Mission", description: "To deliver exceptional real estate projects that exceed customer expectations and create lasting value." },
    { icon: "👁️", title: "Our Vision", description: "To be the most trusted and preferred real estate developer in Hyderabad, known for quality and innovation." },
    { icon: "⭐", title: "Our Values", description: "Integrity, Excellence, Customer Focus, Innovation, and Sustainability guide everything we do." }
  ];

  const milestones = [
    { year: "2009", event: "Company Founded", description: "Tanavi Properties established with a vision to transform Hyderabad's skyline" },
    { year: "2015", event: "10+ Projects Delivered", description: "Successfully delivered over 10 residential projects across Hyderabad" },
    { year: "2020", event: "50+ Projects Milestone", description: "Reached the milestone of 50 completed projects with 500+ happy families" },
    { year: "2024", event: "Industry Leader", description: "Recognized as one of the top builders in Hyderabad with multiple ongoing projects" }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="relative h-96 bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center">
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
              <div className="w-24 h-1 bg-red-600 mt-2"></div>
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
              <p>
                Founded in 2009 by visionary entrepreneurs with a passion for excellence, Tanavi Properties was born out of a commitment to create spaces that elevate urban living. With a deep dedication to design excellence and engineering precision, we have grown into a name synonymous with quality and trust in Hyderabad's real estate landscape.
              </p>
              <p>
                As one of the <strong>best builders in Hyderabad</strong> for gated community projects, our developments stand as testimony to thoughtful planning, contemporary aesthetics, and uncompromising quality.
              </p>
              <p>
                Over the years, Tanavi Properties has shaped some of the city's most iconic neighborhoods and continues to set benchmarks in luxury residential and commercial development. With a strong presence in Gachibowli, Jubilee Hills, and beyond, we are proud to be recognized as a leading <strong>construction company in Hyderabad</strong>, delivering homes that inspire and endure.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary hidden md:block"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                      <h3 className="text-3xl font-bold text-primary mb-2">{milestone.year}</h3>
                      <h4 className="text-xl font-bold mb-2">{milestone.event}</h4>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="flex-1"></div>
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
