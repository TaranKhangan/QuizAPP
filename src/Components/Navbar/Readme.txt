yeh app.ja hai : 
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Sign-Log/Login';
import TeacherSignUp from './Components/Sign-Log/TeacherSignUp';
import StudentSignUp from './Components/Sign-Log/StudentSignUp';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleHomeClick = () => {
    setShowLogin(false);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar onLoginClick={handleLoginClick} />
        <Routes>
          <Route
            path="/"
            element={showLogin ? <Login /> : <Home onLoginClick={handleLoginClick} />}
          />
          <Route
            path="/teacher-signup"
            element={<TeacherSignUp onHomeClick={handleHomeClick} />}
          />
          <Route
            path="/student-signup"
            element={<StudentSignUp onHomeClick={handleHomeClick} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App; i hope isme changes krni ki jarurat nhi hai abb

yeh navbar.js hai.. 
import React from 'react'
import './Navbar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import refLogo from '../../assets/ref-Logo.jpeg';
/*
import toogle_Light from '../../assets/toogle_Light.png';
*/

const Navbar = ({onLoginClick}) => {
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
        <button className='login-btn' onClick={onLoginClick}>Login</button>
        <div className='dropdown'>
        <button className='signup-btn' >Sign up</button>
        <div className='dropdown-content'>
          <Link to='/teacher-signup'>Teacher</Link>
          <Link to='/student-signup'>Student</Link>
      </div>
    </div>
    </div>
    </nav>
  );
};

export default Navbar
 i think isme bhi jarurat nhi hai add on krni ki cheeze.. but I think navbar .css mei hai.. kyuki ese to signup btn click home se pehle hi dropdown button k niche show ho rha hai usne puri styling kharab krdi hai login aur signup buttons k navbar mei.. here's the navbar.css
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

/* Navbar.css */
.navbar {
    position: fixed;
    top: 0;
    width: calc(100% - 20px); /* 10px margin on each side */
    margin: 0.624rem;
    background: #f1f2f1;
    background: linear-gradient(90deg, #e0e0fc 4%, #e9ebee 33%, #d3e2f1 98%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5375rem 1.56rem;
    border: 2px solid white;
    border-radius: 4.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
    gap: 1.45rem;
    margin : 0;
  }
  
  .nav-logo {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }
  
  .nav-logo:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
  
  .logo-name {
    font-size: 1.5rem;
    font-weight: bold;
    transition: transform 0.3s ease;
  }
  
  .logo-name:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  
  .nav-links {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }
  .nav-links li {
    display: inline-block;
    margin: 1.2rem;
    padding: 0.825rem 0;
    list-style: none;

    }
  .nav-links li a {
    text-decoration: none;
    color: #1e3a8a; 
    font-weight: 500;
    position: relative;
    transition: all 0.3s ease;
  }
  
  .nav-links li a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: #1e3a8a;
    transition: width 0.3s ease;
  }
  
  .nav-links li a:hover::after {
    width: 100%;
  }
  
  .nav-links li a:hover {
    color: #1e3a8a;
  }
  
  .nav-btns {
    display: flex;
    gap: 0.93rem;
  }
  
  .login-btn {
    padding: 0.5rem 0.735rem;
    border: 2px solid rgb(186, 199, 240);
    background-color:rgb(184, 210, 240);
    border-radius: 1.25rem;
    cursor: pointer;
    font-weight: 500;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .login-btn:hover {
    background-color:rgb(60, 94, 136); 
    color: white;
    transform: translateY(-0.125rem);
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.2);
  }
  
  .signup-btn {
    padding: 0.5rem 0.735rem;
    border: none;
    background-color:rgb(52, 79, 155); 
    color: white;
    border-radius: 1.25rem;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .signup-btn:hover {
    background-color:rgb(35, 102, 209); 
    transform: translateY(-0.125rem);
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.2);
  }

  /* Menu Icon Styles */
.menu-icon {
    display: none;
    flex-direction: column;
    gap: 0.3125rem; /* 5px = 0.3125rem */
    cursor: pointer;
}

.bar {
    width: 1.5625rem; 
    height: 0.1875rem;
    background-color: #1e3a8a;
    transition: all 0.3s ease;
}
/* Responsiveness */
@media (max-width: 787px) {
   .navbar{
    justify-content: space-around;
   }
   .nav-btns{
    display: none;
   }/*
    .nav-btns {
        display: none;
       flex-direction: column;
        gap: 10px;
        width: 100%;*/

   /* .login-btn, .signup-btn {
        width: 100%;
        padding: 10px;
    }*/
}

@media (max-width:627px){
    
    .navbar {
        padding: 0.625rem 0.9375rem;
        width: calc(100% - 10px);
        justify-content: space-between;
        margin: 10px;
    }
    
    .logo-container {
        margin-bottom: 10px;
    }
    .menu-icon {
        display: flex;
    }
    .nav-links {
        display: none;
        flex-direction: column;
        background: rgb(241,242,241);
        background: linear-gradient(90deg, rgba(241,242,241,1) 4%, rgba(232,240,248,1) 33%, rgb(227, 234, 241) 98%);
        position: absolute;
        top: 100%;
        left: 0;
        gap: 0.56rem;
        width: 100%;
        padding: 0.625rem;
        text-align: center;
        margin: 10px 0;
        border-radius: 0 0 1.5625rem 1.5625rem ;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        
    }
    .nav-links.active{
        display: flex;
        background-color: white;
        gap: 0.312rem;
    }
    .nav-links li {
        margin: 0.3125rem 0;
        width: 100%;
        text-align: center;

    }

    
}


yeh home.js hai I think isme bhi shayd hi jarurat hogi well tum check kr lena ek baar darling... 
import React, {useState, useEffect} from 'react';
import './Home.css';
import BookHeader from '../../assets/Book-Header2.png';
import { Link } from 'react-router-dom';



const Home = ({onLoginClick}) => {
  const [showButtons, setShowButtons] = useState(window.innerWidth<=768);
 
  useEffect(()=>{
    let mounted = true;
    const handleResize = () => {
      if(mounted){
      setShowButtons(window.innerWidth<=768);
    }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      mounted = false;
      window.removeEventListener('resize', handleResize);
    }
  })
  return (
    <div className='container'>
      <div className='content-wrapper'>
        <div className='text-content'>
      <div className='logo-container'>
        <div className='logo'>S</div>
        <h1 className='logo-Name'>Sahash</h1>
      </div>
        <h4><i>Every Answer Counts, So Does Every Life.</i></h4><h4>
        <i>Where Knowledge Meets Kindness.</i></h4><h4>
        <i>Be the Brain Behind the Change.</i></h4>
        {showButtons &&(
        <div className='buttons'>
            <button className='login-btn'  onClick={onLoginClick}>Login</button>
            <div className='dropdown'>
            <button className='signup-btn'>Sign up</button>
            <div className='dropdown-content'>
              <Link to='/teacher-signup'>Teacher</Link>
            </div>
            </div>
        </div>
        )}
        </div>
        <div className="image-content">
          <img src={BookHeader} alt="Book Header" className="book-header" />
        </div>
    </div>
    </div>
  );
}

export default Home
 but i think iske bhi home.css mei jarurat hia..
kyuki dropdown chahiye mujhe jab mai signup btn pe click karu .. 

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }
  
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #ffffff;
    background: linear-gradient(360deg,rgba(221, 227, 248, 0.72) 20%, #ffffff 50%, rgba(207, 218, 230, 0.45) 20%,  #ffffff 40% );
    overflow-x: hidden;
  }

    .container {
    text-align: center;
    padding: 3rem;
    border-radius: 1rem;
    max-width: 1200px;/***/
    margin: 1rem auto;
    animation: fadeIn 1.5s ease-in-out;
    overflow-x: hidden;
  }

  .content-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 2.5rem;
  }
  
  .text-content {
    flex: 1;
    text-align: center;
    max-width: 40%;
    
  }
  
  .image-content {
    
    display: flex;
    justify-content: flex-end;
    max-width: 45%;
    
  }
  
  .book-header {
    max-width: 100%;
    height: auto;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    max-height: 300px; 
    object-fit: contain; /* Ensures image doesn’t stretch */
  }

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1.4rem; 
}
  .logo {
    width: 3rem;
    height: 3rem;
    background: linear-gradient(45deg,rgb(76, 118, 187),rgb(154, 183, 218));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .logo:hover{
    transform: scale(1.1);
    box-shadow: 0 0.5rem 1 rem rgba(0, 0, 0, 0.81);
  }
  h1 {
    font-size: 2rem;
    color: #1a202c;
    margin-top: 0.625rem;
    font-weight: 500;
    letter-spacing: 0.03rem;
    transition: transform 0.3s ease;
  }
  h1:hover{
    transform: scale(1.1);
    font-weight: 600;
  }
  h4 {
    font-size: 1.125rem;
    color: #6B7280;
    margin-bottom: 1.4rem;
    font-weight: 400;
    font-style: italic;
    line-height: 1.6;
    position: relative;
    
  }
  
  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: nowrap;
    overflow-x : hidden;
    
    
  }

  
 button {
  padding: 0.65rem 0.725rem ;
  border-radius: 4rem !important;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}
  .container .login-btn {
    background: #f1f5f9;
    color: #3b82f6 ;
    border: 2px solid rgb(192, 218, 243) ;
    transition: all 0.3s ease;
}

