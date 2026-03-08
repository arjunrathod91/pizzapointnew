import React from "react";
import '../Sidebar/Sidebar.css'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FoodBankIcon from '@mui/icons-material/FoodBank';

function Sidebar({open,setOpen}) {

  return (
    <div className={open ? 'sidebar' : 'hide'}>
      <div className="sidebar-links">
        <div className="sidebar-l">
          <HomeIcon/><Link to="/" onClick={()=>setOpen(!open)}>Home</Link>
        </div>
        <div className="sidebar-l">
          <LocalOfferIcon /><Link to="/offers" onClick={()=>setOpen(!open)}>Offers</Link>
        </div>
        <div className="sidebar-l">
          <FoodBankIcon/><Link to="/outlet" onClick={()=>setOpen(!open)}>Outlet</Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
