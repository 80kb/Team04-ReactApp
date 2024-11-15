import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import '../styles/Navigation.css';

const Navigation = () => {
    const { signOut, user } = useAuthenticator();
  
    // Safely check if user and user.attributes exist, then get the role
    const userRole = user && user.attributes ? user.attributes['custom:role'] : null;

    return (
        <nav>
            <ul className="nav-list">
                <li><NavLink to="/">Home</NavLink></li>
                
                {userRole === 'Driver' && (
                    <>
                        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                        <li><NavLink to="/view-points">View Points</NavLink></li>
                    </>
                )}
                
                {userRole === 'Admin' && (
                    <>
                        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                        <li><NavLink to="/account-details">Account Details</NavLink></li>
                        <li><NavLink to="/manage-rewards">Manage Rewards</NavLink></li>
                    </>
                )}
                
                {userRole === 'Sponsor' && (
                    <>
                        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                        <li><NavLink to="/organization">My Organization</NavLink></li>
                        <li><NavLink to="/sponsor-rewards">Sponsor Rewards</NavLink></li>
                    </>
                )}

                {/* Common links */}
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/catalog">Catalog</NavLink></li>
                <li><NavLink to="/reports">Reports</NavLink></li>

                {/* Authentication link */}
                {user ? (
                    <li className="auth-link">
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
