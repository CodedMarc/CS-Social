import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/posts.css';

// GET USERS HERE TO EXTRACT ID TO BE USER NAME AND PROFILE PIC

const Posts = (props) => {
  const [users, setUsers] = useState({});
  const { _id, content, created_at, user, postId } = props;
  const timestamp = new Date(created_at).toUTCString();

  const getPostCreator = async () => {
    try {
      const result = await axios.get(`/user/${_id}`);
      // console.log(result.data);
      setUsers(result.data);
    }
    catch(err) {
      console.log('ERR GETTING USER: ', err);
    }
  }
  const deletePost = async () => {
    await axios.delete(`/posts/${postId}`)
    .then(window.location.reload())
  }

  useEffect(() => {
    getPostCreator();
  }, [])

  return (
    <div id="POST">
      <img className="pp" alt="profile pic" src={users.imgURL} />
      <p className="userName">{users.username ? users.username : users.name}</p>
      <p className="postContent">{content}</p>
      <p className="timestamp">{timestamp}</p>
      <i onClick={deletePost} class="fa fa-trash" aria-hidden="true"></i>
    </div>
  )
}

export default Posts