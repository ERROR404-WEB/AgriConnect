import React, { useEffect } from 'react'
import Profile from './Profile'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { set } from 'mongoose';

export default function Dashboard() {
  const Navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [profileData, setProfileData] = useState({name:'',address:'',email:'',phone:''});

  useEffect(() => {

    if (localStorage.getItem('token') == null) {
      Navigate('/signin');

    }
    else {
      setShow(true);
      // console.log(localStorage.getItem('token'))
      const getProfile = async () => {
        const response = await fetch('http://localhost:5000/api/auth/getuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          }
        })
        const data = await response.json();
        if (data.success === false) {
          alert(data.error);
          Navigate('/signin');
        }
        else {
          setProfileData({username:data.name,address:data.address,email:data.email,phone:data.phone});
        }

      }
      getProfile();
    }

  }, [])
  return (


    <div >
      {show && (
        <>
          <Navbar />
          <div className="container " >

            <Profile data ={profileData} />

          </div>
        </>)}

    </div>

  )
}
