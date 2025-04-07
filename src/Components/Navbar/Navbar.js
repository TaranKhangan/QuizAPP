import React from 'react'
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='nav-container'>
      <img src='' alt='' className='nav-logo'/>
        <div className='nav-links'>
        <ul>
            <li>
            <a href='#home'>Home</a></li>
            <li><a href='#about'>About Us</a></li>
            <li><a href='#services'>services</a></li>
            <li><a href='#contact'>Contact</a></li>
        </ul>
        <img src='' alt=''/>
        <div className='nav-btns'> 
            <button className='login-btn'>Login</button>
            <button className='signup-btn'>Sign up</button>
        </div>
        </div>
    </div>
  )
}

export default Navbar
