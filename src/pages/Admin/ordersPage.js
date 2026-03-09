import { useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Context } from "../../context/Context";
import "./Admin.css";
import axios from "axios";

function OrdersPage() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { allorders, setAllOrders, setRIghtSec } = useContext(Context);

  const press = () => {
    setRIghtSec(false);
  };

  const [newOrders, setNewOrders] = useState({});

  // -------------------
  // Fetch orders on mount
  // -------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch latest new order
        const newOrderRes = await axios.get(
          "https://pizzapointserver.onrender.com/newOrder"
        );
        if (newOrderRes.data.length > 0) {
          setNewOrders(newOrderRes.data[newOrderRes.data.length - 1]);
        }

        // Fetch all orders
        const allOrdersRes = await axios.get(
          "https://pizzapointserver.onrender.com/allOrders"
        );
        setAllOrders(allOrdersRes.data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchData();
  }, []); // empty dependency array — runs once on mount

  // -------------------
  // Accept and Cancel functions
  // -------------------
  const accept = async () => {
    try {
      const response = await axios.post(
        "https://pizzapointserver.onrender.com/allOrders",
        newOrders
      );
      console.log("Response:", response.data);
      cancel(); // delete from newOrder after accepting
    } catch (error) {
      console.error("Error posting order:", error);
    }
  };

  const cancel = async () => {
    if (!newOrders._id) return;
    try {
      const response = await axios.delete(
        "https://pizzapointserver.onrender.com/newOrder",
        { data: { id: newOrders._id } }
      );
      console.log("Order deleted:", response.data);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // -------------------
  // Render
  // -------------------
  return (
    <div className="orders-page">
      {isMobile && (
        <div onClick={press}>
          <ArrowBackIcon />
        </div>
      )}

      {newOrders && newOrders.order && (
        <div className="new-order">
          <h1>Orders</h1>
          <div className="details-sec">
            <div style={{ color: "blue", fontWeight: 500, fontSize: "12px" }}>
              Orderd by {newOrders.total}
            </div>
            <div className="user-order">
              {newOrders.order.map((item, index) => (
                <div className="order-item" key={index} style={{ fontWeight: 500 }}>
                  <div>
                    <img
                      className="item-type-png"
                      src={
                        item.type === "veg"
                          ? "https://clipground.com/images/veg-logo-png-6.png"
                          : "https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png"
                      }
                      alt={item.type}
                    />
                    {item.quantity} x {item.name}
                  </div>
                  <div>₹{item.price}</div>
                </div>
              ))}
              <div
                style={{
                  width: "100%",
                  borderBottom: "1px solid rgb(209, 209, 209)",
                  margin: "10px 0",
                }}
              />
              <div className="order-item">
                <div>
                  Total Bill <span style={{ color: "red" }}>Paid</span>
                </div>
                <div>{newOrders.total}</div>
              </div>
              <div className="btn-sec">
                <button className="accept" onClick={accept}>
                  Accept
                </button>
                <button className="cancel" onClick={cancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>All Orders</div>
      <div className="all-order-sec">
        {allorders?.map((item, index) => (
          <div className="acc-ord-box" key={index}>
            <div style={{ color: "blue", fontWeight: 500, fontSize: "12px" }}>
              Orderd by {item.username}
            </div>
            <div className="user-order">
              {item.order?.map((orderItem, idx) => (
                <div className="order-item" key={idx} style={{ fontWeight: 500 }}>
                  <div>
                    <img
                      className="item-type-png"
                      src={
                        orderItem.type === "veg"
                          ? "https://clipground.com/images/veg-logo-png-6.png"
                          : "https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png"
                      }
                      alt={orderItem.type}
                    />
                    {orderItem.quantity} x {orderItem.name}
                  </div>
                  <div>₹{orderItem.price}</div>
                </div>
              ))}
              <div
                style={{
                  width: "100%",
                  borderBottom: "1px solid rgb(209, 209, 209)",
                  margin: "10px 0",
                }}
              />
              <div className="order-item">
                <div>
                  Total Bill <span style={{ color: "red" }}>Paid</span>
                </div>
                <div>{item.total}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;