import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Timeline from '../components/Timeline';
import '../styles/Home.css';
import axios from 'axios';

const Home = () => {
  // Get user login
  const [currentUser, setCurrentUser] = useState({});

  const getCurrentUser = async () => {
    const response = await axios.get('http://localhost:8000/check');
    setCurrentUser(response.data);
  }
  useEffect(() => {
    getCurrentUser();
  }, []);



  return (
    <div id="Home">
      <Navbar currentUser={currentUser}className="Nav"/>
      <Timeline currentUser={currentUser} className="Timeline"/>
    </div>
  )
}

export default Home