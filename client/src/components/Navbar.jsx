import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <a className="logo" href="/">CS Social</a>
      <ul className="nav-links">
        <Link to='/home'>Home</Link>
        <Link to='/messages'>Messages</Link>
      </ul>
    </nav>
  )
}

export default Navbar