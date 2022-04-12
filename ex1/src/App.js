import {useState} from "react";
import './Assests/Styles/App.css';
import ButtonChangePage from './Components/ButtonChangePage';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  const [status , statestatus] = useState('login');

  const radioHandler = (input) => {
    statestatus(input)
  }
  return (
    <div className="App">
      <ButtonChangePage 
      checkitregister = {status === 'register'}
      checkitlogin = {status === 'login'}
      clicklogin = {(e) => radioHandler(e.target.value)}
      clickregister = {(e) => radioHandler(e.target.value)}
      />
      {status === 'login' && <Login />}
      {status === 'register' && <Register />}
    </div>
  );
}

export default App;
