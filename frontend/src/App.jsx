import './App.css'
import { Switch, Route} from 'react-router-dom';
import AboutUs from './components/AboutUs/AboutUs';
import NavBar from './components/Navbar/NavBar';
import { useState } from 'react';


function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('loggedIn'));
  const [userType, setUserType] = useState(localStorage.getItem('userType'));
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems") || false) || []
  )

  
  return (
    <div className='App'>
      <NavBar
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        userType={userType}
        setUserType={setUserType}
        // userPatient={userPatient}
        // userPractitioner={userPractitioner}
        // setUserPatient={setUserPatient}
        // setUserPractitioner={setUserPractitioner}
        cartItems={cartItems}
      />
      <Switch>
      <Route exact path="/about">
          <AboutUs />
        </Route>
      </Switch>

    </div>
  )
}

export default App
