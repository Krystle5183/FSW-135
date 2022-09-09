import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth.js';
import Navbar from './components/Navbar.js';
import Profile from './components/Profile.js';
import Public from './components/Public.js';
import './App.css';
import { UserContext } from './context/UserProvider.js';

function App() {

  const { token } = useContext(UserContext); 

  return (
    <div className = 'app-wrap'>
      <Navbar />
      <Routes>
        <Route path = '/' element = { token ? <Navigate to = '/profile' /> : <Auth /> }/>
        <Route path = 'profile' element = { <Profile /> } />
        <Route path = 'public' element = { <Public /> } />
      </Routes>
    </div>
  );
}

export default App;