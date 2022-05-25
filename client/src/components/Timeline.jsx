import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Posts from './Posts';
import '../styles/Timeline.css'

const Timeline = () => {

  const [tlPosts, setPosts] = useState([]);

  const getPosts = async () => {
    const result = await axios.get('http://localhost:8000/posts')
    result.data.forEach(el => {
      setPosts(oldArray => [...oldArray,  <Posts key={el._id} name="Marc" _id={el.posterID} content={el.postContent} created_at={el.created_at}/>])
    })
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