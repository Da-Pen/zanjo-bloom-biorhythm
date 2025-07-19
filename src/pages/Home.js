import React from 'react';
import EmailSignup from '../components/EmailSignup';
import './Home.css';

const Home = () => {
  const handleListenNow = () => {
    window.open('https://open.spotify.com/artist/76LFL6UF6O9oFE9CC8rbEB', '_blank');
  };

  const handleAlbumClick = () => {
    window.open('https://open.spotify.com/artist/76LFL6UF6O9oFE9CC8rbEB', '_blank');
  };

  return (
    <div className="home">
      <div className="home-content">
        <div 
          className="album-cover"
          onClick={handleAlbumClick}
        />
        <button 
          className="listen-now-btn"
          onClick={handleListenNow}
        >
          Listen Now
        </button>
        
        <EmailSignup />
      </div>
    </div>
  );
};

export default Home; 