import React from 'react';
import './Footer.css';

const Footer = () => {
  const socialLinks = [
    { 
      name: 'instagram', 
      icon: '/instagram-brands-solid.svg',
      url: 'https://google.com'
    },
    { 
      name: 'facebook', 
      icon: '/facebook-brands-solid.svg',
      url: 'https://google.com'
    },
    { 
      name: 'tiktok', 
      icon: '/tiktok-brands-solid.svg',
      url: 'https://google.com'
    },
    { 
      name: 'youtube', 
      icon: '/youtube-brands-solid.svg',
      url: 'https://google.com'
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Mobile Social Links */}
        <div className="mobile-social-links">
          {socialLinks.map((social) => (
            <a 
              key={social.name}
              href={social.url}
              target="_blank" 
              rel="noopener noreferrer"
              className={`social-link ${social.name}`}
            >
              <img src={social.icon} alt={social.name} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 