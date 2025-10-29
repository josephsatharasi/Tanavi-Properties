import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Tanavi Properties</h3>
            <p className="text-gray-400">Your trusted partner in finding the perfect property in Hyderabad.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">Hyderabad, Telangana</p>
            <p className="text-gray-400">Phone: +91 XXXXX XXXXX</p>
            <p className="text-gray-400">Email: info@tanaviproperties.com</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Location</h4>
            <div className="border-2 border-gray-600 rounded-lg p-2 bg-gray-700/30">
              <a 
                href="https://www.google.com/maps/place/Hyderabad,+Telangana/@17.4065119,78.4772145,11z" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3160419252!2d78.24323159999999!3d17.412608699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="150"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="hover:opacity-80 transition cursor-pointer"
                ></iframe>
              </a>
            </div>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-lg border-t border-gray-300 mt-8 pt-3 pb-3 text-center text-gray-800 text-sm">
          <p>All Copyrights Reserved Tanavi Properties @2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
