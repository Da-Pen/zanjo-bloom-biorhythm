import React from 'react';
import aboutPic from '../assets/5pj/about-pic.jpeg';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="about-content">
        {/* <h1>About</h1> */}
        <img src={aboutPic} alt="Zanjo Bloom" className="about-image" />
        <div className="about-text">
          <p>
          Surrounded by a plethora of musical influences, Zanjo Bloom seeks to seamlessly blend them all into a distinct palette.
          </p>
          <p>
          Drawing reference from soul, island rock, folk, and electronic genres, experimentation is just a means to an end toward pure, unadulterated expression.
          </p>
          <p>
          With radio placements on CIUT 89.5 FM as well as a growing online presence, the message gets louder, and the vision becomes clearer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 