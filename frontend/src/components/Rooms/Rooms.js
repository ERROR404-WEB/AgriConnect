import React from 'react'
import Navbar from '../Navbar/Navbar'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Button, TextField, colors } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@mui/material';
import './Rooms.css';
import leftimg from './left.png';
import rightimg from './right.svg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Fab from '@mui/material/Fab';
export default function Rooms() {

  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [share, setShare] = useState('');
  const [value, setValue] = useState('');
  const [img, setImg] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.post('http://localhost:5000/api/rooms/getMyRooms', { id: localStorage.getItem('userid') })
      .then(res => {
        setRooms(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])




  return (
    <>
      <Navbar />

      <div className='background'>

        <div style={{ height: '100%', width: '100%', overflowY: 'scroll' }}>


          <Modal open={open} onClose={() => { setOpen(false) }}>
            <div className='createRoom'>
              <TextField label="name" value={name} onChange={(e) => setName(e.target.value)} style={{ marginBottom: '2%', width: '100%' }} />
              <TextField label="description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ marginBottom: '2%', width: '100%' }} />
              <TextField label="image" value={img} onChange={(e) => setImg(e.target.value)} style={{ marginBottom: '2%', width: '100%' }} />
              <TextField label="share" value={share} onChange={(e) => setShare(e.target.value)} style={{ marginBottom: '2%', width: '100%' }} type='number' />
              <TextField label="amount" value={value} onChange={(e) => { setValue(e.target.value) }} type='number' style={{ width: '100%' }} />

              <Button style={{ backgroundColor: 'rgb(0, 255, 38)', color: 'white', width: '100%', marginTop: '3%' }} onClick={() => {
                axios.post('http://localhost:5000/api/rooms/createRoom', { name: name, description: description, img: img, admin: localStorage.getItem('userid'), share: share, value: value, value: value })
                  .then(res => {
                    alert(res.data);
                    window.location.reload();
                  })
                  .catch(err => {
                    console.log(err);
                  })
              }
              }><h4>Create room</h4></Button>
            </div>
          </Modal>


          <div className="btncontainer">

            <Button variant="contained"
              className='createbtn'
              onClick={() => { setOpen(true) }}>

              Create new room

            </Button>
            {rooms.length !== 0 && <div className="floating-icon">
              <Fab variant="extended" style={{ backgroundColor: "rgb(0, 255, 38)", color: "white" }} onClick={() => {
                window.scrollBy({
                  top: window.innerHeight * 0.5,
                  behavior: 'smooth'
                });
              }
              }>
                <KeyboardArrowDownIcon sx={{ mr: 1 }} style={{ color: "white" }} />
                Rooms
              </Fab>

            </div>}

          </div>


        </div>
      </div>
      <div className="rooms-container" style={{ height: '100%', width: '100%', overflowY: 'scroll' }}>


        {rooms.length === 0 && <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button variant="contained" style={{ backgroundColor: "rgb(0, 255, 38)", margin: "20px" }}>
            No Rooms to display
          </Button>
        </div>}

          <div className="cards" >
        {

          rooms.map((room, i) => {
            return (

              <div style={{ height: '22rem', width: '100%', border: '1px solid black', borderRadius: '10px',margin:"20px" }}>

                <img src={room.img} alt="rooms" style={{ height: '10Vmax', width: '100%', borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }} />


                <div style={{ height: 'fit-content', width: '100%', padding: '2%' }}>
                  <div>
                    <h2>{room.name}</h2>
                    <p style={{ color: '#B2B2B2' }}>{room.description}</p>
                    <span>share : <span style={{ color: '#B2B2B2' }}>{room.share}</span></span>
                    <br />
                    <span>amount : <span style={{ color: '#B2B2B2' }}>{room.value}</span></span>
                  </div>


                  {room.status === 0 && <Button style={{bottom:"0", padding: '3%', backgroundColor: '#8EAC50', marginTop: '3%', color: 'white' }} onClick={() => {
                    axios.post('http://localhost:5000/api/rooms/activateRoom', { id: room._id })
                      .then(res => {
                        window.location.reload();
                      })
                      .catch(err => {
                        console.log(err);
                      })
                  }}>Activate room</Button>}
                  {room.status === 1 && <Button style={{ bottom:"0",padding: '3%', backgroundColor: "rgb(0, 255, 38)", marginTop: '3%', color: 'white' }} onClick={() => {
                    navigate(`/room/${room._id}`);
                  }}>Go to room</Button>}
                </div>
              </div>

            )
          }

          )
        }
        </div>
      </div>



    </>
  )
}
