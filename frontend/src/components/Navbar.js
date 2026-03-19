import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import RegistrationModal from './RegistrationModal';
import API_URL from '../utils/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [hasVisibleGallery, setHasVisibleGallery] = useState(false);
  const [propertiesDropdownOpen, setPropertiesDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleChoicePropertiesClick = (e) => {
    e.preventDefault();
    setPropertiesDropdownOpen(false);
    
    if (location.pathname === '/') {
      // Already on home page, just scroll
      const element = document.getElementById('choice-properties');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to home page first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('choice-properties');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  useEffect(() => {
    // Check if gallery section is enabled
    fetch(`${API_URL}/api/settings/gallery.enabled`)
      .then(res => {
        if (!res.ok) {
          // If settings API not available, default to true
          setHasVisibleGallery(true);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) setHasVisibleGallery(data.value !== false);
      })
      .catch(() => setHasVisibleGallery(true));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('nav')) {
        setIsOpen(false);
      }
      // Close properties dropdown when clicking anywhere
      if (propertiesDropdownOpen && !e.target.closest('.properties-dropdown-container')) {
        setPropertiesDropdownOpen(false);
      }
    };
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
      if (propertiesDropdownOpen) {
        setPropertiesDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, propertiesDropdownOpen]);

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
            
            {/* Properties Dropdown */}
            <div className="relative properties-dropdown-container">
              <button
                onClick={() => setPropertiesDropdownOpen(!propertiesDropdownOpen)}
                className={`px-4 py-2 font-medium transition flex items-center gap-1 ${
                  isActive('/category/all') || location.pathname.startsWith('/category/') || location.pathname.startsWith('/choice-category/')
                    ? 'bg-primary text-white rounded' 
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                Properties
                <svg 
                  className={`w-4 h-4 transition-transform ${propertiesDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {propertiesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                  <a 
                    href="/category/all" 
                    onClick={() => setPropertiesDropdownOpen(false)}
                    className="block px-4 py-2.5 text-gray-700 hover:bg-primary hover:text-white transition font-medium"
                  >
                    All Properties
                  </a>
                  <a 
                    href="/#choice-properties" 
                    onClick={handleChoicePropertiesClick}
                    className="block px-4 py-2.5 text-gray-700 hover:bg-primary hover:text-white transition font-medium"
                  >
                    Choice Properties
                  </a>
                </div>
              )}
            </div>
            
            {hasVisibleGallery && (
              <a href="/blogs" className={`px-4 py-2 font-medium transition ${isActive('/blogs') ? 'bg-primary text-white rounded' : 'text-gray-700 hover:text-primary'}`}>Gallery</a>
            )}
            <a href="/buy-sell" className={`px-4 py-2 font-medium transition ${isActive('/buy-sell') ? 'bg-primary text-white rounded' : 'text-gray-700 hover:text-primary'}`}>Buy & Sell</a>
            <a href="/guide" className={`px-4 py-2 font-medium transition ${isActive('/guide') ? 'bg-primary text-white rounded' : 'text-gray-700 hover:text-primary'}`}>Guide</a>
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
            {hasVisibleGallery && (
              <a href="/blogs" onClick={handleLinkClick} className={`block px-4 py-3 rounded-lg transition font-medium ${isActive('/blogs') ? 'bg-primary text-white' : 'text-gray-700 bg-white/30 hover:bg-primary/80 hover:text-white'}`}>Gallery</a>
            )}
            <a href="/buy-sell" onClick={handleLinkClick} className={`block px-4 py-3 rounded-lg transition font-medium ${isActive('/buy-sell') ? 'bg-primary text-white' : 'text-gray-700 bg-white/30 hover:bg-primary/80 hover:text-white'}`}>Buy & Sell</a>
            <a href="/guide" onClick={handleLinkClick} className={`block px-4 py-3 rounded-lg transition font-medium ${isActive('/guide') ? 'bg-primary text-white' : 'text-gray-700 bg-white/30 hover:bg-primary/80 hover:text-white'}`}>Guide</a>
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
