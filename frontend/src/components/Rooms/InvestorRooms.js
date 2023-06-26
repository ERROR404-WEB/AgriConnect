import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import './Rooms.css';
import { Box, Grid,Modal } from '@mui/material';
import {Button} from '@mui/material';


export default function InvestorRoom() {

    const [rooms, setRooms] = useState([]);
    const [open, setOpen] = useState(false);
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();
    let InvesotrId = localStorage.getItem("userid");


    useEffect(() => {
        axios.get('http://localhost:5000/api/rooms/getRooms').then(res => {
            setRooms(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])


    return (
        <div>
            <Navbar />
            <Modal open={open} onClose={()=>{setOpen(false)}}>
                <div className='joinRoomModal'>
                    <h4>are you sure you want to join the room . because once you entered the room you cannot quit the room .</h4>
                    <Button style={{backgroundColor:'#3EC70B',fontSize:'3Vmin',color:'white'}} onClick={()=>{
                        axios.post('http://localhost:5000/api/rooms/addMember',{roomId:roomId,memberId:InvesotrId}).then(res=>{
                            alert(res.data);
                        }).catch(err=>{
                            alert("oops some error occured . please try again later");
                            window.location.reload();
                        })
                    }}>yes , join</Button>
                </div>
            </Modal>
            <div style={{ height: '100%', width: '100%', overflowY: 'scroll' }}>
                <Box sx={{ flexGrow: 1, p: 2 }}>
                    <Grid
                        container
                        spacing={2}
                    >
                        {
                            rooms.map((room, i) => {
                                return (
                                    <Grid key={i} {...{ xs: 6, sm: 6, md: 4, lg: 3 }} minHeight={160} style={{ padding: '1%' }}>
                                        <div style={{ height: '100%', width: '100%', border: '1px solid black', borderRadius: '10px' }}>

                                            <img src={room.img} style={{ height: '10Vmax', width: '100%', borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }} />


                                            <div style={{ height: 'fit-content', width: '100%', padding: '2%' }}>
                                                <div>
                                                    <h2>{room.name}</h2>
                                                    <p style={{ color: '#B2B2B2' }}>{room.description}</p>
                                                    <span>share : <span style={{ color: '#B2B2B2' }}>{room.share}</span></span>
                                                    <br />
                                                    <span>amount : <span style={{ color: '#B2B2B2' }}>{room.value}</span></span>
                                                </div>

                                                {
                                                    room.members.includes(InvesotrId) ?
                                                        <Button style={{backgroundColor:'#0079FF',color:'white',fontSize:'2Vmin'}} onClick={() => { navigate(`/room/${room._id}`) }}>Enter Room</Button>
                                                        :
                                                        <Button style={{backgroundColor:'#3EC70B',color:'white',fontSize:'2Vmin'}} onClick={()=>{
                                                            setOpen(true);
                                                            setRoomId(room._id);
                                                        }} >Join Room</Button>
                                                }

                                                
                                            </div>
                                        </div>
                                    </Grid>
                                )
                            }
                            )
                        }

        

                    </Grid>



                </Box>

            </div>
        </div>
    )
}