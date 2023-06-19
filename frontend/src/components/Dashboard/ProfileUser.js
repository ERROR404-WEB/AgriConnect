import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Profile from './Profile'
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';

export default function ProfileUser() {
  const { userDetails } = useContext(UserContext);
  const [profileData, setProfileData] = useState({ name: '', address: '', email: '', phone: '', bio: '', role: '' });
  useEffect(() => {
    if (userDetails) {
      setProfileData(userDetails);
    }
  }, [userDetails]);
  return (
    <div>
      <Navbar />
      <div className="container">
        <Profile data={profileData} showEdit={false} />
      </div>
    </div>
  )
}
