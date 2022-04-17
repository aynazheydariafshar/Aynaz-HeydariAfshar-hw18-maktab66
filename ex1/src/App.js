import {useState , useEffect} from "react";
import './Assests/Styles/App.css';
import ButtonChangePage from './Components/ButtonChangePage';
import Login from './Components/Login';
import Register from './Components/Register';
import axios from 'axios';
import Spinner from "./Components/Spinner";


function App() {
  const [status , statestatus] = useState('login');
  const[isloaded , setisloaded] = useState(true);
  const [dataUser , setDataUser] = useState({})

  //get data from user
  // useEffect(() => {
  //   axios
  //   .post('http://localhost:8000/users')
  //   .then(res => res.data)
  //   .then(mydata => {
  //     setDataUser(mydata)})
  //   .finally(() => setisloaded(true))
  //   // const res = await axios.post('http://localhost:8000/users' , json , {
  //   //   headers : {
  //   //     'Content-Type': 'application/json'
  //   //   }
  //   // })
  // }, [])

  //change between login and register page
  const radioHandler = (input) => {
    statestatus(input)
  }

  return (
    <>
      {isloaded ? <div className="App">
      <ButtonChangePage 
        checkitregister = {status === 'register'}
        checkitlogin = {status === 'login'}
        clicklogin = {(e) => radioHandler(e.target.value)}
        clickregister = {(e) => radioHandler(e.target.value)}
      />
      {status === 'login' && <Login />}
      {status === 'register' && <Register initialValues = {dataUser}/>}
      </div> : <Spinner />}
    </>
  );
}

export default App;
