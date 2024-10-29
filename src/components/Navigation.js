//A Library that is used to create links to diffent pages that we use on the Web App.
import { NavLink } from 'react-router-dom';
import '../styles/Navigation.css';

//Navigation deals with process of moving from one page to another.
//This function deals with navigation of each web page.
const Navigation = () => (
	//The various links used to navigate around our Web App.
	<nav>
		<ul>
		<li><NavLink to="/">Home</NavLink></li>
		<li><NavLink to="/dashboard">Dashboard</NavLink></li>
		<li><NavLink to="/about">About</NavLink></li>
		<li><NavLink to="/catalog">Catalog</NavLink></li>
		<li><NavLink to="/reports">Reports</NavLink></li>
		<li><NavLink to="/login-signup">Login/Signup</NavLink></li>
		</ul>
	</nav>
);

export default Navigation;
