import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import './Posts.scss'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostItem from './PostItem';
import PostCard from './PostTemplate';
import videoIcon from './images/video-icon.png';
import userIcon from './images/user.svg';

import PostTemplate from './PostTemplate';
import axios from 'axios';


export default function Posts() {

  const [index, setIndex] = useState(0);

  const [posts, setPosts] = useState([]);



  useEffect(() => {
    console.log(index);
    axios.post('http://localhost:5000/api/posts/getPosts', { index: index }).then((res) => {
      if (res.data == null) {
        alert("no posts yet");
      }
      else {
        setPosts(res.data);
      }
      setIndex(index + 1);
    })
  }, []);

  return (
    <>
      <Navbar />
      <div className="container" style={{ display: "flex", textAlign: "center", alignItems: "center", justifyContent: "center" }}>
        <div className="postInput"  style={{width:"100%"}}>
          <PostsAndDetails />

        </div>

      </div>
      <div className="posts" style={{ display: "flex", flexWrap: "wrap", textAlign: "center", justifyContent: "center", alignItems: "center" }}>
        {
          posts.map((post, index) => {
            return (
              <PostTemplate key={post._id} post={post} />
            )
          })
        }
        <button style={{ width: '60%', backgroundColor: 'white', border: '1px solid black' }} onClick={() => {
          axios.post('http://localhost:5000/api/posts/getPosts', { index: index }).then((res) => {
            setPosts((prev) => {
              return [...prev, ...res.data];
            });
            if (res.data.length)
              setIndex(index + 1);
          })
        }}>
          Load More .........
        </button>
      </div>
    </>
  )
}

function PostsAndDetails() {
  const [modalShow, setModalShow] = useState(false);
  const [typing, setTyping] = useState(''); // to check if user is typing or not.
  return (
    <Container>
      <div className='post-prompt' style={{ width: '100%' }}>
        <div className='post-prompt-text'>
          <img src={userIcon} alt="user-images" className="user-icon" />
          <button className='post-button' onClick={() => setModalShow(true)}>Start a Post</button>
        </div>
        <PostItem modalShow={modalShow} setModalShow={setModalShow} typing={typing} setTyping={setTyping} />
      </div>

    </Container>
  );
}
