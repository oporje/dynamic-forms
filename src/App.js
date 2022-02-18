import './App.css';
import logo from './assets/better-logo.png';
import SignUp from './components/signup-form/signup-form';

function App() {
  return (
    <div className="App">
        <img src={logo} alt='brand-logo'/>
        <SignUp></SignUp>
    </div>
  );
}

export default App;
