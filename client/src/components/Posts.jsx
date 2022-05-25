import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/posts.css';

// GET USERS HERE TO EXTRACT ID TO BE USER NAME AND PROFILE PIC

const Posts = (props) => {
  const [users, setUsers] = useState({});
  const { _id, name, content, created_at} = props;
  const timestamp = new Date(created_at).toUTCString();

  const getPostCreator = async () => {
    try {
      const result = await axios.get(`https://codesmith-social.herokuapp.com/user/${_id}`);
      setUsers(result.data);
    }
    catch(err) {
      console.log('ERR GETTING USER: ', err);
    }
  }

  useEffect(() => {
    getPostCreator();
  }, [])

  return (
    <div id="POST">
      <img className="pp" alt="profile pic" src={users.imgURL} />
      <p className="userName">{name}</p>
      <p className="postContent">{content}</p>
      <p className="timestamp">{timestamp}</p>
    </div>
  )
}

export default Posts