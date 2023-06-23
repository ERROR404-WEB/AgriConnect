import React, { useContext } from "react";
import "./navbar.css";
import Logo from "./logo.png";
import pic from "./pic.jpg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { UserContext } from '../UserContext/UserContext';



const Navbar = () => {
  const { setUserDetailsValue } = useContext(UserContext);
  const [searchuser, setSearchuser] = useState("");
  const [users, setusers] = useState([]);
  const location = useLocation();
  useEffect(() => { }, [location]);

  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  function getallusers() {
    axios
      .get("http://localhost:5000/api/auth/getallusers")
      .then((response) => {
        console.log(response.data);
        setusers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchuser.toLowerCase())
  );
  const handleClick = (user) => {
    setUserDetailsValue(user);
    setSearchuser("");
    navigate('/profile');

  }

  return (
    <div className="navbar-con">
      <div className="nav-left">
        <div className="nav-logo">
          <img src={Logo} alt="logo" className="logo" />
        </div>
        <div>
          <div className="search-container">
            <i
              className="fa-solid fa-magnifying-glass fa-sm"
              style={{ marginRight: "5px", marginLeft: "5px" }}
            ></i>
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              value={searchuser}
              onChange={(e) => {
                setSearchuser(e.target.value);
              }}
              onFocus={() => {
                getallusers();
              }}
            />
          </div>
          {searchuser && (
            <div
              className="searched_users"
            >
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div key={user._id} className="users" onClick={() => { handleClick(user) }}>
                    <p >{user.name}</p>
                  </div>
                ))
              ) : (
                <p>No users found</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="nav-right">
        <div
          className={`nav-link1 ${location.pathname === "/posts" ? "activeu" : " "
            }`}
        >
          <Link to="/posts">
            <i
              className={`fa-solid fa-house fa-lg ${location.pathname === "/posts" ? "active" : " "
                }`}
            ></i>{" "}
            <br />
            <p
              style={{ fontSize: "12px", margin: "0px" }}
              className={`${location.pathname === "/posts" ? "active" : " "}`}
            >
              Home
            </p>
          </Link>
        </div>
        <div
          className={`nav-link1 ${location.pathname === "/rooms" ? "activeu" : " "
            }`}
        >
          <Link to="/rooms">
            <i
              className={`fa-solid fa-briefcase fa-lg ${location.pathname === "/rooms" ? "active" : " "
                }`}
            ></i>{" "}
            <br />
            <p
              style={{ fontSize: "12px", margin: "0px" }}
              className={`${location.pathname === "/rooms" ? "active" : " "}`}
            >
              Rooms
            </p>
          </Link>
        </div>
        <div
          className={`nav-link1 ${location.pathname === "/chat" ? "activeu" : " "
            }`}
        >
          <Link to="/chat">
            <i
              className={`fa-solid fa-comments fa-lg ${location.pathname === "/chat" ? "active" : " "
                }`}
            ></i>{" "}
            <br />
            <p
              style={{ fontSize: "12px", margin: "0px" }}
              className={`${location.pathname === "/chat" ? "active" : " "}`}
            >
              Chat
            </p>
          </Link>
        </div>
        <div
          className={`nav-link1 ${location.pathname === "/assist" ? "activeu" : " "
            }`}
        >
          <Link to="/assist">
            <i
              className={`fa-solid fa-user fa-lg ${location.pathname === "/assist" ? "active" : " "
                }`}
            ></i>{" "}
            <br />
            <p
              style={{ fontSize: "12px", margin: "0px" }}
              className={`${location.pathname === "/assist" ? "active" : " "}`}
            >
              Network
            </p>
          </Link>
        </div>
        <div
          className={`nav-link1 ${location.pathname === "/weather" ? "activeu" : " "
            }`}
        >
          <Link to="/weather">
            <i
              className={`fa-solid fa-cloud fa-lg ${location.pathname === "/weather" ? "active" : " "
                } `}
            ></i>{" "}
            <br />
            <p
              style={{ fontSize: "12px", margin: "0px" }}
              className={`${location.pathname === "/weather" ? "active" : " "}`}
            >
              Weather
            </p>
          </Link>
        </div>
        <div className="profile-pic " style={{ marginRight: "15px" }}>
          <Link to="/dashboard">
            <img src={pic} alt="profile" className="pic " />
          </Link>
        </div>
        <div className="dropown">
          <i
            className="fa-solid fa-right-from-bracket dropdown-btn"
            onClick={handleLogout}
          ></i>
        </div>
      </div>

      <div id="footer">
        <div
          className={`nav-link2 ${location.pathname === "/posts" ? "activeu" : " "
            }`}
        >
          <Link to="/posts">
            <i
              className={`fa-solid fa-house fa-lg ${location.pathname === "/posts" ? "active" : " "
                }`}
            ></i>{" "}
            <br />
            <p
              style={{ fontSize: "12px", margin: "0px" }}
              className={`${location.pathname === "/posts" ? "active" : " "}`}
            >
              Home
            </p>
          </Link>
        </div>
        <div
          className={`nav-link2 ${location.pathname === "/rooms" ? "activeu" : " "
            }`}
        >
          <Link to="/rooms">
            <i
              className={`fa-solid fa-briefcase fa-lg ${location.pathname === "/rooms" ? "active" : " "
                }`}
            ></i>{" "}
            <br />
            <p
              style={{ fontSize: "12px", margin: "0px" }}
              className={`${location.pathname === "/rooms" ? "active" : " "}`}
            >
              Rooms
            </p>
          </Link>
        </div>
        <div
          className={`nav-link2 ${location.pathname === "/chat" ? "activeu" : " "
            }`}
        >
          <Link to="/chat">
            <i
              className={`fa-solid fa-comments fa-lg ${location.pathname === "/chat" ? "active" : " "
                }`}
            ></i>{" "}
            <br />
            <p
              style={{ fontSize: "12px", margin: "0px" }}
              className={`${location.pathname === "/chat" ? "active" : " "}`}
            >
              Chat
            </p>
          </Link>
        </div>
        <div
          className={`nav-link2 ${location.pathname === "/assist" ? "activeu" : " "
            }`}
        >
          <Link to="/assist">
            <i
              className={`fa-solid fa-user fa-lg ${location.pathname === "/assist" ? "active" : " "
                }`}
            ></i>{" "}
            <br />
            <p
              style={{ fontSize: "12px", margin: "0px" }}
              className={`${location.pathname === "/assist" ? "active" : " "}`}
            >
              Network
            </p>
          </Link>
        </div>
        <div
          className={`nav-link2 ${location.pathname === "/weather" ? "activeu" : " "
            }`}
        >
          <Link to="/weather">
            <i
              className={`fa-solid fa-cloud fa-lg ${location.pathname === "/weather" ? "active" : " "
                } `}
            ></i>{" "}
            <br />
            <p
              style={{ fontSize: "12px", margin: "0px" }}
              className={`${location.pathname === "/weather" ? "active" : " "}`}
            >
              Weather
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
