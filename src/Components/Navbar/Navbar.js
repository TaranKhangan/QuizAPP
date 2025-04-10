import React from 'react'
import './Navbar.css';
import { useState } from 'react';
import refLogo from '../../assets/ref-Logo.jpeg';
/*
import toogle_Light from '../../assets/toogle_Light.png';
*/

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='navbar'>
      
      <div className='logo-container'>
        <img src={refLogo} alt='' className='nav-logo'/>
        <span className='logo-name'>LOGO</span>
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
            <a href='#home'>Home</a></li>
          <li><a href='#about'>About Us</a></li>
          <li><a href='#services'>Services</a></li>
          <li><a href='#contact'>Contact Us</a></li>
        </ul>
      </div>
      {/*Nav-Buttons*/ }
      <div className='nav-btns'> 
        <button className='login-btn'>Login</button>
        <button className='signup-btn'>Sign up</button>
      </div>
    
    </nav>
  )
}

export default Navbar
