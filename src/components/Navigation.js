import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react'; // Import the useAuthenticator hook
import '../styles/Navigation.css';

const Navigation = () => {
  const { signOut, user } = useAuthenticator(); // Destructure user and signOut from the hook

  return (
    <nav>
      <ul className="nav-list">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/catalog">Catalog</NavLink></li>
        <li><NavLink to="/reports">Reports</NavLink></li>
        
        {/* Conditionally render Sign Out or Login/Signup */}
        {user ? (
          <li className="auth-link">
            {/* Apply 'auth-button' class to make the Sign Out button look like the links */}
            <button className="button" onClick={signOut}>Sign Out</button>
          </li>
        ) : (
          <li><NavLink to="/login-signup">Login/Signup</NavLink></li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
