import React, { useContext } from "react";
import "./Info.css";
import { Context } from "../../../context/Context";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMediaQuery } from "@mui/material";

function Info() {
  const { allorders, setAllOrders, rightSec, setRIghtSec } =
    useContext(Context);
  const isMobile = useMediaQuery("(max-width:600px)");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="info">
      {isMobile ? (<div onClick={()=>setRIghtSec(false)}><ArrowBackIcon/></div>):""}
      <div style={{padding:'20px'}}>
      <div>User Details</div>
        <div className="item-sec">
          <label className="label">Name</label>
          <div className="item">{user[0].username}</div>
        </div>
        <div className="item-sec">
          <label className="label">Address</label>
          <div className="item">{user[0].address}</div>
        </div>
        <div className="item-sec">
          <label className="label">Mobile NO.</label>
          <div className="item">{user[0].contact}</div>
        </div>
        <div className="item-sec">
          <label className="label">Password</label>
          <div className="item">{user[0].password}</div>
        </div>
        <div className="item-sec">
          <label className="label">Email Id</label>
          <div className="item">{user[0].email}</div>
        </div>
      </div>
    </div>
  );
}

export default Info;
