import React, { useState } from 'react';
import './Posts.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import axios from 'axios';


import storage from '../../firebaseConfig'

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import { LinearProgress } from '@mui/material';





function PostModal(props) {

  const [image, setImage] = useState(null);

  const [imageUploaded, setImageUploaded] = useState(0);

  const [heading, setHeading] = useState("");


  const handleSubmit = () => {
    let x = {
      owner: localStorage.getItem('userid'),
      title: heading,
      content: props.typing,
      likes: 0,
      image: image,
      time: new Date().toLocaleString(),
    }

    axios.post('http://localhost:5000/api/posts/createPost', x).then((res) => {
      if (res.data == "yes")
        alert("Post created successfully!");
      else
        alert("Some error occured!");
    })


  }


  const handleUpload = (file) => {
    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        if (percent === 100)
          setImageUploaded(0);

        else
          setImageUploaded(percent);
      },
      (err) => console.log(err),
      () => {


        getDownloadURL(uploadTask.snapshot.ref).then((url) => {

          setImage(url);

        });
      }
    );
  }

  const handleClose = () => props.onHide();

  const id = localStorage.getItem('userId');

  const checkData = async () => {
    props.setTyping(props.typing.length <= 0 ? " " : props.typing);
  }

  return (
    <Modal
      {...props} // array containing all the props passed to the component. (spread operator)
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <input style={{ width: '100%' }} onChange={(e) => {
            setHeading(e.target.value);
          }} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <input type="text" className='modal-input'
            placeholder='What do you want to talk about?'
            onChange={(event) => props.setTyping(event.target.value)}
            value={props.typing} />

          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>upload image here</Form.Label>
            <Form.Control style={{ display: `${imageUploaded === 0 ? 'block' : 'none'}` }}
              type="file"

              autoFocus

              onChange={(e) => {
                handleUpload(e.target.files[0]);
              }}
            />
            <LinearProgress style={{ display: `${imageUploaded !== 0 ? 'block' : 'none'}` }} variant="determinate" value={imageUploaded} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}> Close </Button>
        <Button onClick={() => {
          handleSubmit();
        }} disabled={props.typing.length === 0}>Post</Button> {/* props.onHide to be replaced by saveChanges after the functionality*/}
      </Modal.Footer>
    </Modal>
  );
}

export default function PostItem({ modalShow, setModalShow, typing, setTyping }) {
  return (
    <>
      <PostModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        valid={typing.length > 0 ? true : false}
        setTyping={setTyping}
        typing={typing}
      />
    </>
  );
}
