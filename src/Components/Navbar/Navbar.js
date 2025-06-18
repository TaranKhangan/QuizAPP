

/*import React, { useState } from 'react';
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
      {/* Menu Icon for Mobile *//*}
      <div className="menu-icon" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Navigation Links *//*}
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
      {/* Nav-Buttons *//*}
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

export default Navbar;*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import refLogo from '../../assets/ref-Logo.jpeg';

const Navbar = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileNavRef = useRef(null);
  const mobileToggleRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 64, // Adjust for navbar height
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false);
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
        mobileNavRef.current.setAttribute('aria-hidden', 'true');
        mobileToggleRef.current.setAttribute('aria-expanded', 'false');
        const mobileLinks = mobileNavRef.current.querySelectorAll('a');
        mobileLinks.forEach(link => (link.tabIndex = -1));
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  useEffect(() => {
    const mobileNav = mobileNavRef.current;
    const mobileToggle = mobileToggleRef.current;
    mobileNav.setAttribute('aria-hidden', !isMenuOpen);
    mobileToggle.setAttribute('aria-expanded', isMenuOpen);
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => (link.tabIndex = isMenuOpen ? 0 : -1));
  }, [isMenuOpen]);

  return (
    <nav className="navbar" role="banner">
      <div className="nav-bar container" role="navigation" aria-label="Primary navigation">
        <div className="logo-container">
          <img src={refLogo} alt="HumanityEd Logo" className="nav-logo" />
          <span className="logo-name">HumanityEd</span>
        </div>
        <div className="menu-icon" onClick={toggleMenu} ref={mobileToggleRef} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`} ref={mobileNavRef} id="mobileNav" aria-hidden={!isMenuOpen}>
          <ul>
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
            <li>
              <a href="#game-section" onClick={() => handleScroll('game-section')} tabIndex={isMenuOpen ? 0 : -1}>
                Play Game
              </a>
            </li>
          </ul>
        </div>
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
      </div>
    </nav>
  );
};

export default Navbar;*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import refLogo from '../../assets/ref-Logo.jpeg';

const Navbar = ({ onLoginClick, onHomeClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileNavRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
      }, 0);
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
        mobileNavRef.current.setAttribute('aria-hidden', 'true');
        mobileToggleRef.current.setAttribute('aria-expanded', 'false');
        const mobileLinks = mobileNavRef.current.querySelectorAll('a');
        mobileLinks.forEach(link => (link.tabIndex = -1));
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  useEffect(() => {
    const mobileNav = mobileNavRef.current;
    const mobileToggle = mobileToggleRef.current;
    mobileNav.setAttribute('aria-hidden', !isMenuOpen);
    mobileToggle.setAttribute('aria-expanded', isMenuOpen);
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => (link.tabIndex = isMenuOpen ? 0 : -1));
  }, [isMenuOpen]);

  return (
    <nav className="navbar" role="banner">
      <div className="nav-bar container" role="navigation" aria-label="Primary navigation">
        <div className="logo-container">
          <Link to="/" onClick={onHomeClick}>
            <img src={refLogo} alt="HumanityEd Logo" className="nav-logo" />
            <span className="logo-name">HumanityEd</span>
          </Link>
        </div>
        <div className="menu-icon" onClick={toggleMenu} ref={mobileToggleRef} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`} ref={mobileNavRef} id="mobileNav" aria-hidden={!isMenuOpen}>
          <ul>
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
            <li>
              <a href="#game-section" onClick={() => handleScroll('game-section')} tabIndex={isMenuOpen ? 0 : -1}>
                Play Game
              </a>
            </li>
          </ul>
        </div>
        <div className="nav-btns">
          <button className="login-btn" onClick={onLoginClick}>
            Login
          </button>
          <div className="dropdown">
            <button className="signup-btn">Sign up</button>
            <div className="dropdown-content">
              <Link to="/teacher-signup" onClick={() => setIsMenuOpen(false)}>Teacher</Link>
              <Link to="/student-signup" onClick={() => setIsMenuOpen(false)}>Student</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

*//*
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////========================================================================================================================///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////==============================================================================================================================


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
      const mobileLinks = mobileNav.querySelectorAll('a, button');
      mobileLinks.forEach(link => (link.tabIndex = isMenuOpen ? 0 : -1));
    }
  }, [isMenuOpen]);

  return (
    <nav className="navbar" role="banner">
      <div className="nav-bar container" role="navigation" aria-label="Primary navigation">
        <div className="logo-container">
          <Link to="/" onClick={handleHome}>
            <img src={refLogo} alt="Sahash Logo" className="nav-logo" />
            <div className='logo-text'>
            <span className="logo-name">SAHASH</span>
            <span className="logo-desc"><i>WE CARE ALL</i></span>
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
          id="mobileNav"
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
            <li>
              <a href="#game-section" onClick={() => handleScroll('game-section')} tabIndex={isMenuOpen ? 0 : -1}>
                Play Game
              </a>
            </li>
          </ul>
          <div className="nav-btns mobile-nav-btns">
            <button className="login-btn" onClick={handleLogin} tabIndex={isMenuOpen ? 0 : -1}>
              Login
            </button>
            <div className="dropdown" ref={dropdownRef}>
              <button className="signup-btn" onClick={toggleDropdown} tabIndex={isMenuOpen ? 0 : -1}>
                Sign up
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
            <li>
              <a href="#game-section" onClick={() => handleScroll('game-section')}>
                Play Game
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
              Sign up
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

export default Navbar;*/






