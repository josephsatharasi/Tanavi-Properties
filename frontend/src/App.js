import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import PropertyDetails from './pages/PropertyDetails';
import CategoryProperties from './pages/CategoryProperties';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import GalleryDetail from './pages/GalleryDetail';
import BuySell from './pages/BuySell';
import Leadership from './pages/Leadership';
import Careers from './pages/Careers';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/category/:category" element={<CategoryProperties />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/gallery/:id" element={<GalleryDetail />} />
          <Route path="/buy-sell" element={<BuySell />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/careers" element={<Careers />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
