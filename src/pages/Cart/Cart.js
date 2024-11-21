import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import logo from "../../Images/logo.png";
import axios from "axios";

function Cart() {
  const {
    cart,
    setCart,
    total,
    setTotal,
    loggedIn,
    setLoggedIn,
    allorders,
    setAllOrders,
    newOrder,
    setNewOrder,
    adminOrders,
    setAdminOrders,
    profileDetails,
    setProfileDetails,
  } = useContext(Context);

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const deleteItem = (item) => {
    const updatedItems = cart.filter((cartItem) => cartItem.name !== item.name);
    setCart(updatedItems);
    setTotal((prev) => prev - item.price * item.quantity);
  };

  const increasingOrder = (item) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
    setTotal((prevTotal) => prevTotal + Number(item.price));
  };

  const decreasingOrder = (item) => {
    if (item.quantity > 1) {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
      setTotal((prevTotal) => prevTotal - Number(item.price));
    }
  };

  const orderNowBtn = async () => {
    if (loggedIn) {
      if (total > 0) {
        const currentDate = new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        });
        const cartWithDate = cart.map((item) => ({
          ...item,
          date: currentDate,
        }));
        setAllOrders((prevOrders) => [...prevOrders, ...cartWithDate]);

        const latestOrder = profileDetails;
        latestOrder["latestOrder"] = cartWithDate;
        latestOrder["total"] = total;
        localStorage.setItem("newOrder", JSON.stringify(latestOrder));
        const prevOrders = JSON.parse(localStorage.getItem("adminOrder")) || [];
        localStorage.setItem(
          "adminOrder",
          JSON.stringify([...prevOrders, latestOrder])
        );

        const userUpdate = {
          username: user[0].username,
          email: user[0].email,
          password: user[0].password,
          contact: user[0].contact,
          address: user[0].address,
          cart: cart,
          order: cart,
        };
        const userOrder = {
          username: user[0].username,
          email: user[0].email,
          password: user[0].password,
          contact: user[0].contact,
          address: user[0].address,
          order: cart,
          total:total
        };
        try {
          const response1 = await axios.put(
            "https://pizzapointserver-1.onrender.com/userDetail",
            userUpdate
          );
          navigate("/paymentmethod");
          console.log("Order updated successfully:", response1.data);
        } catch (error) {
          console.log(error);
        }

        try {
          const response = await axios.post(
            "https://pizzapointserver-1.onrender.com/newOrder",
            userOrder
          );
          console.log("the data of user sent successfully:", response.data);
        } catch (error) {
          console.log(error);
        }

        // setNewOrder(latestOrder)
        // setAdminOrders((prevOrders) => [...prevOrders, newOrder])
        // console.log(newOrder)
        // console.log(adminOrders)
        // const latestOrder = newOrder.map((item)=>{
        //   //wanted to add user detail like name and
        // })
        // setAdminOrders((prevOrders) => [...prevOrders, ...latestOrder])
        // handlePayment();
      }
    } else {
      navigate("/profile");
    }
  };

  const handlePayment = () => {
    const options = {
      key: "rzp_test_HY5jMRQoTZLe2y", // Enter your Razorpay Key ID
      amount: `${total * 100}`, // Amount in paise (50000 paise = 500 INR){newPrice}
      currency: "INR",
      name: "Pizza Point",
      description: "Test Transaction",
      //   order_id:`order_${uuid.split('-')[0]}`,
      image: `${logo}`, // Optional: Add your logo URL
      handler: function (response) {
        navigate("/orderdetails");
        alert(`Payment successful: ${response.razorpay_payment_id}`);
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

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    if (cart.length == 0) {
      setTotal(0);
    }
  });
  return (
    <div className="cart">
      {cart.length == 0 ? (
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            opacity: "50%",
          }}
        >
          <div
            style={{
              fontWeight: "500",
              fontFamily: "sans-serif",
              fontSize: "20px",
            }}
          >
            Your cart is empty
          </div>
          <img
            style={{ height: "250px", width: "250px" }}
            src="https://img.freepik.com/premium-vector/pizza-food-truck-vector-illustration_444196-6061.jpg?w=2000"
          />
          <button
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px 20px",
              fontWeight: "500",
              border: "none",
              outline: "none",
              borderRadius: "4px",
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Order Now
          </button>
        </div>
      ) : (
        <div className="cart-box">
          {cart.map((item, index) => (
            <div className="item-box" index={index}>
              <div className="img-sec">
                <img src={item.img} />
              </div>
              <div className="info-sec">
                <strong>{item.name}</strong>
                <p>{item.ingridient}</p>
                <h2>₹{item.price}</h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    gap: "10px",
                  }}
                >
                  Quantity{" "}
                  <button onClick={() => decreasingOrder(item)}>-</button>
                  {item.quantity}
                  <button onClick={() => increasingOrder(item)}>+</button>
                </div>
                <p>{item.type}</p>
                <div
                  style={{
                    cursor: "pointer",
                    color: "black",
                    height: "20px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "end",
                  }}
                  onClick={() => deleteItem(item)}
                  className="remove"
                >
                  <DeleteIcon />
                </div>
              </div>
            </div>
          ))}
          {/* <div>Add Ons</div>
          <div>Pepsi</div> total + pepsi and obj + pepsi
          <div>Cola</div>
          <div>Cola</div> */}
          <button className="order-btn" onClick={orderNowBtn}>
            Order Now {cart.length == 0 ? 0 : total}
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
