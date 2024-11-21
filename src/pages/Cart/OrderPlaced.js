import React from "react";
import done from "../../Images/verified.gif";
import { useNavigate } from "react-router-dom";

function OrderPlaced() {
  const navigate = useNavigate()
  return (
    <div className="order-placed">
      <div className="mid-page">
        <div style={{paddingTop:'10px'}}>Your Order is Placed</div>
        <div>
          <img src={done} alt="Verified Symbol" />
        </div>
        <div className="order" style={{marginTop:'10px'}} onClick={()=>navigate('/')}>Order More</div>
      </div>
    </div>
  );
}

export default OrderPlaced;
