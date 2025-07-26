import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
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

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      setMessage('Please enter both email/username/phone and password.');
      return;
    }

    try {
      // Replace with actual backend API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });
      if (response.ok) {
        // Mock successful login
        setMessage('Login successful!');
        setTimeout(() => navigate('/dashboard'), 1000); // Redirect to dashboard
      } else {
        setMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!forgotIdentifier) {
      setMessage('Please enter your email, username, or phone.');
      return;
    }
    try {
      // Replace with actual backend API call
      await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: forgotIdentifier }),
      });
      setMessage('If the email, username, or phone exists, a reset link has been sent.');
    } catch (error) {
      console.error('Forgot password error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className={`body ${showForgotPassword ? 'forgot-password-active' : ''}`}>
      <div className="left-section">
        <div className="bg-animation">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <div className="l-container">
          <h2>{showForgotPassword ? 'Reset Password' : 'Login'}</h2>
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
                <label htmlFor="identifier">Email, Username, or Phone</label>
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
              <div className="options-row">
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
                Login
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
                <label htmlFor="forgot-identifier">Email, Username, or Phone</label>
              </div>
              <button type="submit" className="l-login-btn">
                Send Reset Link
              </button>
              <div className="back-to-login">
                <button onClick={handleBackToLogin} className="l-login-btn">
                  Back to Login
                </button>
              </div>
              {message && <p className="message">{message}</p>}
            </form>
          )}
        </div>
      </div>
      {!showForgotPassword && (
        <div className="right-section">
          <div className="welcome-text-l">
            <h2>Welcome Back!!</h2>
            <p>Welcome back!! We are so happy to have you here. It’s great to see you again.</p>
            <button onClick={handleSignupClick} className="s-signup-btn">
              No account yet? Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;