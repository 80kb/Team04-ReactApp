import logo from './logo.svg';
import './App.css';
//import About from './components/About';
import Navigation from './components/Navigation';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
	  <h1>Driver Rewards!</h1>
	  <Navigation />
	  <Main />
    </div>
  );
}

export default App;
