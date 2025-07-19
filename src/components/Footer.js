import React from 'react';
import './Footer.css';

const Footer = () => {
  const socialLinks = [
    { 
      name: 'instagram', 
      icon: `${process.env.PUBLIC_URL}/instagram-brands-solid.svg`,
      url: 'https://www.instagram.com/zanjobloom'
    },
    { 
      name: 'facebook', 
      icon: `${process.env.PUBLIC_URL}/facebook-brands-solid.svg`,
      url: 'https://www.facebook.com/profile.php?id=61568764451955'
    },
    { 
      name: 'tiktok', 
      icon: `${process.env.PUBLIC_URL}/tiktok-brands-solid.svg`,
      url: 'https://www.tiktok.com/@zanjobloom'
    },
    { 
      name: 'youtube', 
      icon: `${process.env.PUBLIC_URL}/youtube-brands-solid.svg`,
      url: 'https://www.youtube.com/@zanjobloom'
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