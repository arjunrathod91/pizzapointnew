import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import Orders from "./categories/Orders";
import Info from "./categories/Info";
import { LocalShipping, Person } from "@mui/icons-material";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useMediaQuery } from "@mui/material";
function Profile() {
  const [section, setSection] = useState("Orders");
  const { loggedIn,setLoggedIn, rightSec, setRIghtSec } = useContext(Context);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [, setZiNdexLeft] = useState("1");
  const [, setZiNdexRight] = useState("2");
  const width = "100%";
  const position = "absolute";
  const user = JSON.parse(localStorage.getItem("user"));
  const renderSection = () => {
    switch (section) {
      case "Orders":
        return <Orders />;
      case "Profile":
        return <Info />;
      default:
        return null;
    }
  };

  const navigate = useNavigate();
  // const login = () => {
  //   setLoggedIn(true);
  // };

  const responsiveCtr = () => {
    if (isMobile) {
      setZiNdexLeft("1");
      setZiNdexRight("2");
    }
  };

  const logOut = () => {
    setLoggedIn(false);
    localStorage.setItem("loggedInStatus", false);
    localStorage.removeItem("user");
    navigate("/login");
  }

  useEffect(() => {
      const loggedInStatus = localStorage.getItem("loggedInStatus");
      console.log("loggedInStatus: ", loggedInStatus);
      setLoggedIn(loggedInStatus);
  }, []);

  useEffect(() => {
    if (loggedIn === 'false') {
      navigate("/login");
      console.log(loggedIn);
    }
  }, []);
  return (
    <div className="profile">
      <div
        className="left"
        style={{
          width: `${width}`,
          zIndex: `${rightSec ? "1" : "2"}`,
          position: `${isMobile ? position : "relative"}`,
          top: `${isMobile ? "50px" : "0px"}`,
        }}
      >
        <div className="">
          <DashboardIcon />
          <span>Dashboard</span>
        </div>
        <div
          className="pro-sec"
          onClick={() => {
            setSection("Profile");
            responsiveCtr();
            setRIghtSec(true);
          }}
        >
          <Person />
          <span>Profile</span>
        </div>
        <div
          className="pro-sec"
          onClick={() => {
            setSection("Orders");
            responsiveCtr();
            setRIghtSec(true);
          }}
        >
          <LocalShipping />
          <span>Orders</span>
        </div>
        <div
          className="pro-sec"
          onClick={() => {
            // setSection("Orders");
            // responsiveCtr();
            // setRIghtSec(true);
            // localStorage.setItem("loggedInStatus", false);
            // setLoggedIn(false);
            logOut();
          }}
        >
          <ExitToAppIcon />
          <span>Log Out</span>
        </div>
      </div>
      <div
        className="right"
        style={{ width: `${width}`, zIndex: `${rightSec ? "2" : "1"}` }}
      >
        {renderSection()}
      </div>
    </div>
  );
}

export default Profile;
