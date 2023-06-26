import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import SignIn from './SignIn';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sign.css';
import Navbar from '../Landing/LandingNav';
import signup1 from './signup1.png';
import bg1 from './4.svg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import { set } from 'mongoose';


const SignUp1 = () => {
  const [showSignUp, setShowSignIn] = useState(false);
  const [progress, setProgress] = useState(0)
  const [formData, setFormData] = useState({ mobile: '', password: '', confirmpassword: '' });
  const Navigate = useNavigate();



  if (showSignUp) {
    return <SignIn />
  }



  const createUser = async (e) => {

    e.preventDefault();
    if (formData.mobile.length !== 10) {
      alert("Enter a valid mobile number");
      return;
    }
    else if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match");
      return;
    }
    else {
      setProgress(30)
      const res = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: formData.mobile, password: formData.password })
      });
      setProgress(70)
      const data = await res.json();
      if (data.success === false) {
        alert(data.error);
        return;
      }
      setProgress(100)
      localStorage.setItem('token', data.authToken);
      console.log(data);
      Navigate('/signup2')
    }
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }




  return (
    <div>

      <Navbar />
      <LoadingBar
        color='#00ff15'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <img src={signup1} alt="signup1" className='bg' />
      <img src={bg1} alt="bg1" className='bg1' />
      <div className="heading">
        <h3>Sign Up</h3>
      </div>
      <Form style={formstyle} >
        <div className='newDivision' style={divstyle}>
          <Stack gap={2} className="col-md-3 mx-auto" >

            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="tel"
                placeholder="Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={onChange}
              />
              <label htmlFor="floatingInputCustom">Mobile Number</label>
            </Form.Floating>

            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="password"
                onChange={onChange}
                name='password'
                value={formData.password}
                placeholder="Password"
              />
              <label htmlFor="floatingPasswordCustom">Password</label>
            </Form.Floating>

            <Form.Floating className="mb-3">
              <Form.Control
                id="ConfirmfloatingPasswordCustom"
                type="password"
                onChange={onChange}
                name='confirmpassword'
                value={formData.confirmpassword}
                placeholder="Password"
              />
              <label htmlFor="floatingPasswordCustom">Confirm Password</label>
            </Form.Floating>

            <Button type="submit" variant="success" style={{ backgroundColor: " #00ff15", outline: "none", border: "none" }} onClick={createUser}>
              Next
            </Button>

            <center><p>
              Have an Account? &nbsp;
              <Link to='/signin' style={anchor} onClick={() => { setShowSignIn(true) }}>Sign In</Link>
            </p></center>
          </Stack></div>
      </Form>
    </div>
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
