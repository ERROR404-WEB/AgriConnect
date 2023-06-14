import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
const SignUp2 = () => {
  return (
    
    <Form style={formstyle}>
        <div className='newDivision' style={divstyle}>
      <Stack gap={2} className="col-md-6 mx-auto">
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Select Role</Form.Label>
        <Form.Select>
          <option>User</option>
          <option>Farmer</option>
          <option>Investor</option>
        </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City/District</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Control/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        SignUp
      </Button>
      </Stack> </div>
    </Form>
  )
}

const formstyle = {
    // border: '1px solid grey',
    paddingTop: '20px',
    paddingBottom: '20px',
    borderRadius: '10px',
    marginLeft: '5%',
    marginRight: '5%',
}
const divstyle = {
    marginLeft: '5%',
    marginRight: '5%',
    paddingTop: '20px',
    paddingBottom: '20px',
}

export default SignUp2
