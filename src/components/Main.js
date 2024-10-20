import { Routes, Route } from 'react-router-dom';
import About from './About'
import Catalog from './Catalog'

const Home = () => (
	<div className='home'>
		<h1>Welcome to Driver Rewards (TM)!</h1>
		<p>Under Construction</p>
	</div>
);

const Main = () => (
	<Routes>
		<Route exact path='/' element={<Home/>}></Route>
		<Route exact path='/about' element={<About/>}></Route>
		<Route exact path='/catalog' element={<Catalog/>}></Route>
	</Routes>
);

export default Main;
