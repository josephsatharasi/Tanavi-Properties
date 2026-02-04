import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import RegistrationModal from './RegistrationModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bounce, setBounce] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;



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
  };

  return (
    <>
    <nav className="bg-white/70 backdrop-blur-lg shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <a href="/" className="flex items-center space-x-2">
            <FaHome className="text-3xl text-primary" />
            <span className="text-xl font-bold"><span className="text-gray-900">TANAVI</span> <span className="text-gray-600">Properties</span></span>
          </a>
          
          <div className="hidden md:flex items-center space-x-7 relative">
            <a href="/" className={`px-4 py-2 font-medium transition ${isActive('/') ? 'bg-primary text-white rounded' : 'text-gray-700 hover:text-primary'}`}>Home</a>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-gray-700 hover:text-primary font-medium transition"
            >
              List Your Property
            </button>
            <a href="/category/all" className={`px-4 py-2 font-medium transition ${isActive('/category/all') || location.pathname.startsWith('/category/') ? 'bg-primary text-white rounded' : 'text-gray-700 hover:text-primary'}`}>Properties</a>
            <a href="/blogs" className={`px-4 py-2 font-medium transition ${isActive('/blogs') ? 'bg-primary text-white rounded' : 'text-gray-700 hover:text-primary'}`}>Gallery</a>
            <a href="/buy-sell" className={`px-4 py-2 font-medium transition ${isActive('/buy-sell') ? 'bg-primary text-white rounded' : 'text-gray-700 hover:text-primary'}`}>Buy & Sell</a>
            <a href="/about" className={`px-4 py-2 font-medium transition ${isActive('/about') ? 'bg-primary text-white rounded' : 'text-gray-700 hover:text-primary'}`}>About</a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex items-center justify-center w-10 h-10 self-center">
            <div className="relative w-6 h-6">
              <span className={`absolute left-0 w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'top-3 rotate-45' : 'top-1'}`}></span>
              <span className={`absolute left-0 top-3 w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute left-0 w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'top-3 -rotate-45' : 'top-5'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-green-50/60 backdrop-blur-lg shadow-lg rounded-b-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <a href="/" onClick={handleLinkClick} className={`block px-4 py-3 rounded-lg transition font-medium ${isActive('/') ? 'bg-primary text-white' : 'text-gray-700 bg-white/30 hover:bg-primary/80 hover:text-white'}`}>Home</a>
            <button 
              onClick={() => { setIsModalOpen(true); setIsOpen(false); }}
              className="w-full text-left px-4 py-3 text-gray-700 bg-white/30 hover:bg-primary/80 hover:text-white rounded-lg font-medium transition"
            >
              List Your Property
            </button>
            <a href="/category/all" onClick={handleLinkClick} className={`block px-4 py-3 rounded-lg transition font-medium ${isActive('/category/all') || location.pathname.startsWith('/category/') ? 'bg-primary text-white' : 'text-gray-700 bg-white/30 hover:bg-primary/80 hover:text-white'}`}>Properties</a>
            <a href="/blogs" onClick={handleLinkClick} className={`block px-4 py-3 rounded-lg transition font-medium ${isActive('/blogs') ? 'bg-primary text-white' : 'text-gray-700 bg-white/30 hover:bg-primary/80 hover:text-white'}`}>Gallery</a>
            <a href="/buy-sell" onClick={handleLinkClick} className={`block px-4 py-3 rounded-lg transition font-medium ${isActive('/buy-sell') ? 'bg-primary text-white' : 'text-gray-700 bg-white/30 hover:bg-primary/80 hover:text-white'}`}>Buy & Sell</a>
            <a href="/about" onClick={handleLinkClick} className={`block px-4 py-3 rounded-lg transition font-medium ${isActive('/about') ? 'bg-primary text-white' : 'text-gray-700 bg-white/30 hover:bg-primary/80 hover:text-white'}`}>About</a>
          </div>
        </div>
      )}
    </nav>
    <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} modalType="list" />
    </>
  );
};

export default Navbar;
