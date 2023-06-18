import React from 'react'
import pfp from '../Navbar/pic.jpg'
import banner from './banner.jpg'
import './Dashboard.css'
import About from './About'
import Social from './Social'
import Rooms from './Rooms'
import Myposts from './Myposts'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useNavigate } from 'react-router-dom';

export default function Profile({ data, setData }) {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const [eData, seteData] = useState({ name: '', pfp: '', banner: '', bio: '', address: '', phone: '' })

    const handleChange = (e) => {

        seteData({ ...eData, [e.target.name]: e.target.value })
    }
    const saveChanges = async () => {


        console.log(data);
        setData(eData);
        console.log(eData);
        setShow(false);
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={localStorage.getItem('username')}
                                autoFocus
                                name='name'
                                onChange={handleChange}
                                value={eData.name}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control
                                type="file"

                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Cover Picture</Form.Label>
                            <Form.Control
                                type="file"

                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="profile-container">

                <div className="profile-section">
                    <div className="banner-img">
                        <img src={banner} alt="Banner" />
                    </div>
                    <div className="profile-picture">
                        <img src={pfp} alt="ProfilePicture" />
                    </div>

                </div>
                <div className="username">
                    <div className="texts" >
                        <div className="userhead">
                            <h3 className='usertext'>{data.name} </h3>
                            <i className="fa-solid fa-pen-to-square edit-user" onClick={handleShow}></i>
                        </div>
                        <h6>{data.role}</h6>
                    </div>
                </div>


                <About data={data} />
                <Social data={data} />
                <Rooms />
                <Myposts />



            </div>

        </div>
    )
}
