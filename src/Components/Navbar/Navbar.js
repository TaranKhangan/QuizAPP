

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////NEW DRAMA................................//////////////////////////////////////////////////////


import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import refLogo from '../../assets/Logo-Sahash.jpeg';

const Navbar = ({ onLoginClick, onHomeClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const mobileNavRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleScroll = (sectionId) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          window.scrollTo({
            top: section.offsetTop - 64,
            behavior: 'smooth',
          });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 64,
          behavior: 'smooth',
        });
      }
    }
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleLogin = () => {
    if (onLoginClick) {
      onLoginClick();
      setIsMenuOpen(false);
    } else {
      console.warn('onLoginClick not provided');
      navigate('/login');
    }
  };

  const handleHome = () => {
    if (onHomeClick) {
      onHomeClick();
    }
    setIsMenuOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        mobileNavRef.current &&
        mobileToggleRef.current &&
        !mobileNavRef.current.contains(event.target) &&
        !mobileToggleRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest('.signup-btn')
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  useEffect(() => {
    const mobileNav = mobileNavRef.current;
    const mobileToggle = mobileToggleRef.current;
    if (mobileNav && mobileToggle) {
      mobileNav.setAttribute('aria-hidden', !isMenuOpen);
      mobileToggle.setAttribute('aria-expanded', isMenuOpen);
      const mobileLinks = Array.from(mobileNav.querySelectorAll('a, button'));
      mobileLinks.forEach(link => (link.tabIndex = isMenuOpen ? 0 : -1));
    }
  }, [isMenuOpen]);

  return (
    <nav className="sahash-navbar" role="banner">
      <div className="nav-bar container" role="navigation" aria-label="Main navigation">
        <div className="logo-container">
          <Link to="/" className="logo-link" onClick={handleHome}>
            <img src={refLogo} alt="Sahash Logo" className="nav-logo" />
            <div className="logo-text">
              <span className="sa-name">SAHASH</span>
              <span className="sa-desc"><i>WE CARE ALL</i></span>
            </div>
          </Link>
        </div>
        <div
          className="menu-icon"
          onClick={toggleMenu}
          ref={mobileToggleRef}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <div
          className={`nav-links ${isMenuOpen ? 'active' : ''}`}
          ref={mobileNavRef}
          id="mobile-nav"
          aria-hidden={!isMenuOpen}
        >
          <ul className="nav-links-list">
            <li>
              <a href="#home" onClick={() => handleScroll('home')} tabIndex={isMenuOpen ? 0 : -1}>
                Home
              </a>
            </li>
            <li>
              <a href="#education" onClick={() => handleScroll('education')} tabIndex={isMenuOpen ? 0 : -1}>
                Education
              </a>
            </li>
            <li>
              <a href="#quiz" onClick={() => handleScroll('quiz')} tabIndex={isMenuOpen ? 0 : -1}>
                Quiz
              </a>
            </li>
            <li>
              <a href="#humanity-science" onClick={() => handleScroll('humanity-science')} tabIndex={isMenuOpen ? 0 : -1}>
                Humanity & Science
              </a>
            </li>
           
          </ul>
          <div className="nav-btns nav-btns-mobile">
            <button className="login-btn" onClick={handleLogin} tabIndex={isMenuOpen ? 0 : -1}>
              Login
            </button>
            <div className="dropdown" ref={dropdownRef}>
              <button className="signup-btn" onClick={toggleDropdown} tabIndex={isMenuOpen ? 0 : -1}>
                Sign Up
              </button>
              <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                <Link to="/teacher-signup" onClick={() => { setIsMenuOpen(false); setIsDropdownOpen(false); }}>
                  Teacher
                </Link>
                <Link to="/student-signup" onClick={() => { setIsMenuOpen(false); setIsDropdownOpen(false); }}>
                  Student
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-links desktop-nav-links">
          <ul className="nav-links-list">
            <li>
              <a href="#home" onClick={() => handleScroll('home')}>
                Home
              </a>
            </li>
            <li>
              <a href="#education" onClick={() => handleScroll('education')}>
                Education
              </a>
            </li>
            <li>
              <a href="#quiz" onClick={() => handleScroll('quiz')}>
                Quiz
              </a>
            </li>
            <li>
              <a href="#humanity-science" onClick={() => handleScroll('humanity-science')}>
                Humanity & Science
              </a>
            </li>
         
          </ul>
        </div>
        <div className="nav-btns desktop-nav-btns">
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
          <div className="dropdown" ref={dropdownRef}>
            <button className="signup-btn" onClick={toggleDropdown}>
              Sign Up
            </button>
            <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
              <Link to="/teacher-signup" onClick={() => setIsDropdownOpen(false)}>
                Teacher
              </Link>
              <Link to="/student-signup" onClick={() => setIsDropdownOpen(false)}>
                Student
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;