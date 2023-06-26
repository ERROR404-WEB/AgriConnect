import React from 'react'
import './Dashboard.css'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function About({ data , setData,showEdit}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [eData, seteData] = useState({ bio: data.bio , address:data.address}); 


    const handleChange = (e) => {
            seteData({ ...eData, [e.target.name]: e.target.value })
    }

    const saveChanges = async () => {

        const response = await fetch('http://localhost:5000/api/auth/createuser/details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify(eData)
        })
        const data1 = await response.json();
        setData(data1.user);
        setShow(false);
    }

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
                                    name='bio'
                                    value={eData.bio}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Edit address"
                                    autoFocus
                                    name='address'
                                    value={eData.address}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={()=>{
                            saveChanges();
                            handleClose();
                        }}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="biotext">
                    <div className="headingusername">
                         <h6><b>About :</b></h6> 
                         {showEdit && <i className="fa-solid fa-pen-to-square edit-icon" onClick={handleShow}></i> }
                         </div>
                    <p>{data.bio}</p>
                    <h6><b>Address:</b></h6>
                    <p>  {data.address} </p>
                </div>
            </div>
        </div>
    )
}
