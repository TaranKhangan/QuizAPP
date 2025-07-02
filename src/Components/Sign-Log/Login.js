

/*
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
       
        console.log('Password reset requested for:', forgotIdentifier);
        setMessage('If the email or username exists, a reset link has been sent.');
       
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

export default Login;*/

///////////////////////////////////////////////////////////////////// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
////////////////////////////////////////////////////////////////////
/*
import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [signupData, setSignupData] = useState({ email: '', username: '', phone: '', password: '' });
  const [message, setMessage] = useState('');

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
    setShowSignup(false);
    setMessage('');
    setForgotIdentifier('');
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowForgotPassword(false);
    setMessage('');
    setSignupData({ email: '', username: '', phone: '', password: '' });
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setShowSignup(false);
    setMessage('');
    setIdentifier('');
    setPassword('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      setMessage('Please enter both email/username/phone and password.');
      return;
    }
    console.log('Login attempted:', { identifier, password });
    setMessage('Login functionality not implemented yet.');
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!forgotIdentifier) {
      setMessage('Please enter your email, username, or phone.');
      return;
    }
    console.log('Password reset requested for:', forgotIdentifier);
    setMessage('If the email, username, or phone exists, a reset link has been sent.');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupData.email || !signupData.username || !signupData.phone || !signupData.password) {
      setMessage('Please fill in all fields.');
      return;
    }
    console.log('Signup attempted:', signupData);
    setMessage('Signup functionality not implemented yet.');
  };

  return (
    <div className="body">
      <div className="left-section">
        <div className="bg-animation">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <div className="l-container">
          <h2>{showForgotPassword ? 'Reset Password' : showSignup ? 'Sign Up' : 'Login'}</h2>
          {!showForgotPassword && !showSignup ? (
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
          ) : showForgotPassword ? (
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
          ) : (
            <form onSubmit={handleSignupSubmit}>
              <div className="input-group">
                <input
                  type="email"
                  id="signup-email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData,
email: e.target.value })}
                  placeholder=" "
                  required
                />
                <label htmlFor="signup-email">Email</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  id="signup-username"
                  value={signupData.username}
                  onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                  placeholder=" "
                  required
                />
                <label htmlFor="signup-username">Username</label>
              </div>
              <div className="input-group">
                <input
                  type="tel"
                  id="signup-phone"
                  value={signupData.phone}
                  onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                  placeholder=" "
                  required
                />
                <label htmlFor="signup-phone">Phone Number</label>
              </div>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="signup-password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  placeholder=" "
                  required
                />
                <label htmlFor="signup-password">Password</label>
              </div>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="show-password"
                  checked={showPassword}
                  onChange={handleShowPassword}
                />
                <label htmlFor="show-password">Show Password</label>
              </div>
              <button type="submit" className="l-login-btn">
                Sign Up
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
      <div className="right-section">
        <div className="welcome-text">
          <h2>Welcome Back!!</h2>
          <p>Welcome back!! We are so happy to have you here. It’s great to see you again.</p>
          <button onClick={handleSignupClick} className="s-signup-btn">
            No account yet? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;*/

import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [signupData, setSignupData] = useState({ email: '', username: '', phone: '', password: '' });
  const [message, setMessage] = useState('');

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
    setShowSignup(false);
    setMessage('');
    setForgotIdentifier('');
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowForgotPassword(false);
    setMessage('');
    setSignupData({ email: '', username: '', phone: '', password: '' });
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setShowSignup(false);
    setMessage('');
    setIdentifier('');
    setPassword('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      setMessage('Please enter both email/username/phone and password.');
      return;
    }
    console.log('Login attempted:', { identifier, password });
    setMessage('Login functionality not implemented yet.');
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!forgotIdentifier) {
      setMessage('Please enter your email, username, or phone.');
      return;
    }
    console.log('Password reset requested for:', forgotIdentifier);
    setMessage('If the email, username, or phone exists, a reset link has been sent.');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupData.email || !signupData.username || !signupData.phone || !signupData.password) {
      setMessage('Please fill in all fields.');
      return;
    }
    console.log('Signup attempted:', signupData);
    setMessage('Signup functionality not implemented yet.');
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
          <h2>{showForgotPassword ? 'Reset Password' : showSignup ? 'Sign Up' : 'Login'}</h2>
          {!showForgotPassword && !showSignup ? (
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
          ) : showForgotPassword ? (
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
          ) : (
            <form onSubmit={handleSignupSubmit}>
              <div className="input-group">
                <input
                  type="email"
                  id="signup-email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  placeholder=" "
                  required
                />
                <label htmlFor="signup-email">Email</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  id="signup-username"
                  value={signupData.username}
                  onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                  placeholder=" "
                  required
                />
                <label htmlFor="signup-username">Username</label>
              </div>
              <div className="input-group">
                <input
                  type="tel"
                  id="signup-phone"
                  value={signupData.phone}
                  onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                  placeholder=" "
                  required
                />
                <label htmlFor="signup-phone">Phone Number</label>
              </div>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="signup-password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  placeholder=" "
                  required
                />
                <label htmlFor="signup-password">Password</label>
              </div>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="show-password"
                  checked={showPassword}
                  onChange={handleShowPassword}
                />
                <label htmlFor="show-password">Show Password</label>
              </div>
              <button type="submit" className="l-login-btn">
                Sign Up
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
          <div className="welcome-text">
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