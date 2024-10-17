import { Routes, Route } from 'react-router-dom';
import About from './About'

const Home = () => (
	<div className='home'>
		<h1>Welcome to Driver Rewards (TM)!</h1>
		<p>Under Construction</p>
	</div>
);

const Main = () => (
	<Routes>
		<Route exact path='/' element={<Home />}></Route>
		<Route exact path='/about' element={<About />}></Route>
	</Routes>
);

export default Main;
