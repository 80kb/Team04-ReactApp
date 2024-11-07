import { Authenticator } from '@aws-amplify/ui-react';

const Reports = () => (
	<Authenticator
        formFields={formFields}>
		<div className='reports'>
		<h1>Generate Reports</h1>
		<form action="/">
			<p>Report type:</p><br/>
			<input type="radio"/><br/>
			<input type="radio"/><br/>
			<input type="radio"/><br/>
			<p>User(s) (comma separated):</p><br/>
			<input type="text" id="lname" name="lname" value="John Doe"/><br/><br/>
			<input type="submit" value="Submit"/>
		</form>
		</div>
	</Authenticator>
);

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

export default Reports;
