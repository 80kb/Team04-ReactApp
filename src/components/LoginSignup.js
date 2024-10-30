import React from 'react';
import '../styles/LoginSignup.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);


const LoginSignup = () => {
    return (
        <Authenticator
        formFields={formFields}>

            <div className="login-signup-container">
                <p>Please choose an option below:</p>
                <div className="button-container">
                    <button className="auth-button">Login</button>
                    <button className="auth-button">Sign Up</button>
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
      }
    },
  }
  

export default LoginSignup;
