import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Visual from './pages/Visual';
import Reading from './pages/Reading';
import Music from './pages/Music';
import backgroundImage from './assets/background.jpg';
import './App.css';

function App() {
  return (
    <Router basename="/zanjo-bloom-biorhythm">
      <div className="App">
        {/* Background Image */}
        <div 
          className="background-image"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />

        {/* Overlay for better text readability */}
        <div className="image-overlay"></div>

        {/* Persistent Header */}
        <Header />

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/music" element={<Music />} />
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
