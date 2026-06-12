import React, { useContext, useEffect, useState } from "react";
import { AddAPhoto, Dashboard, ShoppingCart } from "@mui/icons-material";
import { Menu, useMediaQuery } from "@mui/material";
import OrdersPage from "./ordersPage";
import MenuPage from "./menuPage";
import { Context } from "../../context/Context";
import zIndex from "@mui/material/styles/zIndex";
import '../../pages/Profile/profile.css'
// import DashboardPage from "./dashboardPage";

function Admin() {
  const [section, setSection] = useState("Orders");
  const { loggedIn, setLoggedIn, rightSec, setRIghtSec } = useContext(Context);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [zIndexLeft, setZiNdexLeft] = useState("1");
  const [zIndexRight, setZiNdexRight] = useState("2");
  const [width, setWidth] = useState("100%");
  const [position, setPosition] = useState("absolute");
  


  // const [hover, setHover] = useState(false);
  // const [page, setPage] = useState("orders");
  // const { loggedIn, setLoggedIn, rightSec, setRIghtSec } = useContext(Context);
  // const isMobile = useMediaQuery("(max-width:600px)");
  // const [zIndexLeft, setZiNdexLeft] = useState("1");
  // const [zIndexRight, setZiNdexRight] = useState("2");
  // const [width, setWidth] = useState("100%");
  // const [position, setPosition] = useState("absolute");
  // const [color, setColor] = useState("red");
  // const [newPage,setNewPage] = useState()
  // } else if (page === "dashboard") {
  //   return <DashboardPage/>
  const renderSection = () => {
    switch (section) {
      case "Orders":
        return <OrdersPage />;
      case "Menu":
        return <MenuPage />;
    }
  };

  const responsiveCtr = () => {
    if (isMobile) {
      setZiNdexLeft("1");
      setZiNdexRight("2");
    }
  };
  // const renderPage = () => {
  //   if (page === "orders") {
  //     return <OrdersPage />;
  //   } else if (page === "menu") {
  //     return <MenuPage />;
  //   }
  // };

  return (
    // <div className="admin">
    //   <div
    //     className="left"
    //     style={{
    //       width: "100%",
    //       position: `${isMobile ? "absolute" : "relative"}`,
    //       zIndex: `${rightSec ? "1" : "2"}`,
    //       top: "0px",
    //     }}
    //   >
    //     <div className="column" onClick={() => setPage("dashboard")}>
    //       <Dashboard />
    //       <span>Dashboard</span>
    //     </div>
    //     <div
    //       className="column"
    //       onClick={() => {
    //         setPage("orders");
    //         setRIghtSec("true");
    //       }}
    //     >
    //       <ShoppingCart />
    //       <span>Orders</span>
    //     </div>
    //     <div
    //       className="column"
    //       onClick={() => {
    //         setPage("menu");
    //         setRIghtSec("true");
    //       }}
    //     >
    //       <AddAPhoto />
    //       <span>Add Menu</span>
    //     </div>
    //   </div>
    //   <div
    //     className="right"
    //     style={{ width: `${width}`, zIndex: `${rightSec ? "2" : "1"}` }}
    //   >
    //     {renderPage()}
    //     {/* <div className='add-column' onClick={()=>setCart(true)}>
    //                 <AddAPhoto />
    //                 <span>Add Category</span>
    //             </div> */}
    //   </div>
    //   {/* {cart && <Cart/>} */}
    // </div>
    <div className="admin">
      <div
        className="left"
        style={{
          width: `${width}`,
          zIndex: `${rightSec ? "1" : "2"}`,
          position: `${isMobile ? position : "relative"}`,
          top: `${isMobile ? "50px" : "0px"}`,
          backgroundColor:'white'
        }}
      >
        <div className="">
        <Dashboard />
        <span>Dashboard</span>
        </div>
        <div
          className="pro-sec"
          onClick={() => {
            setSection("Orders");
            responsiveCtr();
            setRIghtSec(true);
          }}
        >
          <ShoppingCart />
          <span>Orders</span>
        </div>
        <div
          className="pro-sec"
          onClick={() => {
            setSection("Menu");
            responsiveCtr();
            setRIghtSec(true);
          }}
        >
           <AddAPhoto />
           <span>Add Menu</span>
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

export default Admin;
