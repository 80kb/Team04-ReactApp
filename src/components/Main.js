//Contains all important detail related to routing components. Ensure one route is rendered at a time.
import { Routes, Route } from 'react-router-dom';
//These are importing the page infromation from related java script files Like our About Page, Catalog Information)
import About from './About';
import Catalog from './Catalog';
import Dashboard from './Dashboard';
import Reports from './Reports';
import LoginSignup from './LoginSignup';
import Order from './Order';
import '../styles/Main.css';

//This is the Home Page on Our WebApp. Its being done in the Main file since its easier to coordinate.
const Home = () => (
    <div className='home'>
        <h1>Welcome to Driver Rewards (TM)!</h1>
        <p>Under Construction</p>
    </div>
);
//These are our paths for the Webapp, on the site when you click one of the tabs, this will help you Access the correct info. for the page.
const Main = () => (
    <div className="main-container"> 
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/catalog' element={<Catalog />} />
            <Route exact path='/dashboard' element={<Dashboard />} />
            <Route exact path='/reports' element={<Reports />} />
            <Route exact path='/order' element={<Order />} />
	    
			<Route exact path='/login-signup' element={<LoginSignup/>}></Route>
        </Routes>
    </div>
);
//Used to export the Main function from the file, returns all routes and files related in Main. 
export default Main;
