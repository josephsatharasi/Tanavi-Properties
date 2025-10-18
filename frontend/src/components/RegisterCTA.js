import React from 'react';

const RegisterCTA = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Want to Sell Your Property?</h2>
            <p className="text-xl text-gray-600">Register with Us Today!</p>
          </div>
          <button className="mt-6 md:mt-0 bg-primary text-white px-8 py-3 rounded hover:bg-opacity-90 transition font-medium text-lg">
            Register Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default RegisterCTA;
