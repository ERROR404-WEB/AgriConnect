import React, { useEffect } from 'react'
import Profile from './Profile'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function Dashboard(props) {
  const Navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [profileData, setProfileData] = useState({ name: '', address: '', email: '', phone: '' ,bio:'',role:''});

  useEffect(() => {

    if (localStorage.getItem('token') == null) {
      Navigate('/signin');

    }
    else {
      setShow(true);
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
          localStorage.setItem("userid",data._id);
          localStorage.setItem("role",data.role);
          
          setProfileData({ profilepic:data.profilepic ,bannerpic:data.bannerpic , name: data.name, address: data.address, email: data.email, phone: data.phone , bio:data.bio,role:data.role ,fb:data.fb,insta:data.insta,whatsapp:data.whatsapp,telegram:data.telegram,gmail:data.gmail});
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

            <Profile data={profileData} setData={setProfileData}  showEdit={true} />

          </div>
        </>)}
       
    </div>

  )
}