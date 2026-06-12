import React, { useContext,useEffect, useState } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const { setLoggedIn,loggedIn, cart, total,userDetails,setUserDetails } = useContext(Context);
  const [inputEmail, setInputEmail] = useState();
  const [inputPassword, setInputPassword] = useState();

  //   const handleBtn = async () => {
  //   try {
  //     const loginResponse = await axios.post(
  //       "http://localhost:8000/login",
  //       {
  //         email: inputEmail,
  //         password: inputPassword
  //       }
  //     );
  //     const loginData = loginResponse.data;
  //     if (!loginData.success) {
  //       alert("Invalid email or password");
  //       return;
  //     }
  //     localStorage.setItem("token", loginData.token);
  //     const token = loginData.token;
  //     const userResponse = await axios.get(
  //       "http://localhost:8000/userDetail", 
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     const userData = userResponse.data;
  //     localStorage.setItem("user", JSON.stringify(userData[0]));
  //     console.log("User data retrieved successfully:", userData[0]);
  //     navigate("/profile");
  //     console.log("Logged-in user data:", userData);
  //   } catch (err) {
  //     console.error("Login error:", err);
  //     alert("Something went wrong during login");
  //   }
  // };

  const handleBtn = async () => {
    try {
      const loginResponse = await axios.post(
        // "http://localhost:8000/login",
        "https://pizzapointserver.onrender.com/login",
        {
          email: inputEmail,
          password: inputPassword
        }
      );
      const loginData = loginResponse.data;
      if (!loginData.success) {
        alert("Invalid email or password");
        return;
      }
      localStorage.setItem("token", loginData.token);
      const userResponse = await axios.get(
        // "http://localhost:8000/userDetail",
        "https://pizzapointserver.onrender.com/userDetail",
        {
          headers: {
            Authorization: `Bearer ${loginData.token}`
          }
        }
      );
      const userData = userResponse.data;
      localStorage.setItem("user", JSON.stringify(userData));
      setUserDetails(userData);
      localStorage.setItem("loggedInStatus", JSON.stringify(true));
      setLoggedIn(true);
      console.log("User:", userData);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  const pushDummyData = async () => {
    const dummyUser = {
      username: "guest_" + Math.floor(Math.random() * 10000),
      email: "guest" + Date.now() + "@gmail.com",
      password: "guest_" + Math.random().toString(36).slice(2, 10),
      contact: "9" + Math.floor(100000000 + Math.random() * 900000000),
      address: "Guest Address",
      cart: {
        items: cart,
        total: total
      },
      order: []
    };
    try {
      await axios.post(
        // "http://localhost:8000/userDetail",
        "https://pizzapointserver.onrender.com/userDetail",
        dummyUser
      );
      const loginResponse = await axios.post(
        // "http://localhost:8000/login",
        "https://pizzapointserver.onrender.com/login",
        {
          email: dummyUser.email,
          password: dummyUser.password
        }
      );
      if (loginResponse.data.success) {
        localStorage.setItem("token", loginResponse.data.token);
        localStorage.setItem("user", JSON.stringify(dummyUser));
        setUserDetails(dummyUser);
        setLoggedIn(true);
        localStorage.setItem("loggedInStatus", JSON.stringify(true));
        navigate("/profile");
      } else {
        alert("Failed to login guest user");
      }
      console.log("Guest login response:", loginResponse.data);
    } catch (err) {
      console.error("Error with guest user:", err);
    }
  };

    useEffect(() => {
      const loggedInStatus = localStorage.getItem("loggedInStatus");
      setLoggedIn(loggedInStatus);
    }, []);
  
    useEffect(() => {
      if (loggedIn === 'true') {
        navigate("/profile");
      }
    }, []);
  return (
    <div className="login">
      <div className="login-box">
        <div className="header">
          <span className="login-txt">Login</span>
        </div>
        <div className="item">
          <label>
            <EmailIcon sx={{ fontSize: "16px" }} />
          </label>
          <input type="text" placeholder="Email" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
        </div>
        <div className="item">
          <label>
            <LockIcon sx={{ fontSize: "16px" }} />
          </label>
          <input type="password" placeholder="Password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
        </div>
        <button className="login-btn" onClick={() => {handleBtn() }}>Login</button>
        <span style={{ cursor: 'pointer' }} onClick={pushDummyData}>Login As Guest</span>
        <span onClick={() => navigate("/signup")} style={{ cursor: 'pointer' }}>Create New Account </span>
      </div>
    </div>
  );
}

export default Login;
