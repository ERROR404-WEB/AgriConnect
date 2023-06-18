import React from 'react';
import './Posts.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PostModal(props) {
  return (
    <Modal
      {...props} // array containing all the props passed to the component. (spread operator)
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create a Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input className='modal-input' 
        placeholder='What do you want to talk about?'
        onChange={(event) => props.setTyping(event.target.value)}
        value = {props.typing}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} disabled={props.typing.length > 0 ? false : true}>Post</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function PostItems({modalShow, setModalShow, typing, setTyping}) {
  return (
    <>
      <PostModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        valid = {typing.length > 0 ? true : false}
        setTyping = {setTyping}
        typing = {typing}
      />
    </>
  );
}
