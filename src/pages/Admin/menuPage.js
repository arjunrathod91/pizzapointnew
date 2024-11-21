import React, { useContext } from 'react'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMediaQuery } from '@mui/material';
import { Context } from '../../context/Context';
import "./Admin.css";

function MenuPage() {
  const { allorders, setAllOrders, rightSec, setRIghtSec } =
  useContext(Context);
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <div className=''>
      {isMobile ? (
        <div onClick={() => setRIghtSec(false)}>
          <ArrowBackIcon />
        </div>
      ) : (
        ""
      )}
      <h1>menu</h1>
    </div>
  )
}

export default MenuPage
