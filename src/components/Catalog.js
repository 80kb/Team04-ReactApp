import React, { Component } from 'react';
import $ from 'jquery';

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

	handleChange = (event) => {
		this.setState({ searchQuery: event.target.value });
	}

	handleSubmit = (event) => {
		$.ajax({
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

	render() {
		return (
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
		);
	}
}

export default Catalog;
