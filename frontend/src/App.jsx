import './App.css'
import { Switch, Route,Router,BrowserRouter } from 'react-router-dom';
import AboutUs from './components/AboutUs/AboutUs';
import NavBar from './components/Navbar/NavBar';


function App() {

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
