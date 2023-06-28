import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import './style.css'
import { UserContext } from '../UserContext/UserContext';

import { useNavigate } from 'react-router-dom';

export default function Cards({ name, bio, id, user, img }) {

  const [profilepic, setProfilepic] = useState(img);

  const navigate = useNavigate();
  const { setUserDetailsValue } = useContext(UserContext);

  const handleClick = () => {

    setUserDetailsValue(user);
    navigate('/profile');

  }
  return (
    <div>
      <Card style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.089)",width: '18rem', height: '17rem', margin: '20px', textAlign: 'center' }} className='col md-3'>
        {/* <Card.Img variant="top" src={profilepic} style={{ height: "15rem", overflow: "hidden" }} /> */}
        <div className="conatiner" style={{marginTop:"20px",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Avatar
          alt="profile"
          src={profilepic}
          sx={{ width: 100, height: 100 }}
          style={{border: "1px solid rgba(0, 0, 0, 0.5)"}}
        />
        </div>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {bio}
          </Card.Text>
          <Button variant="success sm" onClick={handleClick} style={{bottom: "10px", position: "absolute", left:"32%" }}>Visit Profile</Button>
        </Card.Body>
      </Card>
    </div>
  )
}
