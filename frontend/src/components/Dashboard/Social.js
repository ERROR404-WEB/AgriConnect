import React from 'react'
import Whatsapp from './Whatsapp.png'
import Facebook from './Facebook.png'
import Instagram from './Instagram.png'
import Telegram from './Telegram.png'
import gmail from './gmail.png'
import './Dashboard.css'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function Social() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Social Links</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Facebook</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Edit Facebook link"
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Instagram</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Edit instagram link"
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Gmail</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Edit email link"
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Whatsapp</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="Edit whatsapp number"
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Telegram</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Edit telegram link"
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
            <div className="contact">

                <div className="social">
                    <h6><b>Social:</b></h6>
                    <i className="fa-solid fa-pen-to-square edit-icon" onClick={handleShow}></i>
                </div>
                <div className="contact-icons">
                    <a href="/" target="__blanck" ><img src={Whatsapp} alt="whatsapp" className='social-icon' /></a>
                    <a href="/" target="__blanck" ><img src={Facebook} alt="facebook" className='social-icon' /></a>
                    <a href="/" target="__blanck" ><img src={gmail} alt="Gmail" className='social-icon' /></a>
                    <a href="/" target="__blanck" ><img src={Instagram} alt="Instagram" className='social-icon' /></a>
                    <a href="/" target="__blanck" ><img src={Telegram} alt="Telegram" className='social-icon' /></a>
                </div>
            </div>
        </div>
    )
}
