import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth.js';
import Navbar from './components/Navbar.js';
import Profile from './components/Profile.js';
import PublicProfile from './components/PublicProfile.js';
import './App.css';
import { UserContext } from './context/UserProvider.js';


function App() {

  const { token } = useContext(UserContext); 
  const shouldRedirect = true;
  
  function RequireAuth({ children, redirectTo }){
    let isAuthenticated = token;
    return isAuthenticated ? children : <Navigate to = {redirectTo} />;
  };

  return (
    <div className = 'app-wrap'>
      <Navbar />
      <Routes>

        <Route 
          path = '/' 
          element = { token ? <Navigate to = '/profile' /> : <Auth /> }
        />

        <Route 
          path = 'profile' 
          element = { 
            <RequireAuth redirectTo = '/'>
              <Profile />
            </RequireAuth>
          } 
        />

        <Route 
        path = 'publicIssues' 
        element = { <PublicProfile /> } 
        />

      </Routes>
    </div>
  );
}

export default App;