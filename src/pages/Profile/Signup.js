import React, { useContext, useState } from "react";
import "./profile.css";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";

function Signup() {
  const { setLoggedIn} =
    useContext(Context);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const handleBtn = () => {
    if (!username || !email || !password || !contact || !address) {
    alert("Please fill all fields");
    return;
  }
      const user = {
        "username":username,
        "email":email,
        "password":password,
        "contact":contact,
        "address":address
      }
      axios
        .post("https://pizzapointserver.onrender.com/userDetail", user)
        .then((response) => {
          console.log(response.data);
           alert("Signup Successfully!");
           navigate("/profile");
        })
        .catch((error) => {
          console.error("There was an error", error);
          alert("Failed to signup.");
        });
  };

  return (
    <div className="login">
      <div className="login-box">
        <div className="header">
          <span>Signup</span>
        </div>
        <div className="item">
          <label>
            <PersonIcon sx={{ fontSize: "16px" }} />
          </label>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="item">
          <label>
            <EmailIcon sx={{ fontSize: "16px" }} />
          </label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="item">
          <label>
            <LockIcon sx={{ fontSize: "16px" }} />
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="item">
          <label>
            <CallIcon sx={{ fontSize: "16px" }} />
          </label>
          <input
            type="text"
            placeholder="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className="item">
          <label>
            <HomeIcon sx={{ fontSize: "16px" }} />
          </label>
          <input
            type="text"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div
          className="login-btn"
          onClick={() => {
            setLoggedIn(true);
            handleBtn();
          }}
        >
          <span>Signup</span>
        </div>
        <span onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
          Login ?
        </span>
      </div>
    </div>
  );
}

export default Signup;
