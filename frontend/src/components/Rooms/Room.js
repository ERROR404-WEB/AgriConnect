import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './Rooms.css';
import { Button, TextField } from '@mui/material';
import { TextareaAutosize } from '@mui/material';
import Slider from "react-slick";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigatePreviosIcon from '@mui/icons-material/NavigateBefore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/fontawesome-free-solid';

import io from 'socket.io-client';



const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
        {...props}

    >
        <FontAwesomeIcon icon={faChevronLeft} style={{ color: 'black', fontSize: '2Vmin', }} />
    </button>
);
const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
        {...props}

    >
        <FontAwesomeIcon icon={faChevronRight} style={{ color: 'black', fontSize: '2vmin', }} />
    </button>
);


export default function Room() {

    const { id } = useParams();
    let userid = localStorage.getItem('userid');
    let role = localStorage.getItem('role');
    const [messages, setMessages] = useState([]);
    const [accepted_offers, setAccepted_offers] = useState([]);
    const [members, setMembers] = useState([]);
    const [text, setText] = useState('');
    const [share, setShare] = useState('');
    const [value, setValue] = useState('');
    const [admin, setAdmin] = useState('');
    const [defined, setDefined] = useState(false);
    const [socket, setSocket] = useState(null);
    const ref = useRef(null);




    const settings = {
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SlickArrowRight />,
        prevArrow: <SlickArrowLeft />,
    };



    const fun1 = (message) => {
        setMessages((prev) => {
            return [...prev, message];
        })
    }




    useEffect(() => {
        const socket1 = io('http://localhost:5000');
        setSocket(socket1);
        axios.post('http://localhost:5000/api/rooms/getRoomDetails', { id: id }).then((res) => {
            console.log(res.data);
            setAdmin(res.data.admin);
            setMessages(res.data.messages);
            setAccepted_offers(res.data.accepted_offers);
            setMembers(res.data.members);
            console.log(res.data.accepted_offers);
            //ref.current.scrollToTop();
        }).catch((err) => {
            console.log(err);
        })


        socket1.emit('joinRoom', id);

        console.log("vacchindhi");

        socket1.on('receive message', (message) => {
            console.log(message);
            fun1(message);
        }
        );

        socket1.on('disconnect', () => {
            console.log('disconnected');
        }
        );

        socket1.on('receive accepted offer', (req) => {
            setAccepted_offers((prev) => {
                return [...prev, req.offer];
            })
            setMessages((prev) => {
                prev[req.index].accepted = true;
                return prev;
            }
            )
        }
        );

        socket1.on('receive reject offer', (req) => {

            console.log(req);

            setAccepted_offers((prev) => {
                let prev1 = [...prev];
                prev1.splice(req.index2, 1);
                return prev1;
            }
            );

            setMessages((prev) => {
                prev[req.index1].accepted = false;
                return prev;
            }
            )

        }
        );


        return () => {
            socket1.disconnect();
        }


    }, [])



    return (
        <div>
            <Navbar />
            <div className='outerRoom'>
                <div className='Room'>
                    <div className='accepetedAndAddOffers'>




                        <div className='acceptedOffers'>

                            {
                                accepted_offers.length ?

                                    accepted_offers.length == 1 ?

                                        <div style={{ height: '90%', width: '90%', display: 'flex', justifyContent: 'center' }}>
                                            <div className='offer' style={{ height: 'fit-content', width: '80%', border: '1px solid black', borderRadius: '10px', padding: '2%' }}>
                                                <div className='offerHeader'>
                                                    <img style={{ height: '4vh', width: '4vh', borderRadius: '50%' }} src={accepted_offers[0].sender.profilepic} />
                                                    <h3>{accepted_offers[0].sender.name}</h3>
                                                </div>
                                                <div className='offerBody'>
                                                    <hr />
                                                    <h4>share: {accepted_offers[0].share}</h4>
                                                    <h4>amount: {accepted_offers[0].amount}</h4>
                                                    <hr />
                                                </div>
                                                <div className='offerFooter'>
                                                    <h5>{accepted_offers[0].date}</h5>
                                                </div>
                                                {
                                                    admin._id == userid ?
                                                        <Button style={{ backgroundColor: 'red', fontSize: '3Vmin', width: '100%', color: 'white' }} onClick={() => {
                                                            axios.post('http://localhost:5000/api/rooms/rejectOffer', {
                                                                roomId: id,
                                                                offerId: accepted_offers[0]._id,
                                                                index: accepted_offers[0].index,
                                                            }).then((res) => {

                                                                socket.emit('rejectTheOffer', {
                                                                    roomId: id,
                                                                    index1: accepted_offers[0].index,
                                                                    index2: 0,
                                                                })

                                                            }
                                                            ).catch((err) => {
                                                                console.log(err);
                                                            }
                                                            )

                                                        }}>Reject offer</Button> :
                                                        null
                                                }
                                            </div>
                                        </div>

                                        :

                                        <Slider {...settings} style={{ height: '90%', width: '90%' }}>
                                            {

                                                accepted_offers.map((offer, i) => {
                                                    return (
                                                        <div key={i} className='offer' style={{ height: '80%', width: '80%', border: '1px solid black', borderRadius: '10px', padding: '2%' }}>
                                                            <div className='offerHeader'>
                                                                <img style={{ height: '4vh', width: '4vh', borderRadius: '50%' }} src={offer.sender.profilepic} />
                                                                <h3>{offer.sender.name}</h3>
                                                            </div>
                                                            <div className='offerBody'>
                                                                <hr />
                                                                <h4>share: {offer.share}</h4>
                                                                <h4>amount: {offer.amount}</h4>
                                                                <hr />
                                                            </div>
                                                            <div className='offerFooter'>
                                                                <h5>{offer.date}</h5>
                                                            </div>
                                                            {
                                                                admin._id == userid ?
                                                                    <Button style={{ backgroundColor: 'red', fontSize: '3Vmin', width: '100%', color: 'white' }} onClick={() => {
                                                                        axios.post('http://localhost:5000/api/rooms/rejectOffer', {
                                                                            roomId: id,
                                                                            offerId: offer._id,
                                                                            index: offer.index
                                                                        }).then((res) => {


                                                                            socket.emit('rejectTheOffer', {
                                                                                roomId: id,
                                                                                index1: offer.index,
                                                                                index2: i
                                                                            })

                                                                            alert("offer rejected");


                                                                        }
                                                                        ).catch((err) => {
                                                                            console.log(err);
                                                                        }
                                                                        )

                                                                    }}>Reject offer</Button> :
                                                                    null
                                                            }
                                                        </div>
                                                    )
                                                }
                                                )
                                            }
                                        </Slider>

                                    :

                                    <h1>no offers accepted</h1>


                            }
                        </div>


                        <div className='addOffer'>
                            <TextField label="share" value={share} onChange={(e) => setShare(e.target.value)} style={{ marginBottom: '2%', width: '100%' }} type='number' />
                            <TextField label="amount" value={value} onChange={(e) => { setValue(e.target.value) }} type='number' style={{ width: '100%', marginBottom: '2%' }} />
                            <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Message" style={{ width: '100%', marginBottom: '2%' }} value={text} onChange={(e) => setText(e.target.value)} />
                            <Button style={{ backgroundColor: 'rgb(0, 255, 38)', color: 'white', width: '100%', marginTop: '1%' }} onClick={() => {
                                axios.post('http://localhost:5000/api/rooms/addMessage', {
                                    roomId: id,
                                    message: {
                                        sender: userid,
                                        share: share,
                                        amount: value,
                                        message: text,
                                        date: new Date().toLocaleString(),
                                        accepted: false,
                                    }
                                }).then((res) => {



                                    socket.emit('sendMessage', {
                                        roomId: id,
                                        message: {
                                            sender: userid,
                                            share: share,
                                            amount: value,
                                            message: text,
                                            date: new Date().toLocaleString(),
                                            accepted: false,
                                        }
                                    })

                                    alert("message sent");



                                }).catch((err) => {
                                    console.log(err);
                                })
                            }
                            }>send</Button>
                        </div>



                    </div>
                    <div className='offers' ref={ref}>
                        {
                            messages.map((message, i) => {
                                return (

                                    <div key={i} className='offer' style={{ alignSelf: message.sender._id == userid ? "start" : "end" }}>
                                        <div className='offerHeader'>
                                            <img style={{ height: '4vh', width: '4vh', borderRadius: '50%' }} src={message.sender.profilepic} />
                                            <h3>{message.sender.name}</h3>
                                        </div>
                                        <div className='offerBody'>
                                            <hr />
                                            <h4>share: {message.share}</h4>
                                            <h4>amount: {message.amount}</h4>
                                            <hr />
                                        </div>
                                        <div className='offerFooter'>
                                            <p>{message.message}</p>
                                            <h5>{message.date}</h5>
                                        </div>
                                        {
                                            userid == admin._id && !message.accepted && userid != message.sender._id ? <Button style={{ backgroundColor: 'blue', color: 'white', width: '100%', marginTop: '3%' }} onClick={(e) => {
                                                e.preventDefault();
                                                axios.post('http://localhost:5000/api/rooms/acceptOffer', {
                                                    roomId: id,
                                                    message: {
                                                        sender: message.sender._id,
                                                        share: message.share,
                                                        amount: message.amount,
                                                        date: new Date().toLocaleString(),
                                                        index: i,
                                                    }
                                                }).then((res) => {

                                                    socket.emit('acceptTheOffer', {
                                                        roomId: id,
                                                        index: i,
                                                        offer: {
                                                            sender: {
                                                                _id: message.sender._id,
                                                                name: message.sender.name,
                                                                profilepic: message.sender.profilepic,
                                                                email: message.sender.email,
                                                            },
                                                            share: message.share,
                                                            amount: message.amount,
                                                            date: message.date,
                                                        }
                                                    });


                                                    alert("offer accepted");


                                                }).catch((err) => {
                                                    console.log(err);
                                                })
                                            }
                                            }>accept</Button> : null
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}