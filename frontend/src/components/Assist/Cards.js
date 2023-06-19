import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './style.css'
import { UserContext } from '../UserContext/UserContext';

import { useNavigate } from 'react-router-dom';

export default function Cards({name,bio,id,user}) {
  
  const navigate = useNavigate();
  const { setUserDetailsValue } = useContext(UserContext);
  
  const handleClick = () => {

    setUserDetailsValue(user);
    navigate('/profile');
     
  }
  return (
    <div>
      <Card style={{ width: '18rem' , height:'12rem' ,margin:'20px',textAlign:'center'}} className='col md-3'>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>    
       {bio}
        </Card.Text>
        <Button variant="primary sm" onClick={handleClick}>View More</Button>
      </Card.Body>
    </Card>
    </div>
  )
}
