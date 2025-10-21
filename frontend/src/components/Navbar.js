import React, { useState, useEffect } from 'react';
import { FaHome } from 'react-icons/fa';
import RegistrationModal from './RegistrationModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('nav')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-2">
            <FaHome className="text-3xl text-primary" />
            <span className="text-xl font-bold"><span className="text-gray-900">TANAVI</span> <span className="text-gray-600">Properties</span></span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-primary font-medium">Home</a>
            <a href="/about" className="text-gray-700 hover:text-primary font-medium">About</a>
            <a href="/category/all" className="text-gray-700 hover:text-primary font-medium">Properties</a>
            <a href="/buy-sell" className="text-gray-700 hover:text-primary font-medium">Buy Sell</a>
            <a href="/blogs" className="text-gray-700 hover:text-primary font-medium">Gallery</a>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition font-medium"
            >
              List Your Property
            </button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="/" onClick={handleLinkClick} className="block px-3 py-2 text-gray-700 hover:bg-gray-100">Home</a>
            <a href="/about" onClick={handleLinkClick} className="block px-3 py-2 text-gray-700 hover:bg-gray-100">About</a>
            <a href="/category/all" onClick={handleLinkClick} className="block px-3 py-2 text-gray-700 hover:bg-gray-100">Properties</a>
            <a href="/buy-sell" onClick={handleLinkClick} className="block px-3 py-2 text-gray-700 hover:bg-gray-100">Buy Sell</a>
            <a href="/blogs" onClick={handleLinkClick} className="block px-3 py-2 text-gray-700 hover:bg-gray-100">Gallery</a>
          </div>
        </div>
      )}
    </nav>
    <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
