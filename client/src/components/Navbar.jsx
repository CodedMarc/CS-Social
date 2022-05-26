import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'

const Navbar = (props) => {
  
  return (
    <nav>
      <a className="logo" href="/">CS Social</a>
      <ul className="nav-links">
        <Link to='/home'><i class="fa-solid fa-house-chimney-user"></i></Link>
        <Link to='/messages'><i class="fa-solid fa-envelope"></i></Link>
        <Link to='/profile'><i class="fa-solid fa-user"></i></Link>
      </ul>
    </nav>
  )
}

export default Navbar