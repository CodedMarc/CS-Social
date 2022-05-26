import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css'
import vid from '../assets/bg_vid.mp4'
const Login = () => {
  const [data, setData] = useState('');



  return (
    <div className="login-page">
      <video autoPlay loop muted id="myVideo">
        <source src={vid} type="video/mp4" />
      </video>
      <h1 className="welcome">Welcome to CS Social! {data.data}</h1>
      <div className="login-form-container">
        <Link to="/auth" className="githubOAuth">Sign In Using Github</Link>
      </div>
    </div>
  )
}

export default Login