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

var currentUserID = null;


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
                  throw new Error(`Failed to fetch User Details: ${response.statusText}`);
                }

                const result = await response.json();
                setUserData(result.Item);
                currentUserID = result.Item.UserID;
          
              } catch (error) {
                alert('There was an error getting User Details.');
              }    
        };

        const fetchAlerts = async () => {
            try {
                const response = await fetch(`https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage006/alerts`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                if (!response.ok) {
                    throw new Error(`Failed to fetch Alerts: ${response.statusText}`);
                }
    
                const result = await response.json();
                const AlertItems = result.Items;
                const filteredAlerts = AlertItems.filter(Alerts => Alerts.Seen === false && Alerts.UserID === currentUserID);
    
                for(let i = 0; i < filteredAlerts.length; i++) {
                    alert(`Title: ${filteredAlerts[i].Alert_Type}\n\n${filteredAlerts[i].Alert_Message}`);
                    try {
                        await fetch(`https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage006/alerts/${filteredAlerts[i].AlertID}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                Seen: true
                              })
                        });
                    } catch (error) {
                        alert('There was an error changing alert to "Seen".');
                    }
                }
    
            } catch (error) {
                alert('There was an error getting Alerts.');
            }
        }
    
        fetchUserDetails();
        fetchAlerts();
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

// Create a "No Access" component
const NoAccess = () => (
    <div className="no-access">
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page. For Drivers, please Submit an Application and wait to be Approved to access the Catalog!</p>
    </div>
);

//These are our paths for the Webapp, on the site when you click one of the tabs, this will help you Access the correct info. for the page.
const Main = () => {
     const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const user = await getCurrentUser();
                const userID = user.username;

                const response = await fetch(`https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage006/users/${userID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch User Details: ${response.statusText}`);
                }

                const result = await response.json();
                setUserData(result.Item);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

  //userData.UserType === 'Driver'
  //If a user doesn't have sponsorOrg., locks asscess to accessing the catalog.
  const userCanAccessCatalog = userData && userData.SponsorOrg;
   
 return (
    <div className="main-container"> 
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/catalog' element={userCanAccessCatalog ? <Catalog /> : <NoAccess />} />
            <Route exact path='/dashboard' element={<Dashboard />} />
            <Route exact path='/reports' element={<Reports />} />
            <Route exact path='/order' element={<Order />} />
	    
	    <Route exact path='/login-signup' element={<LoginSignup/>}></Route>
        </Routes>
    </div>
   );
};
//Used to export the Main function from the file, returns all routes and files related in Main. 
export default Main;
