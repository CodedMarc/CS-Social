import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Timeline from '../components/Timeline';
import '../styles/Home.css';
import '../styles/profile.css';
import axios from 'axios';

const Profile = () => {
    // Get user login
    const [currentUser, setCurrentUser] = useState({});

    const getCurrentUser = async () => {
      const response = await axios.get('/check');
      setCurrentUser(response.data);
      console.log(response.data);
    }
    useEffect(() => {
      getCurrentUser();
    }, []);

  return (
    <div id="Home">
      <Navbar className="Nav"/>
      <h1 className="messages-coming-soon" style={{textAlign: 'center'}}>http://localhost:8000/profile</h1>
    </div>
  )
}

export default Profile