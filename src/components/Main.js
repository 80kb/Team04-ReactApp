import { Routes, Route } from 'react-router-dom';
import About from './About';
import Catalog from './Catalog';
import Dashboard from './Dashboard';
import Reports from './Reports';
import LoginSignup from './LoginSignup';
import '../styles/Main.css';

const Home = () => (
    <div className='home'>
        <h1>Welcome to Driver Rewards (TM)!</h1>
        <p>Under Construction</p>
    </div>
);

const Main = () => (
    <div className="main-container"> 
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/catalog' element={<Catalog />} />
            <Route exact path='/dashboard' element={<Dashboard />} />
            <Route exact path='/reports' element={<Reports />} />
			<Route exact path='/login-signup' element={<LoginSignup/>}></Route>
        </Routes>
    </div>
);

export default Main;
