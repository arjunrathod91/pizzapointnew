/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { Context } from "../../../context/Context";
import "./Orders.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMediaQuery } from "@mui/material";  
import { useNavigate } from "react-router-dom";



function Orders({isVisible}) {
  const {loggedIn,setLoggedIn,setRIghtSec,userDetails,setUserDetails } =
    useContext(Context);
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

 useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    setUserDetails(user);
  }
}, [setUserDetails]);

useEffect(() => {
  setLoggedIn(localStorage.getItem("loggedInStatus"));
}, [setLoggedIn]);

useEffect(() => {
  if (loggedIn !== "true") {
    navigate("/login");
  }
}, [loggedIn, navigate]);
  return (
    <div className="orders">
      
      {isMobile ? (
        <div onClick={() => setRIghtSec(false)}>
          <ArrowBackIcon />
        </div>
      ) : ""}
      {userDetails.order && userDetails.order.length > 0 ? <h1>Orders</h1>: "No orders found."}
       <div style={{padding:'20px',display: isVisible ? "block" : "none"}}>
         {userDetails.order ? userDetails.order.slice()
  .reverse().map((item,index)=>(
          <div key={index}>
           <div style={{display:'flex',justifyContent:'space-between'}}>
              <h3>{item.date}</h3>
              <h3 style={{marginRight:'20px'}}>{item.time}</h3>
            </div>
           <h3>Total Bill: {item.total}</h3>
           {item.orderItems.map((item,index)=>(
            <div key={index}>
                 {/* <span>{item.name}</span> */}
                 <div className="item-box" >
               <div className="img-sec">
                 <img src={item.img} alt="" />
               </div>
               <div className="info-sec">
                 <strong>{item.name}</strong>
                 <h4>₹{item.price}</h4>
                 <p>{item.type}</p>
               </div>
             </div>
            </div>
           ))}
         </div> )) : null}
       </div>
    </div>
  );

  // {isMobile ? (
  //       <div onClick={() => setRIghtSec(false)}>
  //         <ArrowBackIcon />
  //       </div>
  //     ) : (
  //       ""
  //     )}
  //     <div style={{padding:'20px'}}>
  //       {user.order ? user.order.map(()=>(
          
  //       ):'')}
  //       {user.order ? user.order.map((item, index) => (
  //        <div key={index}>
  //         <span>{item.date}</span>
  //         <span>Hello</span>
  //        </div> )) : null}
  //     </div>
}

// {user.order ? user.order.map((item, index) => (
//           <div key={index}>
//             <span>{item.date}</span>
//             <span> Total: {item.total}Rs.</span>
//             {orders.item.map((item,index)=>(
//               <div key={index}>
//                 <span>{item.name}</span>
//               </div>
//             ))}
//             <span>{item.name}</span>
//             <div className="item-box" >
//               <div className="img-sec">
//                 <img src={item.img} alt="" />
//               </div>
//               <div className="info-sec">
//                 <strong>{item.name}</strong>
//                 <p>{item.ingridient}</p>
//                 <h2>₹{item.price}</h2>
//                 <p>{item.type}</p>
//               </div>
//             </div>
//           </div>
//          )) : <p>No orders found.</p>}

export default Orders;
