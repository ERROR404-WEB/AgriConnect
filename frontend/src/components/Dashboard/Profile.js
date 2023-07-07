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
import { LinearProgress } from '@mui/material'


import { useNavigate } from 'react-router-dom';


import storage from '../../firebaseConfig'

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'



export default function Profile({ data, setData, showEdit }) {
    const [show, setShow] = useState(false);
    console.log(data);
    const [eData, seteData] = useState({ name: data.name, profilepic: data.profilepic, bannerpic: data.bannerpic });
    const [profilepicUploaded, setProfilepicUploaded] = useState(0);
    const [bannerpicUploaded, setBannerpicUploaded] = useState(0);


    const handleUpload2 = (file) => {
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
                    setBannerpicUploaded(0);

                else
                    setBannerpicUploaded(percent);
            },
            (err) => console.log(err),
            () => {


                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    seteData({ ...eData, bannerpic: url });
                });
            }
        );
    };


    const handleUpload1 = (file) => {
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
                    setProfilepicUploaded(0);

                else
                    setProfilepicUploaded(percent);


            },
            (err) => console.log(err),
            () => {


                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    seteData({ ...eData, profilepic: url });
                });
            }
        );
    };





    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

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
            body: JSON.stringify(eData),
        })
        const data1 = await response.json();
        setData(data1.user);
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
                            <Form.Control style={{ display: `${profilepicUploaded === 0 ? 'block' : 'none'}` }}
                                type="file"

                                autoFocus

                                onChange={(e) => {
                                    handleUpload1(e.target.files[0]);
                                }}
                            />
                            <linearProgress style={{ display: `${profilepicUploaded !== 0 ? 'block' : 'none'}` }} variant="determinate" value={profilepicUploaded} />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Cover Picture</Form.Label>
                            <Form.Control style={{ display: `${bannerpicUploaded === 0 ? 'block' : 'none'}` }}
                                type="file"

                                autoFocus

                                onChange={(e) => {
                                    handleUpload2(e.target.files[0]);
                                }}
                            />
                            <LinearProgress style={{ display: `${bannerpicUploaded !== 0 ? 'block' : 'none'}` }} variant="determinate" value={bannerpicUploaded} />
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
                        <img src={data.bannerpic} alt="Banner" />
                    </div>
                    <div className="profile-picture">
                        <img src={data.profilepic} alt="ProfilePicture" />
                    </div>

                </div>
                <div className="username">
                    <div className="texts" >
                        <div className="userhead">
                            <h3 className='usertext'>{data.name} </h3>
                            {showEdit && <i className="fa-solid fa-pen-to-square edit-user" onClick={handleShow}></i>}
                        </div>
                        <h6>{data.role}</h6>
                    </div>
                </div>


                <About data={data} setData={setData} showEdit={showEdit} />
                <Social data={data} setData={setData} showEdit={showEdit} />
                <Rooms />
                <Myposts />



            </div>

        </div>
    )
}