import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { getCurrentUser } from 'aws-amplify/auth';


const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userID, setUserID] = useState(null);

    // Fetch user ID on entering the tab
    useEffect(() => {
      const fetchUserID = async () => {
          try {
              const user = await getCurrentUser();
              setUserID(user.username);
          } catch (error) {
              console.error('Error fetching user ID:', error);
          }
      };

      fetchUserID();
    }, []);

    //Fetch user data on entering the tab
    useEffect(() => {
      if(activeTab === 'accountDetails' || activeTab === 'viewPoints' && userID) {
        fetchUserData();
      }
    }, [activeTab, userID]);

    // GET all user data
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage006/users/${userID}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const result = await response.json();
        setUserData(result.Item);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const [applicationData, setApplicationData] = useState({
  	applicationID: 0,
  	applicationStatus: 'Processing',
  	driverName: '',
  	sponsorOrg: '',
  	applicationDate: new Date().toLocaleDateString(),
     });


const changeData = (e) => {
    const { name, value } = e.target;
    setApplicationData((prevData) => ({
      ...prevData,
      [name]: value, // Update only the field that changed
    }));
  };

 const generateUniqueID = () => Date.now();

     // Function to handle submission of all application data at once
  const submitApplication = async (event) => {
    event.preventDefault(); // Prevent form reload

    // Generate a unique ID for the application
    const uniqueID = generateUniqueID();
    const applicationDataWithID = {
        ...applicationData,
        applicationID: uniqueID
    };

    try {
        const response = await fetch('https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage006/applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(applicationDataWithID)// Send updated application data
        });

        if (!response.ok) {
            throw new Error('Failed to submit application');
        }

        const result = await response.json();
        console.log('Application submitted successfully:', result);  // Message from Lambda response
        alert('Application submitted successfully!');

    } catch (error) {
        console.error('Error submitting application:', error);
        alert('There was an error submitting the application.');
    }
  };


  // Conditionally render content based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case 'viewPoints':
        return (
          <div>
              <h2>View Points</h2>
              {userData ? (
                  <div>
                      <p><strong>Points:</strong> {userData.Points}</p>
                  </div>
              ) : (
                  <p>Loading user points...</p>
              )}
          </div>
        )
      case 'accountDetails':
        return (
          <div>
              <h2>Account Details</h2>
              {userData ? (
                  <div>
                      <p><strong>First Name:</strong> {userData.FirstName}</p>
                      <p><strong>Last Name:</strong> {userData.LastName}</p>
                      <p><strong>Email:</strong> {userData.Email}</p>
                      <p><strong>Phone Number:</strong> {userData.PhoneNumber}</p>
                      <p><strong>Address:</strong> {userData.Address}</p>
                      <p><strong>Birthdate:</strong> {userData.Birthdate}</p>
                      <p><strong>Username:</strong> {userData.Username}</p>
                      <p><strong>Created At:</strong> {new Date(userData.CreatedAt).toLocaleString()}</p>
                  </div>
              ) : (
                  <p>Loading user details...</p>
              )}
          </div>
      );
      case 'rewards':
        return <h2>Rewards: [Placeholder for Rewards]</h2>;
      case 'application':
        return (
          <div>
            <h2>Application Details</h2>
	<p>Below, Enter Your Name and Sponsor Orgaziation to Register for
		a Good Drivers Rewards Account with that Sponsor.</p>
            <form>
              <div>
                <label>
                  Driver Name:
                  <input
                    type="text"
                    name="driverName"
                    value={applicationData.Driver_Name}
                    onChange={changeData}
                  />
                </label>
              </div>

              <div>
                <label>
                  Sponsor Org:
                  <input
                    type="text"
                    name="sponsorOrg"
                    value={applicationData.Sponsor_Org}
                    onChange={changeData}
                  />
                </label>
              </div>

              {/* Submit Button */}
              <button type="button" onClick={submitApplication}>
                Submit Application
              </button>
            </form>
          </div>
        );
      default:
        return <h2>Select a Tab to View</h2>;
    }

  };


    return (
        <Authenticator
        formFields={formFields}>
            <div className="dashboard">
                <div className="sidebar">
                    <h3>Dashboard</h3>
                    <ul>
                        <li onClick={() => setActiveTab('viewPoints')} className={activeTab === 'viewPoints' ? 'active' : ''}>View My Points</li>
                        <li onClick={() => setActiveTab('accountDetails')} className={activeTab === 'accountDetails' ? 'active' : ''}>Account Details</li>
                        <li onClick={() => setActiveTab('rewards')} className={activeTab === 'rewards' ? 'active' : ''}>Rewards</li>
	    		<li onClick={() => setActiveTab('application')} className={activeTab === 'application' ? 'active' : ''}>Application</li>
                    </ul>
                </div>
                <div className="content">
                    {renderContent()}
                </div>
            </div>
        </Authenticator>
    );
};

const formFields = {
    signUp: {
      given_name: {
        order:1,
        label:'First Name',
        required:true
      },
      family_name: {
        order: 2,
        label:'Last Name',
        required:true
      },
      email: {
        order: 3,
        placeholder: 'Enter your Email',
        required:true
      },
      preferred_username: {
        order: 4,
        placeholder: 'Enter username',
        required:true
      },
      password: {
        order: 5,
        placeholder: 'Enter your desired password',
        required: true
      },
      confirm_password: {
        order: 6,
        placeholder: 'Enter the same password',
        required: true
      },
      address: {
        order: 7,
        label: 'Address',
        placeholder: 'Enter address',
        required: true
      },
    },
  }

export default Dashboard;
