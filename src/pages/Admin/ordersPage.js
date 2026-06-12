import { useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Context } from "../../context/Context";
import "./Admin.css";
import axios from "axios";

function OrdersPage() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { allorders, setAllOrders, rightSec, setRIghtSec } =
    useContext(Context);

  // const obj = JSON.parse(localStorage.getItem("newOrder")) || [];
  const press = () => {
    setRIghtSec(false);
  };

  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [newOrders, setNewOrders] = useState({});
  const [loading, setLoading] = useState(true);

  const newOrder = () => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://pizzapointserver-1.onrender.com/newOrder"
        );
        setNewOrders(response.data[[response.data.length - 1]]);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };
    fetch();
  };

  const latestOrder = () => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://pizzapointserver-1.onrender.com/allOrders"
        );
        setAllOrders(response.data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };
    fetch();
  };

  const accept = async () => {
    axios
      .post("https://pizzapointserver-1.onrender.com/allOrders", newOrders)
      .then((response) => {
        console.log("Response:", response.data); // Log the response data
      })
      .catch((error) => {
        console.error("There was an error:", error); // Log the entire error
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error(
            "Request made but no response received:",
            error.request
          );
        } else {
          console.error("Error setting up the request:", error.message);
        }
      });
    cancel();
  };
  const cancel = () => {
    console.log(newOrders._id)
    axios
      .delete("https://pizzapointserver-1.onrender.com/newOrder", {
        data: { id: newOrders._id }, // pass the order ID in the body
      })
      .then((response) => {
        console.log("Order deleted:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };
  // const cancel = () => {};

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Start loading
      await newOrder(); // Fetch your data
      await latestOrder();
      setLoading(false); // Stop loading
    }
    newOrder();
    latestOrder();
  }, [newOrders, allorders]);

  const option = () => {};

  return (
    <div className="orders-page">
      {isMobile ? (
        <div onClick={press}>
          <ArrowBackIcon />
        </div>
      ) : (
        ""
      )}
      {newOrders && newOrders.order ? (
        <div className="new-order">
          <h1>Orders</h1>
          <div className="details-sec">
            <div style={{ color: "blue", fontWeight: 500, fontSize: "12px" }}>
              Orderd by {newOrders.
total}
            </div>
            <div className="user-order">
              {newOrders.order.map((item, index) => (
                <div
                  className="order-item"
                  key={index}
                  style={{ fontWeight: "500" }}
                >
                  <div>
                    {item.type == "veg" ? (
                      <>
                        <img
                          className="item-type-png"
                          src="https://clipground.com/images/veg-logo-png-6.png"
                        />
                      </>
                    ) : (
                      <>
                        <img
                          className="item-type-png"
                          src="https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png"
                        />
                      </>
                    )}
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
              ></div>
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
            <div className=""></div>
          </div>
          <div></div>
        </div>
      ) : (
        ""
      )}
      <div>All Orders</div>
      <div className="all-order-sec">
        {allorders
          ? allorders.map((item, index) => (
              <div className="acc-ord-box" key={index}>
                <div
                  style={{ color: "blue", fontWeight: 500, fontSize: "12px" }}
                >
                  Orderd by {item.username}
                </div>
                <div className="user-order">
                  {allorders
                    ? item.order.map((item, index) => (
                        <div
                          className="order-item"
                          key={index}
                          style={{ fontWeight: "500" }}
                        >
                          <div>
                            {item.type == "veg" ? (
                              <>
                                <img
                                  className="item-type-png"
                                  src="https://clipground.com/images/veg-logo-png-6.png"
                                />
                              </>
                            ) : (
                              <>
                                <img
                                  className="item-type-png"
                                  src="https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png"
                                />
                              </>
                            )}
                            {item.quantity} x {item.name}
                          </div>
                          <div>₹{item.price}</div>
                        </div>
                      ))
                    : "NO Order Yet"}
                  <div
                    style={{
                      width: "100%",
                      borderBottom: "1px solid rgb(209, 209, 209)",
                      margin: "10px 0",
                    }}
                  ></div>
                  <div className="order-item">
                    <div>
                      Total Bill <span style={{ color: "red" }}>Paid</span>
                    </div>
                    <div>{item.total}</div>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default OrdersPage;
