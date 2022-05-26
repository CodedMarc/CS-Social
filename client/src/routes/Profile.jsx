import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Timeline from '../components/Timeline';
import '../styles/Home.css';
import '../styles/profile.css';

const Profile = () => {
  return (
    <div id="Home">
      <Navbar className="Nav"/>
      <h1 className="PROFILE-COMING-SOON">PROFILE ALSO COMING SOON...</h1>
    </div>
  )
}

export default Profile