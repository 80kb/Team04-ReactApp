import { NavLink } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = () => (
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
