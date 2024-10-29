import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import Main from './components/Main';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Driver Rewards</h1>
      </header>
      <Navigation />
      <main className="app-main">
        <Main />
      </main>
      <footer className="app-footer">
        <p>&copy; Driver Rewards, Inc.</p>
      </footer>
    </div>
  );
}

export default App;

