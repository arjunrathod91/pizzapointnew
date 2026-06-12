import React, { useContext, useEffect } from "react";
import "./Cart.css";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";


function Cart() {
  const {
    cart,
    setCart,
    total,
    setTotal,
    loggedIn,
    // userDetails,setUserDetails
  } = useContext(Context);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  // const newCart = JSON.parse(localStorage.getItem("cart")) || [];
  const newTotal = JSON.parse(localStorage.getItem("total")) || 0;

  const deleteItem = (item) => {
    const updatedItems = cart.filter((cartItem) => cartItem.name !== item.name);
    setCart(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    setTotal((prev) => {
      const updatedTotal = prev - item.price * item.quantity;
      localStorage.setItem("total", JSON.stringify(updatedTotal));
      return updatedTotal;
    });
    //update user cart in localStorage
    const userUpdate = {
      ...user,
      cart: {
        items: updatedItems,
        total: newTotal - item.price * item.quantity
      }
    };
    localStorage.setItem("user", JSON.stringify(userUpdate));
  };

  const increasingOrder = (item) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((cartItem) =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
    setTotal((prevTotal) => {
      const updatedTotal = prevTotal + Number(item.price);
      localStorage.setItem("total", JSON.stringify(updatedTotal));
      return updatedTotal;
    });
  };

  const decreasingOrder = (item) => {
    if (item.quantity > 1) {
      setCart((prevCart) => {
        const updatedCart = prevCart
          .map((cartItem) =>
            cartItem.name === item.name
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          )
          .filter((cartItem) => cartItem.quantity > 0);

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });

      setTotal((prevTotal) => {
        const updatedTotal = prevTotal - Number(item.price);
        localStorage.setItem("total", JSON.stringify(updatedTotal));
        return updatedTotal;
      });
    }
  };

  const orderNowBtn = async () => {
    // console.log(total);
    if (loggedIn || user) {
      if (total > 0) {
        navigate("/paymentmethod");
      }
    } else {
      navigate("/profile");
    }
  };

  useEffect(() => {
    if (cart.length === 0) {
      setTotal(0);
    }
  },[cart]);
  // useEffect(() => {
  //   if(user){
  //     setCart(user.cart.items);
  //     setTotal(user.cart.total);
  //   }
  // },[]);
  useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser && storedUser.cart) {
    setCart(storedUser.cart.items);
    // setTotal(storedUser.cart.total);
  }
}, []);
//   useEffect(() => {
//   if (user && user.cart) {
//     setCart((prevCart) => {
//       const newCart = [...prevCart];
//       user.cart.items.forEach((item) => {
//         const existingItem = newCart.find(i => i.id === item.id);
//         if (existingItem) {
//           existingItem.quantity += item.quantity;
//         } else {
//           newCart.push(item);
//         }
//       });

//       return newCart;
//     });
//     setTotal((prevTotal) => prevTotal + user.cart.total);
//   } //only when we we will store cart to user
// }, [user]);
  return (
    <div className="cart">
      {cart.length === 0 ? (
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
            alt=""
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
            <div className="item-box" key={index}>
              <div className="img-sec">
                <img src={item.img} alt="" />
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
            Total {cart.length === 0 ? 0 : total}
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
