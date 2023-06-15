import React from 'react'
import Profile from './Profile'
import Navbar from '../Navbar/Navbar'
export default function Dashboard() {
  return (
    <div >
      <Navbar/>
        <div className="container " >
          
          <Profile/>
        </div>
    </div>
  )
}
