import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import './Posts.scss'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostItem from './PostItem';
import PostCard from './PostTemplate';
import videoIcon from './images/video-icon.png';
import userIcon from './images/user.svg';
import photoIcon from './images/photo-icon.svg';
import articleIcon from './images/event-icon.png';
import Form from 'react-bootstrap/Form';



export default function Posts() {
  return (
    <>
      <Navbar />
      <PostsAndDetails/>
    </>
  )
}

function PostsAndDetails() {
  const [modalShow, setModalShow] = useState(false);
  const [typing, setTyping] = useState(''); // to check if user is typing or not.
  return (
    <Container>
      <Row>
        <Col xs={9} md={9} lg={9} xxl={9}>
          <div className='post-prompt'>
            <div className='post-prompt-text'>
              <img src = {userIcon} alt = "user-image" className="user-icon"/>
              <button className='post-button' onClick={() => setModalShow(true)}>Start a Post</button>
            </div>
            <div className='post-icons'>
              <button className='icon-grp' onClick={() => setModalShow(true)}>
                <img src = {photoIcon} alt = "photo-icon" className="icon"/>
                <span>Photo</span>
              </button>
              <button className='icon-grp' onClick={() => setModalShow(true)}>
                <img src = {videoIcon} alt = "video-icon" className="icon"/>
                <span>Video</span>
              </button>
              <button className='icon-grp' onClick={() => setModalShow(true)}>
                <img src = {articleIcon} alt = "article-icon" className="icon"/>
                <span>Article</span>
              </button>
            </div>
            <PostItem modalShow={modalShow} setModalShow={setModalShow} typing={typing} setTyping={setTyping}/>
          </div>
        </Col>
        <Col><PostCard image = {photoIcon} textdata={"hello "} /></Col>
      </Row>
    </Container>
  );
}