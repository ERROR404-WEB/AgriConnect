import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Cards from './Cards'
import './style.css'
import { useState } from 'react'


export default function Assist() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    const getallusers = async () => {
      const response = await fetch('http://localhost:5000/api/auth/getallusers', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      })
      const users = await response.json();
      setUsers(users);
    }
    getallusers();

  },[])
  return (
    <div>
      
      <Navbar />

      <div className='containerr'>

        {
          users.map((element) => {
            return <Cards name={element.name} bio={element.bio} id={element._id} key={element._id} user={element}/>
          })}


      </div>
    </div>

  )
}
