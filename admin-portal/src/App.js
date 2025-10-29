import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import BuySell from './pages/BuySell';

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
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/buy-sell" element={<BuySell />} />
          <Route path="*" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
