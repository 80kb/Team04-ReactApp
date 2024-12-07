import { Authenticator, SignOut } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);

const LoginSignup = () => {
    return (
        <Authenticator formFields={formFields}>
            {({ signOut, user }) => (
                <div className="login-signup-container">
                    <p>Welcome, {user ? user.username : "please choose an option below:"}</p>
                    <div className="button-container">
                        {user && (
                            <button className="auth-button" onClick={signOut}>Sign Out</button>
                        )}
                    </div>
                </div>
            )}
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

export default LoginSignup;
