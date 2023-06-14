import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import SignUp from './SignUp1';
import 'bootstrap/dist/css/bootstrap.min.css';
const SignIn = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  if (showSignUp) {
    return <SignUp />;
  }
  return (
    <Form style={formstyle}>
      <div className='newDivision' style={divstyle}>
        <Stack gap={2} className="col-md-3 mx-auto">

          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingInputCustom"
              type="number"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInputCustom">Mobile Number</label>
          </Form.Floating>

          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingPasswordCustom"
              type="password"
              placeholder="Password"
            />
            <label htmlFor="floatingPasswordCustom">Password</label>
          </Form.Floating>

          <Button variant="primary" type="submit" className='mb-3'>
            Login
          </Button>

          <center><p>
            New to FarmBank? &nbsp;
            <a style={anchor} onClick={() => { setShowSignUp(true) }}>Sign Up</a>
          </p></center>

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
const anchor = {
  cursor: 'pointer',
  color: 'blue purple',
}

export default SignIn
