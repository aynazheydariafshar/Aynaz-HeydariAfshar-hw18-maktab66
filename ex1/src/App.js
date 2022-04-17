import {useState} from "react";
import './Assests/Styles/App.css';
import ButtonChangePage from './Components/ButtonChangePage';
import Login from './Components/Login';
import Register from './Components/Register';
import { UserContext } from "./Components/UserContext";


function App() {
  const [status , statestatus] = useState('login');
  const [loggedIn, setLoggedIn] = useState(false);

  //change between login and register page
  const radioHandler = (input) => {
    statestatus(input)
  }

  const login = () => {
    setLoggedIn(true);
  }

  const logout = () => {
    setLoggedIn(false);
  } 


  return (
    <UserContext.Provider value={{loggedIn, login, logout}}>
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
    </UserContext.Provider>
  );
}

export default App;
