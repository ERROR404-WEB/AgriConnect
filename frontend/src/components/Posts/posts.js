import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import './Posts.scss'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostItems from './postItem';


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
            <button className='post-button' onClick={() => setModalShow(true)}>Start a Post</button>
            <PostItems modalShow={modalShow} setModalShow={setModalShow} typing={typing} setTyping={setTyping}/>
          </div>
        </Col>
        <Col>This Part is for Friend Suggestions etc..</Col>
      </Row>
    </Container>
  );
}