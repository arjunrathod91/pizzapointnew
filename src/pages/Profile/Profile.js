import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import Orders from "./categories/Orders";
import Info from "./categories/Info";
import { LocalShipping, Person } from "@mui/icons-material";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useMediaQuery } from "@mui/material";
function Profile() {
  const [section, setSection] = useState("Orders");
  const { loggedIn, setLoggedIn, rightSec, setRIghtSec } = useContext(Context);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [zIndexLeft, setZiNdexLeft] = useState("1");
  const [zIndexRight, setZiNdexRight] = useState("2");
  const [width, setWidth] = useState("100%");
  const [position, setPosition] = useState("absolute");
  const renderSection = () => {
    switch (section) {
      case "Orders":
        return <Orders />;
      case "Profile":
        return <Info />;
    }
  };

  const navigate = useNavigate();
  const login = () => {
    setLoggedIn(true);
  };

  const responsiveCtr = () => {
    if (isMobile) {
      setZiNdexLeft("1");
      setZiNdexRight("2");
    }
  };
  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  });
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