.container .login-btn:hover {
    background: #2a5e8f ;
    transform: translateY(-0.125rem);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.container .signup-btn {
    background: #2a5e8f ;
    color: white;
    border: 2px solid #ffffff;
    transition: all 0.3s ease;
}

.container .signup-btn:hover {
    background: #4675a0 ;
    color: white;
    transform: translateY(-0.125rem);
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.2);
}
  
/* Fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

  /* Responsive design */
  @media (max-width: 768px) { 
    .container {
      padding: 1.5rem;
      margin-top: 1.4rem;
    }
    .content-wrapper{
      flex-direction: column;
      gap: 1.5rem;
    }
    .text-content{
      max-width: 100%;

    }
    .image-content{
      max-width: 100%;
      justify-content: center;
    }
    .book-header{
      max-height: 300px;
    }
    .logo {
      width: 2.1rem;
      height: 2.1rem;
      font-size: 1.2rem;
    }
  
    h1 {
      font-size: 1.125rem;
    }
  
    h4 {
      font-size: 1rem;
    }
  
    button {
      padding: 0.625rem 1.5rem;
      font-size: 0.875rem;
    }
  }

  @media (max-width: 600px) {
    .container{
      padding: 1.5rem;
    }
    
    .logo {
      width: 3rem;
      height: 3rem;
      font-size: 1rem;
    }
  
    h1 {
      font-size: 1.7rem;
      
    }
    h4 {
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
    }
  
    button {
      padding: 0.5rem 1.25rem !important;
      font-size: 0.965rem !important;
      
    }
  
    .buttons {
      gap: 0.75rem !important;
    }
  }











