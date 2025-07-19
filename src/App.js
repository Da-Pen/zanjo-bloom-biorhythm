import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Visual from './pages/Visual';
import Reading from './pages/Reading';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Background Video */}
        <video 
          className="background-video"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src={`${process.env.PUBLIC_URL}/background.mov`} type="video/mp4" />
        </video>

        {/* Overlay for better text readability */}
        <div className="video-overlay"></div>

        {/* Persistent Header */}
        <Header />

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/visual" element={<Visual />} />
            <Route path="/reading" element={<Reading />} />
          </Routes>
        </main>

        {/* Persistent Footer (Mobile Only) */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
