import React, { useState } from 'react';
import BookInterestModal from './BookInterestModal';

const RegisterCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Interested in a Property?</h2>
            <p className="text-xl text-gray-600">Book Your Interest Today!</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-6 md:mt-0 bg-primary text-white px-8 py-3 rounded hover:opacity-90 transition font-medium text-lg"
          >
            Book Your Interest
          </button>
        </div>
      </div>
    </section>
    <BookInterestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default RegisterCTA;
