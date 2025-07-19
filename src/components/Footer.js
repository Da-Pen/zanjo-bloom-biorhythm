import React from 'react';
import instagramIcon from '../assets/instagram-brands-solid.svg';
import facebookIcon from '../assets/facebook-brands-solid.svg';
import tiktokIcon from '../assets/tiktok-brands-solid.svg';
import youtubeIcon from '../assets/youtube-brands-solid.svg';
import './Footer.css';

const Footer = () => {
  const socialLinks = [
    { 
      name: 'instagram', 
      icon: instagramIcon,
      url: 'https://www.instagram.com/zanjobloom'
    },
    { 
      name: 'facebook', 
      icon: facebookIcon,
      url: 'https://www.facebook.com/profile.php?id=61568764451955'
    },
    { 
      name: 'tiktok', 
      icon: tiktokIcon,
      url: 'https://www.tiktok.com/@zanjobloom'
    },
    { 
      name: 'youtube', 
      icon: youtubeIcon,
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