import React from 'react';
import './Visual.css';

const Visual = () => {
  return (
    <div className="visual">
      <div className="visual-content">
        {/* <h1>Visual</h1> */}
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/9k_ZV4AFm_E"
            title="Zanjo Bloom Music Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="youtube-video"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Visual; 