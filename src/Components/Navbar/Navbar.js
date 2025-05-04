/*import React from 'react';
import './Navbar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import refLogo from '../../assets/ref-Logo.jpeg';

const Navbar = ({ onLoginClick, onHomeClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={refLogo} alt="" className="nav-logo" />
        <span className="logo-name">LOGO</span>
      </div>
      {/* Menu Icon for Mobile *//*}/*
      <div className="menu-icon" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Navigation Links *//*}
      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li>
            <Link to="/" onClick={onHomeClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/services">
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      {/* Nav-Buttons *//*}
      <div className="nav-btns">
        <button className="login-btn" onClick={onLoginClick}>
          Login
        </button>
        <div className="dropdown">
          <button className="signup-btn">Sign up</button>
          <div className="dropdown-content">
            <Link to="/teacher-signup">Teacher</Link>
            <Link to="/student-signup">Student</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;*/

import React, { useState } from 'react';
import './Navbar.css';
import refLogo from '../../assets/ref-Logo.jpeg';

const Navbar = ({ onLoginClick, onHomeClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll to section
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 60, // Adjust for navbar height
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
    if (sectionId === 'home') {
      onHomeClick(); // Trigger home click if needed
    }
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={refLogo} alt="Logo" className="nav-logo" />
        <span className="logo-name">LOGO</span>
      </div>
      {/* Menu Icon for Mobile */}
      <div className="menu-icon" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li>
            <a href="#home" onClick={() => handleScroll('home')}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={() => handleScroll('about')}>
              About Us
            </a>
          </li>
          <li>
            <a href="#services" onClick={() => handleScroll('services')}>
              Services
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => handleScroll('contact')}>
              Contact Us
            </a>
          </li>
        </ul>
      </div>
      {/* Nav-Buttons */}
      <div className="nav-btns">
        <button className="login-btn" onClick={onLoginClick}>
          Login
        </button>
        <div className="dropdown">
          <button className="signup-btn">Sign up</button>
          <div className="dropdown-content">
            <a href="/teacher-signup">Teacher</a>
            <a href="/student-signup">Student</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;