Navbar.css

*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

/* Navbar.css */
.navbar {
    position: fixed;
    top: 0;
    width: calc(100% - 20px); /* 10px margin on each side */
    margin: 0.624rem;
    background: #f1f2f1;
    background: linear-gradient(90deg, #e0e0fc 4%, #e9ebee 33%, #d3e2f1 98%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5375rem 1.56rem;
    border: 2px solid white;
    border-radius: 4.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
    gap: 1.45rem;
    margin : 0;
  }
  
  .nav-logo {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }
  
  .nav-logo:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
  
  .logo-name {
    font-size: 1.5rem;
    font-weight: bold;
    transition: transform 0.3s ease;
  }
  
  .logo-name:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  
  .nav-links {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }
  .nav-links li {
    display: inline-block;
    margin: 1.2rem;
    padding: 0.825rem 0;
    list-style: none;

    }
  .nav-links li a {
    text-decoration: none;
    color: #1e3a8a; 
    font-weight: 500;
    position: relative;
    transition: all 0.3s ease;
  }
  
  .nav-links li a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: #1e3a8a;
    transition: width 0.3s ease;
  }
  
  .nav-links li a:hover::after {
    width: 100%;
  }
  
  .nav-links li a:hover {
    color: #1e3a8a;
  }
  
  .nav-btns {
    display: flex;
    gap: 0.93rem;
  }
  
  .login-btn {
    padding: 0.5rem 0.735rem;
    border: 2px solid rgb(186, 199, 240);
    background-color:rgb(184, 210, 240);
    border-radius: 1.25rem;
    cursor: pointer;
    font-weight: 500;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .login-btn:hover {
    background-color:rgb(60, 94, 136); 
    color: white;
    transform: translateY(-0.125rem);
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.2);
  }
  
  .signup-btn {
    padding: 0.5rem 0.735rem;
    border: none;
    background-color:rgb(52, 79, 155); 
    color: white;
    border-radius: 1.25rem;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .signup-btn:hover {
    background-color:rgb(35, 102, 209); 
    transform: translateY(-0.125rem);
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.2);
  }

  /* Menu Icon Styles */
