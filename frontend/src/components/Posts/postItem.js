import React from 'react';
import './Posts.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function AddNewPost(props)
{
  // post button functionality;
}
function PostModal(props) {
  const handleClose = () => props.onHide();
  const checkData = async () => {
    props.setTyping(props.typing.length <= 0? " " : props.typing);
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
                type="file" id = "image"  autoFocus
                onChange={checkData}
                />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}> Close </Button>
    <Button onClick={AddNewPost(props)} disabled={props.typing.length === 0}>Post</Button> {/* props.onHide to be replaced by saveChanges after the functionality*/}
      </Modal.Footer>
    </Modal>
  );
}

export default function PostItem({modalShow, setModalShow, typing, setTyping}) {
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
