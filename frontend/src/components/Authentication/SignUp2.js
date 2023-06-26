import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sign.css';
import Navbar from '../Landing/LandingNav';
import signup1 from './signup2.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';

const SignUp2 = () => {
  const [formData, setFormData] = useState({ name: '', role: 'User', email: '', address: '', city: '', state: '', pincode: '' });
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signup1');
    }
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleClick = async (e) => {
    e.preventDefault();

    if (formData.name.length === 0) {
      alert("Enter a valid name");
    }
    else if (formData.email.length === 0) {
      alert("Enter a valid email");
    }
    else if (formData.address.length === 0) {
      alert("Enter a valid address");
    }
    else if (formData.city.length === 0) {
      alert("Enter a valid city");
    }
    else if (formData.state.length === 0) {
      alert("Enter a valid state");
    }
    else if (formData.pincode.length !== 6) {
      alert("Enter a valid pincode");
    }
    else if (formData.role.length === 0) {
      alert("Enter a valid role");
    }
    else {
      setProgress(30);
      const res = await fetch('http://localhost:5000/api/auth/createuser/details',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({ name: formData.name, role: formData.role, email: formData.email, address: formData.address, city: formData.city, state: formData.state, pincode: formData.pincode })
        });
      setProgress(70);
      const data = await res.json();
      setProgress(100);
      console.log(data);
      navigate('/dashboard');
    }

  }
  return (
    <>
      <Navbar />
      <LoadingBar
        color='#00ff15'
        progress={progress}

        onLoaderFinished={() => setProgress(0)}
      />
      <img src={signup1} alt="signup1" className='bg2' />

      <div className="heading2">

      </div>
      <Form style={formstyle} className='form'>
        <div className='newDivision' style={divstyle}>
          <Stack gap={2} className="col-md-6 mx-auto">
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name"
                  value={formData.name}
                  onChange={onChange}
                  name='name'
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Select Role</Form.Label>
                <Form.Select value={formData.role} onChange={onChange} name='role'>
                  <option value="User">User</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Investor">Investor</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name='email' value={formData.email} onChange={onChange} />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="Enter Address" value={formData.address} name='address' onChange={onChange} />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control value={formData.city} name='city' onChange={onChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control value={formData.state} name='state' onChange={onChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control value={formData.pincode} name='pincode' onChange={onChange} />
              </Form.Group>
            </Row>

            <Button variant="success" style={{ backgroundColor: " #00ff15", outline: "none", border: "none" }} type="submit" onClick={handleClick}>
              SignUp
            </Button>
          </Stack> </div>
      </Form>
    </>
  )
}

const formstyle = {
  // border: '1px solid grey',
  paddingTop: '20px',
  paddingBottom: '20px',
  borderRadius: '10px',
  // marginLeft: '5%',

}
const divstyle = {
  // marginLeft: '5%',

  paddingTop: '20px',
  paddingBottom: '20px',
}

export default SignUp2
