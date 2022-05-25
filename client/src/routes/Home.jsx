import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Timeline from '../components/Timeline';
import '../styles/Home.css';

const Home = () => {
  return (
    <div id="Home">
      <Navbar className="Nav"/>
      <Timeline className="Timeline"/>
    </div>
  )
}

export default Home