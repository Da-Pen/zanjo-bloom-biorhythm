import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/about', label: 'About' },
    { path: '/visual', label: 'Visual' },
    { path: '/reading', label: 'Reading' }
  ];

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
          <img src="/zanjo_bloom_logo.png" alt="Zanjo Bloom" className="logo" />
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