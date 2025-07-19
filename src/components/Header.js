import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import zanjoBloomLogo from '../assets/zanjo_bloom_logo.png';
import instagramIcon from '../assets/instagram-brands-solid.svg';
import facebookIcon from '../assets/facebook-brands-solid.svg';
import tiktokIcon from '../assets/tiktok-brands-solid.svg';
import youtubeIcon from '../assets/youtube-brands-solid.svg';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/about', label: 'About' },
    { path: '/music', label: 'Music' },
    { path: '/visual', label: 'Visual' },
    { path: '/reading', label: 'Reading' }
  ];

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
    <header className="header">
      <div className="header-content">
        {/* Social Links - Desktop: Top Left, Mobile: Bottom */}
        <div className="social-links">
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

        {/* Logo - Center */}
        <Link to="/" className="logo-link">
          <img src={zanjoBloomLogo} alt="Zanjo Bloom" className="logo" />
        </Link>

        {/* Navigation - Desktop: Top Right, Mobile: Below Logo */}
        <nav className="navigation">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header; 