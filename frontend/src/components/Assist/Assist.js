import React from 'react'
import Navbar from '../Navbar/Navbar'
import Cards from './Cards'
import './style.css'
export default function Assist() {
  return (
    <div>
      <Navbar/>
      <div  className='containerr'>
        
        <Cards/>
        <Cards/> <Cards/> <Cards/> <Cards/> <Cards/> <Cards/> <Cards/>
       
      </div>
    </div>
  )
}
