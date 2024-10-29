import React, { useState } from 'react';
import '../styles/Dashboard.css'; 

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
    );
};

export default Dashboard;
