import React, { useContext } from "react";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { Context } from "../../context/Context";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Card({ item, index }) {
  const { setCart, setTotal, cart, loggedIn,userDetails,setUserDetails } = useContext(Context);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const newCart = JSON.parse(localStorage.getItem("cart")) || [];
  const newTotal = JSON.parse(localStorage.getItem("total")) || 0;

  const cartObj = async (item) => {
    // setCart((prevCart) => {
    //   return [...prevCart, { ...item, quantity: 1 }];
    // });
    // localStorage.setItem("cart", JSON.stringify());
    if (loggedIn && user) {
      setCart((prevCart) => {
        const updatedCart = [...prevCart, { ...item, quantity: 1 }];
        return updatedCart;
      });
      setTotal((prevTotal) => {
        const updatedTotal = prevTotal + Number(item.price);
        return updatedTotal;
      });
      // newTotal = newTotal + Number(item.price);
      // const userUpdate = {
      //   username: user.username,
      //   email: user.email,
      //   password: user.password,
      //   contact: user.contact,
      //   address: user.address,
      //   cart: {
      //     items: [...user.cart.items, { ...item, quantity: 1 }],
      //     total: user.cart.total + Number(item.price)
      //   },
      //   order: user.order
      // };
      const userUpdate = {
        ...user,
        cart: {
          items: [...user.cart.items ? user.cart.items : [], { ...item, quantity: 1 }],
          total: user.cart.total + Number(item.price)
        }
      };
      console.log(userUpdate);
      localStorage.setItem("user", JSON.stringify(userUpdate));
      // try {
      //   const response = await axios.put(
      //     "http://localhost:8000/userDetail",
      //     // "http://localhost:8000/userDetail",
      //     userUpdate
      //   );
      //   console.log("Cart updated successfully:", response.data);
      //   localStorage.setItem("user", JSON.stringify(response.data));
      // } catch (error) {
      //   console.log(error);
      // }
    } else {
      setCart((prevCart) => {
        const updatedCart = [...prevCart, { ...item, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
      setTotal((prevTotal) => {
        const updatedTotal = prevTotal + Number(item.price);
        localStorage.setItem("total", JSON.stringify(updatedTotal));
        return updatedTotal;
      });
    }
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
        {newCart.some((cartItem) => cartItem.name === item.name) ? (
          <button className="added">
            {/* onClick={() => deleteItem(item)} */}
            {/* onClick={() => navigate("/cart")} */}
            Added To Cart *
            {/* Go To Cart */}
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
