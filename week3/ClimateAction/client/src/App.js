import { Routes , Route, Navigate } from 'react-router-dom'
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Public from './components/Public';
import { UserContext } from './context/UserProvider';
import './App.css';
import { useContext } from 'react';

const App = () => {

  const {token} = useContext(UserContext)

  return (
    <div className="App">
      <div className='landing-page'>
        <Navbar className="navbar" />
        <Routes>
          <Route
            exact path="/"
            element={ token ? <Navigate replace to='/profile' /> : <Auth /> }
          />
          <Route
            exact path="/profile"
            element={ !token ? < Navigate replace to='/' /> : <Profile /> }
          />
          <Route 
            exact path="/public"
            element={ <Public /> }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;