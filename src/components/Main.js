//Contains all important detail related to routing components. Ensure one route is rendered at a time.
import { Routes, Route } from 'react-router-dom';
//These are importing the page infromation from related java script files Like our About Page, Catalog Information)
import About from './About';
import Catalog from './Catalog';
import Dashboard from './Dashboard';
import Reports from './Reports';
import LoginSignup from './LoginSignup';
import Order from './Order';
import '../styles/Main.css';

import {useState, useEffect} from 'react'
import { getCurrentUser } from 'aws-amplify/auth';

//This is the Home Page on Our WebApp. Its being done in the Main file since its easier to coordinate.
const Home = () => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                var user = await getCurrentUser();
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }

            const userID = user.username;
    
            try {
                const response = await fetch(`https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage006/users/${userID}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });
            
                if (!response.ok) {
                  throw new Error(`Failed to fetch sponsor organizations: ${response.statusText}`);
                }

                const result = await response.json();
                setUserData(result.Item);
          
              } catch (error) {
                alert('There was an error getting Sponsor Organizations.');
              }    
        };
    
        fetchUserDetails();
      }, []);

    return(
        <div className='home'>
            <header className="hero-section">
                <h1>Welcome to Driver Rewards (TM)!</h1>
                {userData ? (
                    <strong><p style={{ fontSize: '32px' }}>Hello, {userData.FirstName} {userData.LastName} ({userData.UserType})!</p></strong>
                ) : (
                    <p>Loading user data...</p>
                )}
                <p>
                    Driver Rewards (TM) is a platform dedicated to recognizing and rewarding drivers for their hard work, dedication, and exceptional performance. Our mission is to provide a meaningful incentive system that encourages safe driving practices and celebrates milestones.
                </p>
            </header>
            <section className="benefits-section">
                <h2>Key Benefits</h2>
                <ul>
                    <li>Encourages safe and efficient driving habits.</li>
                    <li>Motivates drivers to achieve their best performance.</li>
                </ul>
            </section>
            <footer className="footer-section">
                <p>&copy; 2024 Driver Rewards (TM). All Rights Reserved.</p>
            </footer>
        </div>
    );
};

//These are our paths for the Webapp, on the site when you click one of the tabs, this will help you Access the correct info. for the page.
const Main = () => (
    <div className="main-container"> 
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/catalog' element={<Catalog />} />
            <Route exact path='/dashboard' element={<Dashboard />} />
            <Route exact path='/reports' element={<Reports />} />
            <Route exact path='/order' element={<Order />} />
	    
			<Route exact path='/login-signup' element={<LoginSignup/>}></Route>
        </Routes>
    </div>
);
//Used to export the Main function from the file, returns all routes and files related in Main. 
export default Main;
