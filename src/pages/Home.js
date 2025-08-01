import React from 'react';
import EmailSignup from '../components/EmailSignup';
import albumCover from '../assets/biorhythm-album-cover.jpg';
import './Home.css';

const Home = () => {
  const handlePreSave = () => {
    window.open('https://distrokid.com/hyperfollow/zanjobloom/biorhythm', '_blank');
  };

  const handlePreOrder = () => {
    window.open('https://elasticstage.com/zanjobloom/releases/biorhythm-album', '_blank');
  };

  const handleAlbumClick = () => {
    window.open('https://distrokid.com/hyperfollow/zanjobloom/biorhythm', '_blank');
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
            onClick={handlePreSave}
          >
            Pre-Save
          </button>
          <button 
            className="listen-now-btn"
            onClick={handlePreOrder}
          >
            Pre-Order
          </button>
        </div>
        
        <EmailSignup />
      </div>
    </div>
  );
};

export default Home; 