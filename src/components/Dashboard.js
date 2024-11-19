import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Dashboard.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { getCurrentUser } from 'aws-amplify/auth';


const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userID, setUserID] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});

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

    // GET all user data
    const fetchUserData = useCallback(async () => {
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
    }, [userID]);

    // Edit button clicks
    const handleEdit = () => {
      setIsEditing(true);
      setEditedData(userData);
    };

    //Fetch user data on entering the tab
    useEffect(() => {
      if(userID) {
        fetchUserData();
      }
    }, [activeTab, userID, fetchUserData]);

    // Handle input change in edit form
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedData((prevData) => ({
          ...prevData,
          [name]: value,
      }));
    };

    // Submit edited data
    const submitEdits = async () => {
      try {
          // Update in Cognito
          /*await Auth.updateUserAttributes(Auth.currentAuthenticatedUser(), {
              given_name: editedData.FirstName,
              family_name: editedData.LastName,
              email: editedData.Email,
              address: editedData.Address,
              phone_number: editedData.PhoneNumber,
          });
          */
          // Update in DynamoDB
          await fetch(`https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage006/users/${userID}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(editedData),
          });

          // Update local state and exit edit mode
          setUserData(editedData);
          setIsEditing(false);
          alert('Account details updated successfully!');
      } catch (error) {
          console.error('Error updating account details:', error);
          alert('There was an error updating your account details.');
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
              {isEditing ? (
                  <div>
                      <label>
                          First Name:
                          <input type="text" name="FirstName" value={editedData.FirstName || ''} onChange={handleChange} />
                      </label>
                      <label>
                          Last Name:
                          <input type="text" name="LastName" value={editedData.LastName || ''} onChange={handleChange} />
                      </label>
                      <label>
                          Email:
                          <input type="email" name="Email" value={editedData.Email || ''} onChange={handleChange} />
                      </label>
                      <label>
                          Phone Number:
                          <input type="tel" name="PhoneNumber" value={editedData.PhoneNumber || ''} onChange={handleChange} />
                      </label>
                      <label>
                          Address:
                          <input type="text" name="Address" value={editedData.Address || ''} onChange={handleChange} />
                      </label>
                      <button onClick={submitEdits}>Save Changes</button>
                      <button onClick={() => setIsEditing(false)}>Cancel</button>
                  </div>
              ) : (
                  <div>
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
                              <button onClick={handleEdit}>Edit</button>
                          </div>
                      ) : (
                          <p>Loading user details...</p>
                      )}
                  </div>
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
                    	{userData ? (
                    	    <div>
                    	    {userData.UserType == 'Driver' ? (
                    	        <ul>
                    	        <li onClick={() => setActiveTab('viewPoints')} className={activeTab === 'viewPoints' ? 'active' : ''}>View My Points</li>
                        	<li onClick={() => setActiveTab('accountDetails')} className={activeTab === 'accountDetails' ? 'active' : ''}>Account Details</li>
                        	<li onClick={() => setActiveTab('application')} className={activeTab === 'application' ? 'active' : ''}>Application</li>
                    		</ul>
                    	    ) : userData.UserType == 'Sponsor' ? (
                    	        <ul>
                    	        <li onClick={() => setActiveTab('accountDetails')} className={activeTab === 'accountDetails' ? 'active' : ''}>Account Details</li>
                        	<li onClick={() => setActiveTab('rewards')} className={activeTab === 'rewards' ? 'active' : ''}>Rewards</li>
                    		</ul>
                    	    ) : userData.UserType == 'Admin' ? (
                    	        <ul>
                    	        <li onClick={() => setActiveTab('viewPoints')} className={activeTab === 'viewPoints' ? 'active' : ''}>View My Points</li>
                        	<li onClick={() => setActiveTab('accountDetails')} className={activeTab === 'accountDetails' ? 'active' : ''}>Account Details</li>
                        	<li onClick={() => setActiveTab('rewards')} className={activeTab === 'rewards' ? 'active' : ''}>Rewards</li>
                        	<li onClick={() => setActiveTab('application')} className={activeTab === 'application' ? 'active' : ''}>Application</li>
                    		</ul>
                    	    ) : (<p> ERROR </p>)}
                    	    </div>
                    	) : (
                    	    <p> ERROR </p>
                    	)}
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
