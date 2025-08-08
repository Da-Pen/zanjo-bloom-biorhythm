import React from 'react';
import EmailSignup from '../components/EmailSignup';
import albumCover from '../assets/biorhythm-album-cover.jpg';
import './Home.css';

const Home = () => {
  const handleListenNow = () => {
    window.open('https://www.notnoise.co/link/zanjo-bloom-biorhythm', '_blank');
  };

  const handlePurchase = () => {
    window.open('https://elasticstage.com/zanjobloom/releases/biorhythm-album', '_blank');
  };

  const handleAlbumClick = () => {
    window.open('https://www.notnoise.co/link/zanjo-bloom-biorhythm', '_blank');
  };

  return (
    <div className="home">
      <div className="home-content">
        <div 
          className="album-cover"
          style={{ backgroundImage: `url(${albumCover})` }}
          onClick={handleAlbumClick}
        />
        <div className="button-group">
          <button 
            className="listen-now-btn"
            onClick={handleListenNow}
          >
            Listen
          </button>
          <button 
            className="listen-now-btn"
            onClick={handlePurchase}
          >
            Purchase
          </button>
        </div>
        
        <EmailSignup />
      </div>
    </div>
  );
};

export default Home; 