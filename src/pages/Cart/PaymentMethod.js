/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Images/logo.png";
import { Context } from "../../context/Context";
import axios from "axios";

function PaymentMethod() {
  const [paymentType, setPaymentType] = useState("");
  const [orderType, setOrderType] = useState("");
  const billObj = JSON.parse(localStorage.getItem("newOrder")) || [];
  const user = JSON.parse(localStorage.getItem("user"));
  // const newCart = JSON.parse(localStorage.getItem("cart")) || [];
  const newTotal = JSON.parse(localStorage.getItem("total"));
  const navigate = useNavigate();
  const {
    cart,
    setCart,
    total,
    setTotal,
    // userDetails, setUserDetails
  } = useContext(Context);

  const handlePayment = () => {
    const options = {
      key: "rzp_test_HY5jMRQoTZLe2y", // Enter your Razorpay Key ID
      amount: `${billObj.total * 100}`, // Amount in paise (50000 paise = 500 INR){newPrice}
      currency: "INR",
      name: "Pizza Point",
      description: "Test Transaction",
      //   order_id:`order_${uuid.split('-')[0]}`,
      image: `${logo}`, // Optional: Add your logo URL
      handler: function (response) {
        alert(`Payment successful: ${response.razorpay_payment_id}`);
        navigate("/orderplaced");
      },
      prefill: {
        name: "Arjun", //{username}
        email: "arjunrathod@gamil.com", //{email}
        contact: "7350887544", //{contact}
      },
      notes: {
        address: "wadgaon",
      },
      theme: {
        color: "#fff",
      },
    };
    setCart([]);
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleOrders = async () => {
    // const currentDate = new Date().toLocaleString("en-IN", {
    //   timeZone: "Asia/Kolkata",
    //   // day: "numeric",
    //   // month: "numeric",
    //   // year: "numeric",
    //   // hour: "numeric",
    //   // minute: "2-digit",
    //   // hour12: true,
    // });
    // const currentDate = new Date().toLocaleDateString("en-IN", {
    //   timeZone: "Asia/Kolkata",
    // });
    // const currentDate = new Date().toLocaleDateString("en-IN", {
    //   timeZone: "Asia/Kolkata",
    //   day: "numeric",
    //   month: "short",
    //   year: "numeric",
    // });
    // const currentDate = new Date().toLocaleDateString("en-GB", {
    //   timeZone: "Asia/Kolkata",
    // });
    const currentDate = new Date()
      .toLocaleDateString("en-GB", {
        timeZone: "Asia/Kolkata",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      // .replace(/\//g, " ");
    const currentTime = new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    // console.log(currentDate);
    // console.log(" ", currentTime);
    const newOrder = {
      username: user.username,
      email: user.email,
      contact: user.contact,
      address: user.address,
      order: user.cart.items,
      total: total,
      paymentType: paymentType,
      date: currentDate,
      time:currentTime,
      orderType: orderType,
    };
    const userOrder = {
      orderItems: user.cart.items,
      total: total,
      paymentType: paymentType,
      orderType: orderType,
      date: currentDate,
      time: currentTime,
    };
    const userUpdate = {
      username: user.username,
      email: user.email,
      password: user.password,
      contact: user.contact,
      address: user.address,
      cart: {
        items: [],
        total: 0
      },
      order: [...user.order, userOrder]
    };
    console.log(newOrder);
    localStorage.setItem("user", JSON.stringify(userUpdate));
    try {
      const response1 = await axios.put(
        // "http://localhost:8000/userDetail",
        "https://pizzapointserver.onrender.com/userDetail",
        {
          email: user.email,
          order: userOrder
        }
      );
      // navigate("/paymentmethod");
      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
      localStorage.setItem("total", JSON.stringify(0));
      console.log("Order updated successfully:", response1.data);
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await axios.post(
        // "http://localhost:8000/newOrder",
        "https://pizzapointserver.onrender.com/newOrder",
        newOrder
      );
      console.log("the data of user sent successfully:", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const payBill = () => {
    handleOrders();
    if (paymentType === "Online") {
      billObj["paymentType"] = paymentType;
      handlePayment();
      console.log(cart);
    } else {
      navigate("/orderplaced");
    }
  };
  useEffect(() => {
    if (user) {
      setCart(user.cart.items);
      setTotal(user.cart.total);
    }
  },[setCart,setTotal]);

  return (
    <div className="payment-method">
      <div
        className="payment-box"
        style={{ display: "flex", justifyContent: "start" }}
      >
        <div className="bill">
          Total Bill : ₹<span style={{ fontWeight: "500" }}>{total}</span>
        </div>
        {cart.map((item, index) => (
          <div key={index}>
            <div className="item-box">
              <div className="img-sec">
                <img src={item.img} alt="" />
              </div>
              <div className="info-sec">
                <label>{item.name}</label>
                <p style={{ fontSize: "14px" }}>{item.ingridient}</p>
                <label>₹{item.price}</label>
              </div>
            </div>
          </div>
        ))}

        <div className="ptype">
          <span>Order Type</span>
          <div className="payment-type">
            <input
              type="radio"
              name="orderType"
              style={{ cursor: "pointer" }}
              onClick={() => setOrderType("Dine In")}
            />{" "}
            Dine In
          </div>
          <div className="payment-type">
            <input
              type="radio"
              name="orderType"
              style={{ cursor: "pointer" }}
              onClick={() => setOrderType("Home Delivery")}
            />
            Home delivary
          </div>
          <div className="payment-type">
            <input
              type="radio"
              name="orderType"
              style={{ cursor: "pointer" }}
              onClick={() => setOrderType("Parcel")}
            />
            Parcel
          </div>
          {/* <div className="continew" onClick={payBill}>
            Place a Order
          </div> */}
        </div>



        <div className="ptype">
          <span>Payment Type</span>
          {orderType === "Home Delivery" ? (<div className="payment-type">
            <input
              type="radio"
              name="r1"
              style={{ cursor: "pointer" }}
              onClick={() => setPaymentType("COD")}
            />{" "}
            Cash On Delivery
          </div>) : ''}
          <div className="payment-type">
            <input
              type="radio"
              name="r1"
              style={{ cursor: "pointer" }}
              onClick={() => setPaymentType("Online")}
            />
            Pay Online
          </div>
          {orderType === "Dine In" || orderType === "Parcel" ? (<div className="payment-type">
            <input
              type="radio"
              name="r1"
              style={{ cursor: "pointer" }}
              onClick={() => setPaymentType("Pay at Counter")}
            />
            Pay at Counter
          </div>) : ''}
          <div className="continew" onClick={payBill}>
            Place a Order
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;
