import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import SignIn from './SignIn';
import SignUp2 from './SignUp2';
import 'bootstrap/dist/css/bootstrap.min.css';
const SignUp1 = () => {
    const [showSignUp, setShowSignIn] = useState(false);
    const [showSignUp2, setShowSignUp1] = useState(false);

  if (showSignUp) {
    return <SignIn />;
  }   
  else if(showSignUp2) {
    return <SignUp2/>
  }
  return (
    <Form style={formstyle}>
        <div className='newDivision' style={divstyle}>
      <Stack gap={2} className="col-md-3 mx-auto">

      <Form.Floating className="mb-3">
        <Form.Control
          id="floatingInputCustom"
          type="tel"
          placeholder="Mobile Number"
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

      <Form.Floating className="mb-3">
        <Form.Control
          id="ConfirmfloatingPasswordCustom"
          type="password"
          placeholder="Password"
        />
        <label htmlFor="floatingPasswordCustom">Confirm Password</label>
      </Form.Floating>

      <Button variant="primary" type="submit" onClick={()=>{setShowSignUp1(true)}}>
        Next
      </Button>
      
      <center><p>
        Have an Account? &nbsp;
        <a style={anchor} onClick={()=> {setShowSignIn(true)}}>Sign In</a>
      </p></center>
      </Stack></div>
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

export default SignUp1
