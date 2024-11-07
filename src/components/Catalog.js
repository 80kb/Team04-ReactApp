import React, { Component } from 'react';
import $ from 'jquery';
import { Authenticator } from '@aws-amplify/ui-react';

//This means the Class Catalog Inherits the Component Class(from React), allowing us to use a variety of functions, such as props. 
//Components help render things on the website.
class Catalog extends Component {

	constructor(props) {
		super(props);

		this.state = {
			productimage: '',
			productname: '',
			productprice: '',
			searchQuery: ''
		};
	}
	//For our Search bar on the website, when something is input into it, it will catch it and set the search query to this value.
	handleChange = (event) => {
		this.setState({ searchQuery: event.target.value });
	}

	//This to help is what used to search the EBAY API on our webpage, using the search query from the handleChange.
	handleSubmit = (event) => {
		$.ajax({
			//This comes from our API Gateway, and calls the lambda function to access the EBAY
			url: 'https://ckszaimc23.execute-api.us-east-2.amazonaws.com/EBAYAPIDepolyment1/ebay-search?search=' + this.state.searchQuery,		// URL for the api call, just copy from the browser
			type: 'POST',						// The type of API call
			dataType: 'json',
			success: (data) => {

				var searchResult = data['findItemsAdvancedResponse']['0']['searchResult']['0']['item'];
				this.setState({
					productimage: searchResult['0']['galleryURL'],
					productname: searchResult['0']['title'],
					productprice: searchResult['0']['sellingStatus']['0']['currentPrice']['0']['__value__'],
				}); 	// Update the state to the data received (if successful)

				console.log(this.state.productimage);
			},
			error: (xhr, stat, err) => {
				console.error('Error: ', err);			// Print the error if the api call failed
			}
		});
	}
	
	//This Deals with displaying values,products and various other affects on the website.
	render() {
		return (
			<Authenticator
			formFields={formFields}>
				
				<div className='catalog'>
				<h1>Driver Reward Catalog</h1>
				<p>Call your sponsor for more details at 1800-123-5555</p>

				<input type="text" onChange={this.handleChange} />
				<button type="button" onClick={this.handleSubmit}>Search</button>


				<h2>Items</h2>
				<p>Title: {this.state.productname}</p>
				<p>Price: {this.state.productprice}</p>
				<img src={this.state.productimage}/>
				</div>
			</Authenticator>
		);
	}
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

export default Catalog;
