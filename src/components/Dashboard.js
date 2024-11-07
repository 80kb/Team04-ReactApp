import React, { useState } from 'react';
import '../styles/Dashboard.css'; 
import { Authenticator } from '@aws-amplify/ui-react';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('viewPoints');

    const renderContent = () => {
        switch (activeTab) {
            case 'viewPoints':
                return <h2>View My Points: [Placeholder for Points]</h2>;
            case 'accountDetails':
                return <h2>Account Details: [Placeholder for Account Info]</h2>;
            case 'rewards':
                return <h2>Rewards: [Placeholder for Rewards]</h2>;
            default:
                return <h2>Select a tab to see content</h2>;
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
