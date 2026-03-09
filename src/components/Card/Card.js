import React, { useContext } from "react";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { Context } from "../../context/Context";
import "./Card.css";
import axios from "axios";

function Card({ item, index }) {
  const { setCart, setTotal, cart,loggedIn } = useContext(Context);

  const user = JSON.parse(localStorage.getItem("user"));

  const cartObj = async (item) => {
    setCart((prevCart) => {
      return [...prevCart, { ...item, quantity: 1 }];
    });
    if(loggedIn){
      const userUpdate = {
      username: user.username,
      email: user.email,
      password: user.password,
      contact: user.contact,
      address: user.address,
      cart: [...cart, { ...item, quantity: 1 }], // Include the new item in the cart
    };
    console.log(userUpdate);
    try {
      const response = await axios.put(
        "https://pizzapointserver.onrender.com/userDetail",
        // "http://localhost:8000/userDetail",
        userUpdate
      );
      console.log("Cart updated successfully:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
    }
    setTotal((prevTotal) => prevTotal + Number(item.price));
  };

  // const deleteItem = (item) => {
  //   const updatedItems = cart.filter((cartItem) => cartItem.name !== item.name);
  //   setCart(updatedItems);
  //   setTotal((prev) => prev - item.price * item.quantity);
  // };
  return (
    <div className="dishes" item={item} key={index} index={index}>
      <img src={item.img ? item.img : ''} alt="" />
      <div className="content">
        <div className="d1">
          <h3>{item.name}</h3>
          <span className="rating">
            {item.rating ? item.rating : ''}
            {item.rating ? <StarHalfIcon sx={{ fontSize: 19 }} /> : 'Bestseller'}
          </span>
        </div>
        <div className="d2">
          <p>{item.ingridient ? item.ingridient.substring(0, 10) : ''}</p>
          <p className="price">₹{item.price}</p>
        </div>
        {cart.some((cartItem) => cartItem.name === item.name) ? (
          <button className="added"> 
          {/* onClick={() => deleteItem(item)} */}
          {/* onClick={() => navigate("/cart")} */}
            Added To Cart
          </button>
        ) : (
          <button className="order" onClick={() => cartObj(item)}>
            Order Now
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
