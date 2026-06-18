import React from 'react';
import './Music.css';
import glueReworkCover from '../assets/biorhythm/glue_rework_cover.jpg';
// import glueCover from '../assets/biorhythm/glue_cover.jpg';
import biorhythmCover from '../assets/biorhythm/biorhythm-album-cover.jpg'
import fivePetalJasmine from '../assets/5pj/album-cover.png'

const Music = () => {
  const albums = [
    {
      id: 1,
      cover: fivePetalJasmine,
      title: 'FIVE PETAL JASMINE',
      url: 'https://distrokid.com/hyperfollow/zanjobloom/five-petal-jasmine'
    },
    {
      id: 2,
      cover: biorhythmCover,
      title: 'BIORHYTHM',
      url: 'https://notnoise.co/link/zanjo-bloom-biorhythm'
    },
    {
      id: 3,
      cover: glueReworkCover,
      title: 'GLUE - 20XX Rework',
      url: 'https://www.notnoise.co/link/zanjo-bloom-glue---20xx-rework'
    },
    // {
    //   id: 3,
    //   cover: glueCover,
    //   title: 'GLUE',
    //   url: 'https://www.notnoise.co/link/zanjo-bloom-glue'
    // }
  ];

  return (
    <div className="music">
      <div className="music-content">
        {/* <h1>Music</h1> */}
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