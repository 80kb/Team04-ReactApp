import React, { Component } from 'react';
import $ from 'jquery';

class About extends Component {

	// Initializes the state to default values.
	// That's all this is really needed for at the moment.
	constructor(props) {
		super(props);

		this.state = {
			teamnum: 0,
			sprintnum: 0,
			productname: 'lol_nope',
			productdescription: 'you_thought',
			releasedate: '0/0/0',
		};
	}

	// Runs when the component is loaded.
	// In this case the "component" is the entire about page.
	//
	// This function will make calls to the API and update
	// global vairables with the results from the api call.
	//
	// The global variables are stored in the this.state dictionary
	// in the constructor above. The constructor is only
	// setting the initial default state values, and this function will
	// update those values with the values we receive from the api.
	componentDidMount() {
		$.ajax({
			url: 'https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage005/aboutPage',		// URL for the api call, just copy from the browser
			type: 'GET',						// The type of API call
			dataType: 'json',
			success: (data) => {
				this.setState({
					teamnum: data['Items']['0']['TeamNumber'],
					sprintnum: data['Items']['0']['SprintNumber'],
					productname: data['Items']['0']['ProductName'],
					productdescription: data['Items']['0']['ProductDescription'],
					releasedate: data['Items']['0']['ReleaseDate'],
				}); 	// Update the state to the data received (if successful)
			},
			error: (xhr, stat, err) => {
				console.error('Error: ', err);			// Print the error if the api call failed
			}
		});
	}

	// The function that displays the html for the page.
	// Runs after componentDidMount() is run.
	//
	// Uses the global state values given by the API calls in componentDidMount()
	// if the API calls were successful. Otherwise it will display the default value
	// defined in the constructor.
	render() {
		return (
			<>
			<h1>About Us</h1>
			<ul>
			<li>Team: {this.state.teamnum}</li>
			<li>Sprint: {this.state.sprintnum}</li>
			<li>Product Name: {this.state.productname}</li>
			<li>Product Description: {this.state.productdescription}</li>
			<li>Release Date: {this.state.releasedate}</li>
			</ul>
			</>
		);
	}
}

export default About;
