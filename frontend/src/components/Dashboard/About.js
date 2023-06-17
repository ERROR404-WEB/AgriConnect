import React from 'react'
import './Dashboard.css'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function About({ data }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <div className="bio my-5">
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Bio</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>About</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Edit about"
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Edit address"
                                    autoFocus
                                />
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="biotext">
                    <div className="headingusername">
                        <h6><b>About :</b></h6> <i className="fa-solid fa-pen-to-square edit-icon" onClick={handleShow}></i></div>
                    <p>{data.bio}</p>
                    <h6><b>Address:</b></h6>
                    <p>  {data.address} </p>
                </div>
            </div>
        </div>
    )
}