/////////////////////////////////////////////////////////////////////////////////////////////////////////////==============================================================///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
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
      const mobileLinks = mobileNav.querySelectorAll('a, button');
      mobileLinks.forEach(link => (link.tabIndex = isMenuOpen ? 0 : -1));
    }
  }, [isMenuOpen]);

  return (
    <nav className="navbar" role="banner">
      <div className="nav-bar container" role="navigation" aria-label="Primary navigation">
        <div className="logo-container">
          <Link to="/" onClick={handleHome}>
            <img src={refLogo} alt="Sahash Logo" className="nav-logo" />
            <div className="logo-text">
              <span className="logo-name">SAHASH</span>
              <span className="logo-desc"><i>WE CARE ALL</i></span>
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
          id="mobileNav"
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
            <li>
              <a href="#game-section" onClick={() => handleScroll('game-section')} tabIndex={isMenuOpen ? 0 : -1}>
                Play Game
              </a>
            </li>
          </ul>
          <div className="nav-btns mobile-nav-btns">
            <button className="login-btn" onClick={handleLogin} tabIndex={isMenuOpen ? 0 : -1}>
              Login
            </button>
            <div className="dropdown" ref={dropdownRef}>
              <button className="signup-btn" onClick={toggleDropdown} tabIndex={isMenuOpen ? 0 : -1}>
                Sign up
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
            <li>
              <a href="#game-section" onClick={() => handleScroll('game-section')}>
                Play Game
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
              Sign up
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

export default Navbar;*/


//////////////////////////////////////////////////////////////////////////////////////// This is what was right with the duplicated navs.... iykyk..//////////////////////////////////////////////////////////////////////////////////////

/*

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
    <nav className="navbar" role="banner">
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
            <li>
              <a href="#game-section" onClick={() => handleScroll('game-section')} tabIndex={isMenuOpen ? 0 : -1}>
                Game
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
            <li>
              <a href="#game-section" onClick={() => handleScroll('game-section')}>
                Game
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

export default Navbar;*/

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
            <li>
              <a href="#game-section" onClick={() => handleScroll('game-section')} tabIndex={isMenuOpen ? 0 : -1}>
                Game
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
            <li>
              <a href="#game-section" onClick={() => handleScroll('game-section')}>
                Game
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