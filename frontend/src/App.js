import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import PropertyDetails from './pages/PropertyDetails';
import CategoryProperties from './pages/CategoryProperties';
import Blogs from './pages/Blogs';
import GalleryDetail from './pages/GalleryDetail';
import Leadership from './pages/Leadership';
import Contact from './pages/Contact';
import Careers from './pages/Careers';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/category/:category" element={<CategoryProperties />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/gallery/:id" element={<GalleryDetail />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
