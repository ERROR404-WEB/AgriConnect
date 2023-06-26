import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import SignUp from './SignUp1';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Landing/LandingNav';
import signup1 from './1.svg';
import bg1 from './4.svg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

const SignIn = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [formData, setFormData] = useState({ phone: '', password: '' });
  const [progress, setProgress] = useState(0)
  const Navigate = useNavigate();

  useEffect(() => {

    if (localStorage.getItem('token')) {
      Navigate('/dashboard')
    }
  });
  if (showSignUp) {
    return <SignUp />;
  }
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleLogin = async (e) => {
    setProgress(30)
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: formData.phone, password: formData.password }),
    });
    setProgress(70)
    const data = await res.json();

    if (data.success === false) {
      alert(data.error);
      return;
    }
    setProgress(100)
    localStorage.setItem('token', data.authToken);
    
    Navigate('/dashboard')

  }
  return (
    <>
      <Navbar />
      <LoadingBar
        color='#00ff15'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <img src={signup1} alt="signup1" className='bg' />
      <img src={bg1} alt="bg1" className='bg1' />
      <div className="heading">
        <h3>Sign In</h3>
      </div>
      <Form style={formstyle}>
        <div className='newDivision' style={divstyle}>
          <Stack gap={2} className="col-md-3 mx-auto">

            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom"
                type="tel"
                placeholder="Mobile Number"
                value={formData.phone}
                name='phone'
                onChange={onChange}
              />
              <label htmlFor="floatingInputCustom">Mobile Number</label>
            </Form.Floating>

            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom"
                type="password"
                name='password'
                value={formData.password}
                onChange={onChange}
                placeholder="Password"
              />
              <label htmlFor="floatingPasswordCustom">Password</label>
            </Form.Floating>

            <Button variant="success" onClick={handleLogin} style={{ backgroundColor: " #00ff15", outline: "none", border: "none" }} type="submit" className='mb-3'>
              Login
            </Button>

            <center><p>
              New to FarmBank? &nbsp;
              <Link to='/signup1' style={anchor} onClick={() => { setShowSignUp(true) }}>Sign Up</Link>
            </p></center>

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
