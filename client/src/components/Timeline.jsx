import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Posts from './Posts';
import '../styles/Timeline.css'

const Timeline = (props) => {
  const { currentUser } = props;
  const [tlPosts, setPosts] = useState([]);
  const [postMessage, setPostMessage] = useState('');

  // DISPLAY ALL POSTS ON TIMELINE
  const getPosts = async () => {
    // CHANGE IN PROD/DEV
    const result = await axios.get('https://codesmith-social.herokuapp.com/posts')
    for (let i = result.data.length - 1; i >= 0; i --) {
      setPosts(oldArray => [...oldArray,  <Posts key={result.data[i]._id} _id={result.data[i].posterID} content={result.data[i].postContent} created_at={result.data[i].created_at}/>])
    }
  }
  // SEND A POST TO DISPLAY
  const sendPosts = async () => {
    await axios.post('https://codesmith-social.herokuapp.com/posts', {
      posterID: currentUser._id,
      postContent: postMessage,
    })
    setPostMessage('');
    window.location.assign('/');
  }

  // INPUT CHANGE
  const handleChange = (e) => {
    setPostMessage(e.target.value);
  }
  // load posts on component load
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div id="Timeline">
      <div className="postBox">
        <input onChange={handleChange}type="text" placeholder="What's on your mind?" />
        <button onClick={sendPosts}>Post</button>
      </div>
      {tlPosts}
    </div>
  )
}

export default Timeline;