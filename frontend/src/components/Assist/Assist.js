import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Cards from './Cards'
import './style.css'
import { useState } from 'react'

import LoadingBar from 'react-top-loading-bar'
import { set } from 'mongoose'

export default function Assist() {

  const [users, setUsers] = useState([]);
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    setProgress(20);
    const getallusers = async () => {
      setProgress(40);
      const response = await fetch('http://localhost:5000/api/auth/getallusers', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      })
      setProgress(70);
      const users = await response.json();
      setProgress(100);
      setUsers(users);
    }
    getallusers();

  }, [])
  return (
    <div>
      <LoadingBar
        color='rgb(0, 255, 4)'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar />

      <div className='containerr'>

        {
          users.map((element) => {
            return <Cards name={element.name} bio={element.bio} id={element._id} key={element._id} user={element} img={element.profilepic} />
          })}


      </div>
    </div>

  )
}
