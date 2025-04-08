import React from 'react'
import './Home.css';

const Home = () => {
  return (
    <div className='container'>
        <div className='logo'>S</div>
        <h1 className='logo-Name'>Sahash</h1>
        <h4><i>We Care All</i></h4>
        <div className='buttons'>
            <button className='login-btn'>Login</button>
            <button className='signup-btn'>Sign up</button>
        </div>
    </div>
  );
}

export default Home
