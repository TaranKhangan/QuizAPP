


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