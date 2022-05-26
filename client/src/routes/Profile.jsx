import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Timeline from '../components/Timeline';
import '../styles/Home.css';

const Profile = () => {
  return (
    <div id="Home">
      <Navbar className="Nav"/>
      <h1>PROFILE HERE</h1>
    </div>
  )
}

export default Profile