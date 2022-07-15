import React from 'react'
import Navbar from '../components/Navbar';
import '../styles/Home.css';
import '../styles/Messages.css';

const Messages = () => {
  return (
    <div id="Home">
      <Navbar />
      <h1 className="messages-coming-soon">http://localhost:8000/messages</h1>
    </div>
  )
}

export default Messages