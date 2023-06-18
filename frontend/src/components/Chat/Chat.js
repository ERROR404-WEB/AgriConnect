import React, { useState, useEffect, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

import axios from "axios";
import "./main.css";

export default function Chat() {
  const [receiver, setReceiver] = useState("");
  const [receiverid, setReceiverid] = useState("");
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState([]);
  const [msgdata, setMsgdata] = useState([]);
  const [senderid, setSenderid] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setSenderid(localStorage.getItem("userid"));
    axios
      .post("http://localhost:5000/api/auth/getchatusers", { senderid })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error("Error");
      });
  }, [senderid]);

  useEffect(() => {
    const fetchMsgData = () => {
      var sender = localStorage.getItem("userid");
      let abc = {
        receiver: `${receiverid}`,
        sender: `${sender}`,
      };
      axios
        .post("http://localhost:5000/api/auth/getmsgs", { abc })
        .then((res) => {
          setMsgdata(res.data);
        })
        .catch((err) => {
          console.log("Error");
        });
    };
    fetchMsgData();
  });

  function chat(abc) {
    var a = document.getElementById("main-div2-template");
    var b = document.getElementById("main-div2-content");
    a.style.display = "none";
    b.style.display = "block";
    setReceiver(abc);
  }

  function sendmsg(msg) {
    if (msg) {
      var sender = localStorage.getItem("userid");
      let abc = {
        msg: `${msg}`,
        receiver: `${receiverid}`,
        sender: `${sender}`,
        type: 0,
      };
      setMsg("");
      axios
        .post("http://localhost:5000/api/auth/sendmsg", { abc })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("Error");
        });
    }
  }

  const calculateTextAreaHeight = (element) => {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  const Callfun = useCallback(() => {
    var sender = localStorage.getItem("userid");
    let abc = {
      msg: `http://localhost:3000/room/${senderid}516${receiverid}`,
      receiver: `${receiverid}`,
      sender: `${sender}`,
      type: 1,
    };
    setMsg("");
    axios
      .post("http://localhost:516/sendmsg", { abc })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("Error");
      });
    navigate(`/room/${senderid}516${receiverid}`);
  }, [navigate, senderid, receiverid]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter the users based on the search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="main-container">
        <div className="main-div1">
          <div className="main-search">
            <form>
              <input
                type="text"
                placeholder="Enter Username"
                className="main-search-text"
                value={searchQuery}
                onChange={handleSearch}
              />
              <button className="main-search-icon">
                <SearchIcon />
              </button>
            </form>
          </div>
          <div className="main-users">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div key={user._id} className="main-chats">
                  <button
                    onClick={() => {
                      setReceiverid(user._id);
                      chat(user.name);
                    }}
                  >
                    {user.name}
                  </button>
                </div>
              ))
            ) : (
              <p>No users found</p>
            )}
          </div>
        </div>
        <div className="main-div2">
          <div className="main-div2-template" id="main-div2-template">
            <img
              alt=""
              className="logo1"
              src="https://i.ibb.co/cydmzfk/5758868edd0895e85e8b4d62-removebg-preview.png"
            />
            <h3>Chats will be displayed here</h3>
          </div>
          <div className="main-div2-content" id="main-div2-content">
            <div className="main-current-user">
              <div>
                <i>{receiver}</i>
              </div>
              <div className="main-icons">
                <button
                  onClick={() => {
                    Callfun();
                  }}
                >
                  <VideoCallIcon className="icons" />
                </button>
              </div>
            </div>
            <div className="main-current-chats" id="msg-div">
              {msgdata.map((message, index) =>
                message.sender === senderid ? (
                  <div className="main-msgs-right" key={index}>
                    <div className="msg-container">
                      {message.type === 0 ? (
                        <p>
                          {message.msg}
                        </p>
                      ) : (
                        <p>
                          <a href={message.msg} className="links">
                            Click to join call
                          </a>
                        </p>
                      )}
                      <p className="tym">{message.date}</p>
                    </div>
                  </div>
                ) : (
                  <div className="main-msgs-left" key={index}>
                    <div className="msg-container">
                      {message.type === 0 ? (
                        <p>
                          {message.msg}
                        </p>
                      ) : (
                        <p>
                          <a href={message.msg} className="links">
                            Click to join call
                          </a>
                        </p>
                      )}
                      <p className="tym">{message.date}</p>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="main-current-type">
              <textarea
                type="text"
                spellCheck="false"
                value={msg}
                onChange={(e) => {
                  setMsg(e.target.value);
                  calculateTextAreaHeight(e.target);
                }}
                onInput={(e) => calculateTextAreaHeight(e.target)}
                className="textarea"
              />

              <button className="msg-sent" onClick={() => sendmsg(msg)}>
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
