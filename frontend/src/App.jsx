import './App.css'
import { Switch, Route,Router,BrowserRouter } from 'react-router-dom';
import AboutUs from './components/AboutUs/AboutUs';


function App() {

  return (
    <div className='App'>
      <Switch>
      <Route exact path="/about">
          <AboutUs />
        </Route>
      </Switch>

    </div>
  )
}

export default App
