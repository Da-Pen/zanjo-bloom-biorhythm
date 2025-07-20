import React from 'react';
import './Music.css';
import glueReworkCover from '../assets/glue_rework_cover.jpg';
import glueCover from '../assets/glue_cover.jpg';

const Music = () => {
  const albums = [
    {
      id: 1,
      cover: glueReworkCover,
      title: 'GLUE - 20XX Rework',
      url: 'https://www.notnoise.co/link/zanjo-bloom-glue---20xx-rework'
    },
    {
      id: 2,
      cover: glueCover,
      title: 'GLUE',
      url: 'https://www.notnoise.co/link/zanjo-bloom-glue'
    }
  ];

  return (
    <div className="music">
      <div className="music-content">
        <h1>Music</h1>
        <div className="albums-grid">
          {albums.map(album => (
            <div key={album.id} className="album-card">
              <img 
                src={album.cover} 
                alt={album.title} 
                className="album-cover" 
                onClick={() => window.open(album.url, '_blank')}
              />
              <h3 className="album-title">{album.title}</h3>
              <button 
                className="listen-now-btn"
                onClick={() => window.open(album.url, '_blank')}
              >
                Listen Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Music; 