import React, { Component } from 'react';
import $ from 'jquery';

class About extends Component {
	constructor(props) {
		super(props);

		this.state = {
			teamnum: 2,
		};
	}

	componentDidMount() {
		$.ajax({
			url: 'https://reqres.in/api/users?page=2',
			type: 'GET',
			dataType: 'json',
			success: (data) => {
				this.setState({ teamnum: data['per_page'] });
			},
			error: (xhr, stat, err) => {
				console.error('Error: ', err);
			}
		});
	}

	render() {
		return (
			<>
			<h1>About Us</h1>
			<ul>
			<li>{this.state.teamnum}</li>
			</ul>
			</>
		);
	}
}

export default About;