.menu-icon {
    display: none;
    flex-direction: column;
    gap: 0.3125rem; /* 5px = 0.3125rem */
    cursor: pointer;
}

.bar {
    width: 1.5625rem; 
    height: 0.1875rem;
    background-color: #1e3a8a;
    transition: all 0.3s ease;
}
/* Responsiveness */
@media (max-width: 787px) {
   .navbar{
    justify-content: space-around;
   }
   .nav-btns{
    display: none;
   }/*
    .nav-btns {
        display: none;
       flex-direction: column;
        gap: 10px;
        width: 100%;*/

   /* .login-btn, .signup-btn {
        width: 100%;
        padding: 10px;
    }*/
}

@media (max-width:627px){
    
    .navbar {
        padding: 0.625rem 0.9375rem;
        width: calc(100% - 10px);
        justify-content: space-between;
        margin: 10px;
    }
    
    .logo-container {
        margin-bottom: 10px;
    }
    .menu-icon {
        display: flex;
    }
    .nav-links {
        display: none;
        flex-direction: column;
        background: rgb(241,242,241);
        background: linear-gradient(90deg, rgba(241,242,241,1) 4%, rgba(232,240,248,1) 33%, rgb(227, 234, 241) 98%);
        position: absolute;
        top: 100%;
        left: 0;
        gap: 0.56rem;
        width: 100%;
        padding: 0.625rem;
        text-align: center;
        margin: 10px 0;
        border-radius: 0 0 1.5625rem 1.5625rem ;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        
    }
    .nav-links.active{
        display: flex;
        background-color: white;
        gap: 0.312rem;
    }
    .nav-links li {
        margin: 0.3125rem 0;
        width: 100%;
        text-align: center;

    }

    
}


/*FFFFFF  F1F5F9    1E293B    5713CD     https://grok.com/share/bGVnYWN5_628b4aa8-3463-433f-b80f-565a7a7f5c83*/


+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

login.js--------------------------------->>>>>>


