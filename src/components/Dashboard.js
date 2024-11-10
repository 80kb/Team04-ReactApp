import React, { useState } from 'react';
import '../styles/Dashboard.css';
//import { Authenticator } from '@aws-amplify/ui-react';



const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('viewPoints');

    const [applicationData, setApplicationData] = useState({
  	ApplicationID: 'unique_number',
  	Application_Status: 'Undetermined',
  	Driver_Name: 'Joe Doe',
  	Sponsor_Org: 'Amazon',
  	email: 'joe.doe@example.com',
     });


const changeData = (e) => {
    const { name, value } = e.target;
    setApplicationData((prevData) => ({
      ...prevData,
      [name]: value, // Update only the field that changed
    }));
  };

     // Function to handle submission of all application data at once
  const submitApplication = () => {
    // You can send applicationData to an API or DynamoDB here
	console.log("Driver Name: ", applicationData.Driver_Name);
        console.log("Sponsor Org: ", applicationData.Sponsor_Org);
        console.log("Email: ", applicationData.email);

    console.log('Submitting application data:', applicationData);
    // Here, you might also call a function to save this data to your backend!!

    alert("Your application has been submitted successfully!");
  };

  // Conditionally render content based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case 'viewPoints':
        return <h2>View My Points: [Placeholder for Points]</h2>;
      case 'accountDetails':
        return <h2>Account Details: [Placeholder for Account Info]</h2>;
      case 'rewards':
        return <h2>Rewards: [Placeholder for Rewards]</h2>;
      case 'application':
        return (
          <div>
            <h2>Application Details</h2>
            <form>
              <div>
                <label>
                  Driver Name:
                  <input
                    type="text"
                    name="Driver_Name"
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
                    name="Sponsor_Org"
                    value={applicationData.Sponsor_Org}
                    onChange={changeData}
                  />
                </label>
              </div>

              <div>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={applicationData.email}
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
        return <h2>Placeholder Content</h2>;
    }

  };


    return (
        //<Authenticator
        //formFields={formFields}>
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
        //</Authenticator>
    );
};

/*const formFields = {
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
  }*/

export default Dashboard;
