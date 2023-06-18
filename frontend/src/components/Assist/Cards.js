import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './style.css'
export default function Cards() {
  return (
    <div>
      <Card style={{ width: '18rem' ,margin:'20px',textAlign:'center'}} className='col md-3'>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>User Name </Card.Title>
        <Card.Text>    
        User Bio
        </Card.Text>
        <Button variant="primary sm">View More</Button>
      </Card.Body>
    </Card>
    </div>
  )
}
