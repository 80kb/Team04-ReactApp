import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Good Driver Incentive Program</h1>
      </header>
      <div className="about-container">
        <p>
          The Good Driver Incentive Program is designed to reward safe and responsible driving behavior. By participating in this program, drivers can earn points for maintaining safe driving habits, which can be redeemed for rewards or discounts on future services.
        </p>
        <p>Here's how it works:</p>
        <ul>
          <li>Earn points for safe driving, following speed limits, and avoiding harsh braking or acceleration.</li>
          <li>Receive alerts for important updates, including points earned or removed, and when you're added or dropped by a sponsor.</li>
          <li>Non-disablable alerts ensure you never miss critical updates on your status and rewards.</li>
        </ul>
        <p>
          The program is managed by sponsors and admins, who will update your progress and notify you of important changes. Start driving safely today and earn rewards for your efforts!
        </p>
        <p>
          If you have any questions or need assistance, please contact our support team at{' '}
          <a href="mailto:support@driverincentive.com">support@driverincentive.com</a>.
        </p>
      </div>
    </div>
  );
}

export default App;
