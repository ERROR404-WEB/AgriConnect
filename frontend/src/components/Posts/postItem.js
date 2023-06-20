import React from 'react';
import './Posts.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function PostModal(props) {
  const handleClose = () => props.onHide();
  const checkData = async () => {
    props.setTyping(props.typing.length <= 0? " " : props.typing);
  }
  const saveChanges = async () => {
    // for the backend part...
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
          Create a Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <input type = "text" className='modal-input' 
          placeholder='What do you want to talk about?'
          onChange={(event) => props.setTyping(event.target.value)}
          value = {props.typing}/>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className = 'modal-file-input'>Upload a File</Form.Label>
                <Form.Control
                type="file"   autoFocus
                onChange={checkData}
                />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}> Close </Button>
    <Button onClick={props.onHide} disabled={props.typing.length > 0 ? false : true}>Post</Button> {/* props.onHide to be replaced by saveChanges after the functionality*/}
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
