import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="body">
            <div className="bg-animation">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
            <div className="container">
                <h2>Quiz Master Login</h2>
                <form>
                    <div className="input-group">
                        <input
                            type="email"
                            id="email"
                            placeholder=" "
                            required
                        />
                        <label htmlFor="email">Email ID</label>
                    </div>
                    <div className="input-group">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder=" "
                            required
                        />
                        <label htmlFor="password">Password</label>
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
                    <button type="submit" className="login-btn">
                        Login to Quiz
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;