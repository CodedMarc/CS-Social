import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Posts from './Posts';
import '../styles/Timeline.css'

const Timeline = () => {

  const [tlPosts, setPosts] = useState([]);

  const getPosts = async () => {
    const result = await axios.get('https://codesmith-social.herokuapp.com/posts')
    for (let i = result.data.length - 1; i >= 0; i --) {
      setPosts(oldArray => [...oldArray,  <Posts key={result.data[i]._id} name="Marc" _id={result.data[i].posterID} content={result.data[i].postContent} created_at={result.data[i].created_at}/>])
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div id="Timeline">
      {tlPosts}
    </div>
  )
}

export default Timeline;