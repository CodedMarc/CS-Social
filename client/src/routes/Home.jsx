import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Messages from './Messages';

const Home = () => {
  return (
    <div>
      <Navbar />
    </div>
  )
}

export default Home