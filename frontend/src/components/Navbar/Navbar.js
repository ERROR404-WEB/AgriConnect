import React from 'react';
import './navbar.css'
import Logo from './logo.png'
import pic from './pic.jpg'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react';

const Navbar = () => {
  const location = useLocation();
  useEffect(() => {
  }
    , [location])

  return (
    <div className="navbar-con">
      <div className="nav-left">
        <div className="nav-logo">
          <img src={Logo} alt="logo" className='logo' />
        </div>
        <div className="search-container">
          <i className="fa-solid fa-magnifying-glass fa-sm" style={{ marginRight: "5px", marginLeft: "5px" }}></i>
          <input type="text" className="search-input" placeholder="Search" />
        </div>
      </div>

      <div className="nav-right">
        <div className={`nav-link1 ${location.pathname === "/posts" ? "activeu" : " "}`} >
          <Link to='/posts' >
            <i className={`fa-solid fa-house fa-lg ${location.pathname === "/posts" ? "active" : " "}`} ></i> <br />
            <p style={{ fontSize: "12px",margin:"0px" }} className={`${location.pathname === "/posts" ? "active" : " "}`}>Home</p></Link>
        </div>
        <div className={`nav-link1 ${location.pathname === "/rooms" ? "activeu" : " "}`} >
          <Link to='/rooms' >
            <i className={`fa-solid fa-briefcase fa-lg ${location.pathname === "/rooms" ? "active" : " "}`} ></i> <br />
            <p style={{ fontSize: "12px",margin:"0px" }} className={`${location.pathname === "/rooms" ? "active" : " "}`}>Rooms</p></Link>
        </div>
        <div className={`nav-link1 ${location.pathname === "/chat" ? "activeu" : " "}`} >
          <Link to='/chat' >
            <i className={`fa-solid fa-comments fa-lg ${location.pathname === "/chat" ? "active" : " "}`} ></i> <br />
            <p style={{ fontSize: "12px",margin:"0px" }} className={`${location.pathname === "/chat" ? "active" : " "}`}>Chat</p></Link>
        </div>
        <div className={`nav-link1 ${location.pathname === "/assist" ? "activeu" : " "}`} >
          <Link to='/assist' >
            <i className={`fa-solid fa-user fa-lg ${location.pathname === "/assist" ? "active" : " "}`} ></i> <br />
            <p style={{ fontSize: "12px",margin:"0px" }} className={`${location.pathname === "/assist" ? "active" : " "}`}>Assist</p></Link>
        </div>
        <div className={`nav-link1 ${location.pathname === "/weather" ? "activeu" : " "}`} >
          <Link to='/weather' >
            <i className={`fa-solid fa-cloud fa-lg ${location.pathname === "/weather" ? "active" : " "} `} ></i> <br />
            <p style={{ fontSize: "12px",margin:"0px" }} className={`${location.pathname === "/weather" ? "active" : " "}`}>Weather</p></Link>
        </div>
        <div className="profile-pic">
          <Link to='/dashboard'>
            <img src={pic} alt="profile" className='pic' /></Link>
        </div>
      </div>



      <div id="footer">

        <div className={`nav-link2 ${location.pathname === "/posts" ? "activeu" : " "}`} >
          <Link to='/posts' >
            <i className={`fa-solid fa-house fa-lg ${location.pathname === "/posts" ? "active" : " "}`} ></i> <br />
            <p style={{ fontSize: "12px",margin:"0px" }} className={`${location.pathname === "/posts" ? "active" : " "}`}>Home</p></Link>
        </div>
        <div className={`nav-link2 ${location.pathname === "/rooms" ? "activeu" : " "}`} >
          <Link to='/rooms' >
            <i className={`fa-solid fa-briefcase fa-lg ${location.pathname === "/rooms" ? "active" : " "}`} ></i> <br />
            <p style={{ fontSize: "12px",margin:"0px" }} className={`${location.pathname === "/rooms" ? "active" : " "}`}>Rooms</p></Link>
        </div>
        <div className={`nav-link2 ${location.pathname === "/chat" ? "activeu" : " "}`} >
          <Link to='/chat' >
            <i className={`fa-solid fa-comments fa-lg ${location.pathname === "/chat" ? "active" : " "}`} ></i> <br />
            <p style={{ fontSize: "12px",margin:"0px" }} className={`${location.pathname === "/chat" ? "active" : " "}`}>Chat</p></Link>
        </div>
        <div className={`nav-link2 ${location.pathname === "/assist" ? "activeu" : " "}`} >
          <Link to='/assist' >
            <i className={`fa-solid fa-user fa-lg ${location.pathname === "/assist" ? "active" : " "}`} ></i> <br />
            <p style={{ fontSize: "12px",margin:"0px" }} className={`${location.pathname === "/assist" ? "active" : " "}`}>Assist</p></Link>
        </div>
        <div className={`nav-link2 ${location.pathname === "/weather" ? "activeu" : " "}`} >
          <Link to='/weather' >
            <i className={`fa-solid fa-cloud fa-lg ${location.pathname === "/weather" ? "active" : " "} `} ></i> <br />
            <p style={{ fontSize: "12px",margin:"0px" }} className={`${location.pathname === "/weather" ? "active" : " "}`}>Weather</p></Link>
        </div>


      </div>

    </div>
  );
};

export default Navbar;
