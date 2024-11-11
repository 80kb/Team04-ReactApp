import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import Navigation from './components/Navigation';
import Main from './components/Main';
import './App.css';
import { Amplify } from 'aws-amplify';
import outputs from './amplify_outputs.json';

Amplify.configure(outputs);

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="app-container">
          <header className="app-header">
            <h1>Driver Rewards</h1>
          </header>
          <Navigation user={user} signOut={signOut} />
          <main className="app-main">
            <Main />
          </main>
          <footer className="app-footer">
            <p>&copy; Driver Rewards, Inc.</p>
          </footer>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
