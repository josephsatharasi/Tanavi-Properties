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
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
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
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition font-medium"
            >
              List Your Property
            </button>
            <a href="/category/all" className="text-gray-700 hover:text-primary font-medium">Properties</a>
            <a href="/blogs" className="text-gray-700 hover:text-primary font-medium">Gallery</a>
            <a href="/buy-sell" className="text-gray-700 hover:text-primary font-medium">Buy & Sell</a>
            <a href="/about" className="text-gray-700 hover:text-primary font-medium">About</a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <a href="/" onClick={handleLinkClick} className="block px-4 py-3 text-gray-700 hover:bg-primary hover:text-white rounded-lg transition font-medium">Home</a>
            <button 
              onClick={() => { setIsModalOpen(true); setIsOpen(false); }}
              className="w-full text-left px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition"
            >
              List Your Property
            </button>
            <a href="/category/all" onClick={handleLinkClick} className="block px-4 py-3 text-gray-700 hover:bg-primary hover:text-white rounded-lg transition font-medium">Properties</a>
            <a href="/blogs" onClick={handleLinkClick} className="block px-4 py-3 text-gray-700 hover:bg-primary hover:text-white rounded-lg transition font-medium">Gallery</a>
            <a href="/buy-sell" onClick={handleLinkClick} className="block px-4 py-3 text-gray-700 hover:bg-primary hover:text-white rounded-lg transition font-medium">Buy & Sell</a>
            <a href="/about" onClick={handleLinkClick} className="block px-4 py-3 text-gray-700 hover:bg-primary hover:text-white rounded-lg transition font-medium">About</a>
          </div>
        </div>
      )}
    </nav>
    <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
