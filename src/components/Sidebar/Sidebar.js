import React from 'react'
import '../Sidebar/Sidebar.css'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='sidebar'>
      <Link to="/">Home</Link>
      {/* <Link to="/menu">Menu</Link> */}
      <Link to="/offers">Offers</Link>
      <Link to="/outlet">Outlet</Link>
    </div>
  )
}

export default Sidebar
