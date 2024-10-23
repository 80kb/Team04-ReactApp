import React, { Component } from 'react';
import $ from 'jquery';

class Catalog extends Component {

	constructor(props) {
		super(props);

		this.state = {
			productimage: '',
			productname: ''
		};
	}

	componentDidMount() {
		$.ajax({
			url: 'https://ckszaimc23.execute-api.us-east-2.amazonaws.com/EBAYAPIDepolyment1/ebay-search',		// URL for the api call, just copy from the browser
			type: 'POST',						// The type of API call
			dataType: 'json',
			success: (data) => {

				var searchResult = data['findItemsAdvancedResponse']['0']['searchResult']['0'];
				this.setState({
					productimage: searchResult['item']['0']['galleryURL'],
					productname: searchResult['item']['0']['title'],
				}); 	// Update the state to the data received (if successful)

				console.log(this.state.productimage);
			},
			error: (xhr, stat, err) => {
				console.error('Error: ', err);			// Print the error if the api call failed
			}
		});
	}

	render() {
		return (
			<div className='catalog'>
			<h1>Driver Reward Catalog</h1>
			<p>Call your sponsor for more details at 1800-123-5555</p>

			<h2>Items</h2>
			<p>Title: {this.state.productname}</p>
			<img src={this.state.productimage}/>
			</div>
		);
	}
}

export default Catalog;
