import React from 'react'
import './home.css'
import LandingNav from './LandingNav'
import bg from './bg.jpg'
import logo from './logow.png'
import logogtext from './logotext.png'

import Cards from './Cards'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const Navigate = useNavigate();
  const handleClick = () => {
    Navigate('/signup1');
  }
  return (
    <div>
      <LandingNav bg={"transparent"} />
      <div className="landing-page">
        <img src={bg} alt="Background" className="background-image" />
        <img src={logo} alt="Logo" className="logo-image" />
        <img src={logogtext} alt='Logo' className='logo-text' />
        <button className="get-started-button" onClick={handleClick}>Get Started</button>
      </div>
      <div className="container">
        <Cards/>
      </div>
     
    </div>
  )
}
