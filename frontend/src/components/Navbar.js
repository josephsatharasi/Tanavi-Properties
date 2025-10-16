import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary">Tanavi Properties</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-primary">Home</a>
            <a href="/about" className="text-gray-700 hover:text-primary">About</a>
            <a href="/projects" className="text-gray-700 hover:text-primary">Projects</a>
            <a href="/blogs" className="text-gray-700 hover:text-primary">Blogs</a>
            <a href="/careers" className="text-gray-700 hover:text-primary">Careers</a>
            <a href="/#contact" className="text-gray-700 hover:text-primary">Contact</a>
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
            <a href="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">Home</a>
            <a href="/about" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">About</a>
            <a href="/projects" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">Projects</a>
            <a href="/blogs" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">Blogs</a>
            <a href="/careers" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">Careers</a>
            <a href="/#contact" className="block px-3 py-2 text-gray-700 hover:bg-gray-100">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
