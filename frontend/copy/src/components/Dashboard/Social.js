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

export default function Social({data, setData,showEdit}) {

    const [show, setShow] = useState(false);
    const [eData, seteData] = useState({ fb: data.fb , insta:data.insta, gmail:data.gmail, whatsapp:data.whatsapp, telegram:data.telegram});

    const handleChange = (e) => {
            seteData({ ...eData, [e.target.name]: e.target.value })
    }

    const saveChanges = async () => {
        //console.log(eData);

        const response = await fetch('http://localhost:5000/api/auth/createuser/details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(eData)
        })
        const data1 = await response.json();
        if(data1.success===true){
            setData(data1.user);
        }
        setShow(false);
    }


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
                                name='fb'
                                value={eData.fb}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Instagram</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Edit instagram link"
                                autoFocus
                                name='insta'
                                value={eData.insta}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Gmail</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Edit email link"
                                autoFocus
                                name='gmail'
                                value={eData.gmail}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Whatsapp</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Edit whatsapp number"
                                autoFocus
                                name='whatsapp'
                                value={eData.whatsapp}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Telegram</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Edit telegram link"
                                autoFocus
                                name='telegram'
                                value={eData.telegram}
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
            <div className="contact">

                <div className="social">
                    <h6><b>Social:</b></h6>
                   {showEdit && <i className="fa-solid fa-pen-to-square edit-icon" onClick={handleShow}></i>}
                </div>
                <div className="contact-icons">
                    {data.whatsapp &&
                    <img src={Whatsapp} alt="whatsapp" className='social-icon' onClick={()=>{
                        window.open(`${data.whatsapp}`, '_blank');
                    }}/>
                    }
                    {data.fb &&
                    <img src={Facebook} alt="facebook" className='social-icon' onClick={()=>{
                        window.open(`${data.fb}`, '_blank');
                    }}/>
                    }
                    {data.gmail &&
                    <img src={gmail} alt="Gmail" className='social-icon' onClick={()=>{
                        window.open(`mailto:${data.gmail}`, '_blank');
                    }}/>
                    }
                    {data.insta &&
                    <img src={Instagram} alt="Instagram" className='social-icon' onClick={()=>{
                        window.open(`${data.insta}`, '_blank');
                    }}/>
                    }
                    {data.telegram &&
                    <img src={Telegram} alt="Telegram" className='social-icon' onClick={()=>{
                        window.open(`${data.telegram}`, '_blank');
                    }}/>
                    }

                    {
                        !data.whatsapp && !data.fb && !data.gmail && !data.insta && !data.telegram && <p>No social links added</p>
                    }
                </div>
            </div>
        </div>
    )
}
