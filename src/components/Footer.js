import React from 'react';
import instagramIcon from '../assets/instagram.svg';
import facebookIcon from '../assets/facebook.svg';
import tiktokIcon from '../assets/tiktok.svg';
import youtubeIcon from '../assets/youtube.svg';
import emailIcon from '../assets/email.svg';
import './Footer.css';

const Footer = ({ isFixed = false }) => {
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
    },
    { 
      name: 'email', 
      icon: emailIcon,
      url: 'mailto:leonnatgaib@gmail.com'
    }
  ];

  return (
    <footer className={`footer ${isFixed ? 'footer-fixed' : 'footer-content-bottom'}`}>
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
        
        <div className="copyright">
          © 2025 LVNDR Records. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 