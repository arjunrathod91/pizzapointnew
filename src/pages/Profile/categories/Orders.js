import React, { useContext } from "react";
import { Context } from "../../../context/Context";
import "./Orders.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMediaQuery } from "@mui/material";

function Orders() {
  const { allorders, setAllOrders, rightSec, setRIghtSec } =
    useContext(Context);
  const isMobile = useMediaQuery("(max-width:600px)");
  const list = [];
  return (
    <div className="orders">
      {isMobile ? (
        <div onClick={() => setRIghtSec(false)}>
          <ArrowBackIcon />
        </div>
      ) : (
        ""
      )}
      <div style={{padding:'20px'}}>
      <div>Recent Orders</div>
        {allorders.map((item, index) => (
          <div>
            <div className="item-box" index={index}>
              <div className="img-sec">
                <img src={item.img} />
              </div>
              <div className="info-sec">
                <strong>{item.name}</strong>
                <p>{item.ingridient}</p>
                <h2>₹{item.price}</h2>
                <p>{item.type}</p>
                <p>{item.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
