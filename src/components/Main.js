//Contains all important detail related to routing components. Ensure one route is rendered at a time.
import { Routes, Route } from 'react-router-dom';
//These are importing the page infromation from related java script files Like our About Page, Catalog Information)
import About from './About';
import Catalog from './Catalog';
import Dashboard from './Dashboard';
import Reports from './Reports';

//This is the Home Page on Our Web.
const Home = () => (
	<div className='home'>
		<h1>Welcome to Driver Rewards (TM)!</h1>
		<p>Under Construction</p>
	</div>
);
//These are our paths for the Webapp, on the site when you click one of the tabs, this will help route you to the correct page.
const Main = () => (
	<Routes>
		<Route exact path='/' element={<Home/>}></Route>
		<Route exact path='/about' element={<About/>}></Route>
		<Route exact path='/catalog' element={<Catalog/>}></Route>
		<Route exact path='/dashboard' element={<Dashboard/>}></Route>
		<Route exact path='/reports' element={<Reports/>}></Route>
	</Routes>
);
//Used to export the Main function from the file, returns all routes and files related in Main. 
export default Main;
