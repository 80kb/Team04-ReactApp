import React, { Component } from 'react';
import $ from 'jquery';
import { Authenticator } from '@aws-amplify/ui-react';
import '../styles/Catalog.css'; 

//This means the Class Catalog Inherits the Component Class(from React), allowing us to use a variety of functions, such as props. 
//Components help render things on the website.
class Catalog extends Component {

	constructor(props) {
		super(props);

		this.state = {
			productimage: [],
			productname: [],
			productprice: [],
			searchQuery: '',
			exchangeRate: 1
		};

		$.ajax({
			url: 'https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage006/sponsorOrgs',		// URL for the api call, just copy from the browser
			type: 'GET',						// The type of API call
			dataType: 'json',
			success: (data) => {
				//console.log( data['Items']['0']['exchangeRate'] );
				this.setState({ exchangeRate: data['Items']['0']['exchangeRate'] });
			},
			error: (xhr, stat, err) => {
				console.error('Error: ', err);			// Print the error if the api call failed
			}
		});
	}

	//For our Search bar on the website, when something is input into it, it will catch it and set the search query to this value.
	handleChange = (event) => {
		this.setState({ searchQuery: event.target.value });
	}
	
	//Deal with user hitting the enter button to search for something in the catalog.
	handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			this.handleSubmit(event);
		}
	};

	//This to help is what used to search the EBAY API on our webpage, using the search query from the handleChange.
	handleSubmit = (event) => {

		$.ajax({
			//This comes from our API Gateway, and calls the lambda function to access the EBAY
			url: 'https://ckszaimc23.execute-api.us-east-2.amazonaws.com/EBAYAPIDepolyment1/ebay-search?search=' + this.state.searchQuery,//URL for the api call, just copy from the browser
			type: 'POST',						// The type of API call
			dataType: 'json',
			success: (data) => {

				var searchResult = data['findItemsAdvancedResponse']['0']['searchResult']['0']['item'];

				var nameArr 	= [];
				var imgArr 	= [];
				var priceArr 	= [];

				var length = searchResult.length > 15 ? 15 : searchResult.length;

				for( var i = 0; i < length; i++ ) {
					var index = i.toString();
					nameArr.push( searchResult[index]['title'][0] ); 
					imgArr.push( searchResult[index]['galleryURL'][0] );
					priceArr.push( 
						searchResult[index]['sellingStatus']['0']['currentPrice']['0']['__value__'] * this.state.exchangeRate );
				}

				this.setState({
					productname: nameArr,
					productimage: imgArr,
					productprice: priceArr
				});
			},
			error: (xhr, stat, err) => {
				console.error('Error: ', err);			// Print the error if the api call failed
			}
		});
	}
	
	//This Deals with displaying values,products and various other affects on the website.
	render() {

		return (

      <Authenticator formFields={formFields}>
			<div className='catalog'>
			<h1>Driver Reward Catalog</h1>
			<p>Call your sponsor for more details at 1800-123-5555</p>

			<input 
			   type="text" 
			   onChange={this.handleChange}//If the User clicks the Search Button.
			   onKeyDown={this.handleKeyPress}//If the user hits the enter button on there keyboard.
			/>
			<button type="button" onClick={this.handleSubmit}>Search</button>

			<h2>Items</h2>

			<div className="catalogGrid">
			{this.state.productname.map((item, index) => (
				<div className="catalogEntry" key={index}>
					<img src={this.state.productimage[index]} />
					<p>{item}</p>
					<p>{this.state.productprice[index]} points</p>
				</div>
			))}
			</div>

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
