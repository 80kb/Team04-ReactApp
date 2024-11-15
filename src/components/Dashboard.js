import React, { useState } from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const { user } = useAuthenticator((context) => [context.user]);
    const [activeTab, setActiveTab] = useState('viewPoints');
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
            [name]: value,
        }));
    };

    const generateUniqueID = () => Date.now();

    const submitApplication = async (event) => {
        event.preventDefault();
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
                body: JSON.stringify(applicationDataWithID)
            });

            if (!response.ok) {
                throw new Error('Failed to submit application');
            }

            const result = await response.json();
            console.log('Application submitted successfully:', result);
            alert('Application submitted successfully!');

        } catch (error) {
            console.error('Error submitting application:', error);
            alert('There was an error submitting the application.');
        }
    };

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
                        <p>Enter your name and sponsor organization to register for a Good Drivers Rewards account with that sponsor.</p>
                        <form onSubmit={submitApplication}>
                            <div>
                                <label>
                                    Driver Name:
                                    <input
                                        type="text"
                                        name="driverName"
                                        value={applicationData.driverName}
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
                                        value={applicationData.sponsorOrg}
                                        onChange={changeData}
                                    />
                                </label>
                            </div>
                            <button type="submit">
                                Submit Application
                            </button>
                        </form>
                    </div>
                );
            default:
                return <h2>Placeholder Content</h2>;
        }
    };

    // Ensure user data and role are loaded
    const userRole = 'Driver';
    
    return (
        <Authenticator formFields={formFields}>
            <div className="dashboard">
                <div className="sidebar">
                    <h3>Dashboard</h3>
                    <ul>
                        {userRole === 'Driver' && (
                            <>
                                <li onClick={() => setActiveTab('viewPoints')} className={activeTab === 'viewPoints' ? 'active' : ''}>View My Points</li>
                                <li onClick={() => setActiveTab('application')} className={activeTab === 'application' ? 'active' : ''}>Application</li>
                            </>
                        )}
                        {userRole === 'Admin' && (
                            <>
                                <li onClick={() => setActiveTab('accountDetails')} className={activeTab === 'accountDetails' ? 'active' : ''}>Account Details</li>
                                <li onClick={() => setActiveTab('rewards')} className={activeTab === 'rewards' ? 'active' : ''}>Rewards Management</li>
                            </>
                        )}
                        {userRole === 'Sponsor' && (
                            <>
                                <li onClick={() => setActiveTab('accountDetails')} className={activeTab === 'accountDetails' ? 'active' : ''}>My Organization</li>
                                <li onClick={() => setActiveTab('rewards')} className={activeTab === 'rewards' ? 'active' : ''}>Sponsor Rewards</li>
                            </>
                        )}
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
            order: 1,
            label: 'First Name',
            required: true
        },
        family_name: {
            order: 2,
            label: 'Last Name',
            required: true
        },
        email: {
            order: 3,
            placeholder: 'Enter your Email',
            required: true
        },
        preferred_username: {
            order: 4,
            placeholder: 'Enter username',
            required: true
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
};

export default Dashboard;
