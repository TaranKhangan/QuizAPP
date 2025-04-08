import React from 'react'
import './Navbar.css';
import refLogo from '../../assets/ref-Logo.jpeg';
import toogle_Light from '../../assets/toogle_Light.png';


const Navbar = () => {
  return (
    <div className='nav-container navbar'>
      <img src='' alt='' className='nav-logo'/>
        <div className='nav-links'>
        <ul>
            <li>
            <a href='#home'>Home</a></li>
            <li><a href='#about'>About Us</a></li>
            <li><a href='#services'>services</a></li>
            <li><a href='#contact'>Contact</a></li>
        </ul>

        <img src= '' alt='toogle' className='toogle-icon'/>

        <div className='nav-btns'> 
            <button className='login-btn'>Login</button>
            <button className='signup-btn'>Sign up</button>
        </div>
        </div>
    </div>
  )
}

export default Navbar
