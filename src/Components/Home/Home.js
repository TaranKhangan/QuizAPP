import React from 'react'
import './Home.css';

const Home = () => {
  return (
    <div className='container'>
        <div className='logo'>Sahash</div>
        <h1>Sahash</h1>
        <h4>We Care All</h4>
        <div className='buttons'>
            <button className='login-btn'>Login</button>
            <button className='signup-btn'>Sign up</button>
        </div>
    </div>
  );
}

export default Home
