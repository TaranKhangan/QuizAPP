



import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import refLogo from '../../assets/Logo-Sahash.jpeg';

const Navbar = ({ onLoginClick, onHomeClick }) => {
    // State to toggle mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  //ref for mobile navi container
  const mobileNavRef = useRef(null);
  //ref for mobile navi toggle btn
  const mobileToggleRef = useRef(null);
 
  //hook for programmatic navi
  const navigate = useNavigate();

  //toggle mobile menu open/close state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

  };

 

  //to handle smooth scrolling to section
  const handleScroll = (sectionId) => {
    //if not home page, navigate to '/' first
    if (window.location.pathname !== '/') {
      navigate('/');
      //delay scroll to allow page load
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          window.scrollTo({
            top: section.offsetTop - 64,// Offset for fixed navbar height
            behavior: 'smooth',
          });
        }
      }, 100);
    } else {
      //scroll directly if already on home page
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 64,
          behavior: 'smooth',
        });
      }
    }
    //close mobile menu after navigation
    setIsMenuOpen(false);
    
  };

  //handle login btn click 
  //using provided prop and fallback navigation
  const handleLogin = () => {
    if (onLoginClick) {
      onLoginClick();
      setIsMenuOpen(false);
    } else {
      console.warn('onLoginClick not provided');
      navigate('/login');
    }
  };
  //handle signup btn click, navi to signup 
  const handleSignup = ()=>{
      navigate('/signup');
      setIsMenuOpen(false);
   
  }

  //to home page 
  const handleHome = () => {
    if (onHomeClick) {
      onHomeClick();
    }
    setIsMenuOpen(false);
    navigate('/');
  };

    // Effect to close mobile menu when clicking outside

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        mobileNavRef.current &&
        mobileToggleRef.current &&
        !mobileNavRef.current.contains(event.target) &&
        !mobileToggleRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
        //setIsDropdownOpen(false);
      }
   
    };
    document.addEventListener('click', handleOutsideClick);
        // Cleanup listener on component unmount

    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  //effect ot manage mobile menu accessiblility  attribute
  useEffect(() => {
    const mobileNav = mobileNavRef.current;
    const mobileToggle = mobileToggleRef.current;
    if (mobileNav && mobileToggle) {
            // Update ARIA attributes for accessibility

      mobileNav.setAttribute('aria-hidden', !isMenuOpen);
      mobileToggle.setAttribute('aria-expanded', isMenuOpen);
      //adjust tabIndex for mobile links based on menu state
      const mobileLinks = Array.from(mobileNav.querySelectorAll('a, button'));

      mobileLinks.forEach(link => (link.tabIndex = isMenuOpen ? 0 : -1));
    }
  }, [isMenuOpen]);

  return (
    //Nav starts from here
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
                {/* Mobile menu toggle button */}

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
        {/**mobile nav links shown when menu is open */}
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
                    {/* Mobile navigation buttons */}

          <div className="nav-btns nav-btns-mobile">
            <button className="login-btn" onClick={handleLogin} tabIndex={isMenuOpen ? 0 : -1}>
              Login
            </button>
            <div >
              <button className="signup-btn" onClick={handleSignup} tabIndex={isMenuOpen ? 0 : -1}>
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/**desktop nav links */}
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
              <a href="#aboutUs" onClick={() => handleScroll('aboutUs')}>
                About Us
              </a>
            </li>
            <li>
              <a href="#FeebackForm" onClick={() => handleScroll('feedback')}>
                Feedback 
              </a>
            </li>
          
          </ul>
        </div>
                {/* Desktop navigation buttons */}

        <div className="nav-btns desktop-nav-btns">
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
          <div >
            <button className="signup-btn" onClick={handleSignup}>
              Sign Up
            </button>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;