import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [forgotIdentifier, setForgotIdentifier] = useState('');
    const [message, setMessage] = useState('');

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleForgotPasswordClick = () => {
        setShowForgotPassword(true);
        setMessage('');
        setForgotIdentifier('');
    };

    const handleBackToLogin = () => {
        setShowForgotPassword(false);
        setMessage('');
        setIdentifier('');
        setPassword('');
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (!identifier || !password) {
            setMessage('Please enter both email/username and password.');
            return;
        }
        // Placeholder: Simulate login API call
        console.log('Login attempted:', { identifier, password });
        setMessage('Login functionality not implemented yet.');
        // Example API call:
        // fetch('/api/login', {
        //     method: 'POST',
        //     body: JSON.stringify({ identifier, password }),
        //     headers: { 'Content-Type': 'application/json' },
        // })
        // .then(response => response.json())
        // .then(data => setMessage(data.message))
        // .catch(error => setMessage('Error: Login failed.'));
    };

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();
        if (!forgotIdentifier) {
            setMessage('Please enter your email or username.');
            return;
        }
        // Placeholder: Simulate password reset API call
        console.log('Password reset requested for:', forgotIdentifier);
        setMessage('If the email or username exists, a reset link has been sent.');
        // Example API call:
        // fetch('/api/reset-password', {
        //     method: 'POST',
        //     body: JSON.stringify({ identifier: forgotIdentifier }),
        //     headers: { 'Content-Type': 'application/json' },
        // })
        // .then(response => response.json())
        // .then(data => setMessage(data.message))
        // .catch(error => setMessage('Error: Could not send reset link.'));
    };

    return (
        <div className="body">
            <div className="bg-animation">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
            <div className="l-container">
                <h2>{showForgotPassword ? 'Reset Password' : 'Quiz Login'}</h2>
                {!showForgotPassword ? (
                    <form onSubmit={handleLoginSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                id="identifier"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                placeholder=" "
                                required
                            />
                            <label htmlFor="identifier">Email or Username</label>
                        </div>
                        <div className="input-group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder=" "
                                required
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className='options-row'>
                        <div className="checkbox-group">
                            <input
                                type="checkbox"
                                id="show-password"
                                checked={showPassword}
                                onChange={handleShowPassword}
                            />
                            <label htmlFor="show-password">Show Password</label>
                        </div>
                        <div className="forgot-password">
                            <span onClick={handleForgotPasswordClick}>Forgot Password?</span>
                        </div>
                        </div>
                        <button type="submit" className="l-login-btn">
                            Login to Quiz
                        </button>
                        {message && <p className="message">{message}</p>}
                    </form>
                ) : (
                    <form onSubmit={handleForgotPasswordSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                id="forgot-identifier"
                                value={forgotIdentifier}
                                onChange={(e) => setForgotIdentifier(e.target.value)}
                                placeholder=" "
                                required
                            />
                            <label htmlFor="forgot-identifier">Email or Username</label>
                        </div>
                        <button type="submit" className="l-login-btn">
                            Send Reset Link
                        </button>
                        <div className="back-to-login">
                            <button onClick={handleBackToLogin} className='l-login-btn'>Back to Login</button>
                        </div>
                        {message && <p className="message">{message}</p>}
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Login.css------------------------------------>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
}

.body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow: hidden;
}

.l-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 40px;
    width: 400px;
    box-shadow: 0 8px 32px rgba(155, 162, 233, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.18);
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

h2 {
    color: #ffffff;
    text-align: center;
    margin-bottom: 30px;
    font-size: 28px;
    letter-spacing: 1px;
    text-shadow: 0 0 10px rgba(0, 0, 255, 0.3);
}

.input-group {
    position: relative;
    margin-bottom: 30px;
}

input {
    width: 100%;
    padding: 12px;
    background: rgba(255, 255, 255, 0.34);
    border: none;
    border-radius: 10px;
    color:rgb(113, 116, 121);
    font-size: 16px;
    transition: all 0.3s ease;
}

input:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
}

input::placeholder {
    color: rgba(233, 229, 243, 0.9);
}

label {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(86, 59, 241, 0.52);
    pointer-events: none;
    transition: all 0.3s ease;
}

input:focus + label,
input:not(:placeholder-shown) + label {
    top: -10px;
    font-size: 12px;
    color: rgb(132, 139, 241);
    background: rgba(255, 255, 255, 0.34);
    padding: 0 5px;
    border-radius: 5px;
}

.options-row{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.checkbox-group {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    color: #ffffff;
}

.checkbox-group input {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    accent-color: #007bff;
    cursor: pointer;
}

.checkbox-group label {
    position: static;
    transform: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
}

.l-login-btn {
    width: 100%;
    padding: 12px;
    background: linear-gradient(45deg, rgb(67, 148, 235), rgb(129, 121, 248));
    /*45deg, rgb(37, 116, 201), rgb(21, 204, 228)*/
    border: none;
    border-radius: 10px;
    color: #ffffff;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.l-login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 123, 255, 0.4);
}

.l-login-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
    );
    transition: 0.5s;
}

.l-login-btn:hover::before {
    left: 100%;
}

/* Background Animation */
.bg-animation {
    position: absolute;
    background: linear-gradient(35deg, rgb(171, 182, 245) 0%, #ffffff 100%, rgb(231, 219, 245) 0%);
    width: 100%;
    height: 100%;
    z-index: -1;
}

.circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(0, 123, 255, 0.2);
    animation: move 25s infinite;
}

.circle:nth-child(1) {
    width: 200px;
    height: 200px;
    top: 10%;
    left: 20%;
}

.circle:nth-child(2) {
    width: 150px;
    height: 150px;
    top: 60%;
    right: 15%;
    animation-duration: 20s;
}

.circle:nth-child(3) {
    width: 100px;
    height: 100px;
    bottom: 20%;
    left: 30%;
    animation-duration: 30s;
}

@keyframes move {
    0% {
        transform: translate(0, 0);
    }
    50% {
        transform: translate(100px, 100px);
    }
    100% {
        transform: translate(0, 0);
    }
}


.forgot-password {
    text-align: right;
    
}

.forgot-password span {
    color:rgb(114, 166, 182);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.forgot-password span:hover {
    color: rgb(38, 114, 124);
    text-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
}

.back-to-login {
    text-align: center;
    
    margin-top: 20px;
    
}
/*
.back-to-login button{
    color:rgb(158, 156, 236);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: linear-gradient(45deg, rgb(37, 116, 201), rgb(21, 204, 228));
    border: none;
    outline: none;
    width: 100%;
    padding: 8px 0;

}

.back-to-login:hover {
    color: rgb(21, 204, 228);
    text-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
}
*/
.message {
    color:rgb(117, 125, 202);
    font-size: 14px;
    text-align: center;
    margin-top: 20px;
    text-shadow: 0 0 10px rgba(0, 0, 255, 0.3);
}

/* Responsiveness*/
@media (max-width: 500px) {
    .l-container {
        width: 98%;
        padding: 1.25rem;
        border-radius: 0.93rem; 
    }

    h2 {
        font-size: 1.25rem;
        margin-bottom: 1.25rem; 
    }

    .input-group {
        margin-bottom: 1.25rem; 
    }

    input {
        font-size: 0.875rem; 
        padding: 0.625rem; 
    }

    label {
        font-size: 0.875rem; 
        left: 0.625rem; 
    }

    input:focus + label,
    input:not(:placeholder-shown) + label {
        font-size: 0.625rem;
        top: -6px;
        padding: 0 3px;
    }

    .options-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.625rem; 
        margin-bottom: 0.9rem; 
    }

    .checkbox-group {
        margin-bottom: 0.9375rem; 
    }

    .checkbox-group input {
        width: 0.875rem; 
        height: 0.875rem;
        margin-right: 6px;
    }

    .checkbox-group label {
        font-size: 0.875rem; 
    }

    .l-login-btn {
        font-size: 0.85rem; 
        padding: 0.625rem; 
    }

    .forgot-password span,
    .message {
        font-size: 0.75rem;
    }

    .back-to-login {
        margin-top: 0.9375rem; 
    }

    .circle:nth-child(1) {
        width: 100px; 
        height: 100px;
        top: 5%;
        left: 10%;
    }

    .circle:nth-child(2) {
        width: 80px; 
        height: 80px;
        top: 50%;
        right: 5%;
    }

    .circle:nth-child(3) {
        width: 60px;
        height: 60px;
        bottom: 10%;
        left: 15%;
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-5px);
        }
    }

    @keyframes move {
        0% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(50px, 50px); 
        }
        100% {
            transform: translate(0, 0);
        }
    }
}



++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++