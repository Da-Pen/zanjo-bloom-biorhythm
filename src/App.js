import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Visual from './pages/Visual';
import Reading from './pages/Reading';
import Music from './pages/Music';
import backgroundVideo from './assets/background.mov';
import './App.css';

function AppContent() {
  const location = useLocation();
  
  // Pages that should have footer fixed at bottom of viewport
  const fixedFooterPages = ['/', '/visual', '/music', '/about', '/reading'];
  const isFixedFooterPage = fixedFooterPages.includes(location.pathname);
  
  // Pages that don't scroll (just for main content sizing)
  const nonScrollingPages = ['/', '/visual', '/music'];
  const isNonScrollingPage = nonScrollingPages.includes(location.pathname);

  return (
    <div className="App">
      {/* Background Video */}
      <video 
        className="background-video"
        src={backgroundVideo}
        autoPlay 
        loop 
        muted
        playsInline
      ></video>
      
      {/* Overlay for better text readability */}
      <div className="video-overlay"></div>

      {/* Persistent Header */}
      <Header />

      {/* Main Content */}
      <main className={`main-content ${isNonScrollingPage ? 'non-scrolling' : 'scrolling'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/music" element={<Music />} />
          <Route path="/visual" element={<Visual />} />
          <Route path="/reading" element={<Reading />} />
        </Routes>
      </main>

      {/* Persistent Footer (Mobile Only) - positioned based on page type */}
      <Footer isFixed={isFixedFooterPage} />
    </div>
  );
}

function App() {
  return (
    <Router basename="/zanjo-bloom-biorhythm">
      <AppContent />
    </Router>
  );
}

export default App;
