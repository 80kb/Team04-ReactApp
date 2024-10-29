import React from 'react';
import '../styles/LoginSignup.css';

const LoginSignup = () => {
    return (
        <div className="login-signup-container">
            <p>Please choose an option below:</p>
            <div className="button-container">
                <button className="auth-button">Login</button>
                <button className="auth-button">Sign Up</button>
            </div>
        </div>
    );
};

export default LoginSignup;
