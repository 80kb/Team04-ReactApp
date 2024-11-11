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
    <Authenticator formFields={formFields}>
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

export default App;

