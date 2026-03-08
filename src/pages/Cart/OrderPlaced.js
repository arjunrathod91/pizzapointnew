import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import done from "../../Images/verified.gif";
import { useNavigate } from "react-router-dom";

function OrderPlaced() {
  const navigate = useNavigate();
   const { cart, setCart, allorders } = useContext(Context);
   const user = JSON.parse(localStorage.getItem("user"));

   const userUpdateCart = ()=> {
    const userUpdate = {
      username: user.username,
      email: user.email,
      password: user.password,
      contact: user.contact,
      address: user.address,
      cart: [],
      order: cart
    };
    console.log(userUpdate);
    localStorage.setItem("user", JSON.stringify(userUpdate));
    setCart([]);
    console.log(cart);
    console.log(cart.length);
   }
  return (
    <div className="order-placed">
      <div className="mid-page">
        <div style={{paddingTop:'10px'}}>Your Order is Placed</div>
        <div>
          <img src={done} alt="Verified Symbol" />
        </div>
        <div className="order" style={{marginTop:'10px'}} onClick={()=>{navigate('/');userUpdateCart()}}>Order More</div>
      </div>
    </div>
  );
}

export default OrderPlaced;
