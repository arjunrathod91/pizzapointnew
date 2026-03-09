import React, { useContext, useState } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const { setLoggedIn} = useContext(Context);
  const [inputEmail,setInputEmail] = useState();
  const [inputPassword,setInputPassword] = useState()

  const handleBtn = async ()=>{
    const fetchMenu = async () => {
      try {
        const response = await axios.post('https://pizzapointserver.onrender.com/login', {
          email: inputEmail,
          password: inputPassword
        });
    
        if (response.data.success) {
          navigate('/profile');
        } else {
          alert('Invalid email or password');
        }
        
        const userData = response.data;
        console.log(userData);
        localStorage.setItem("user", JSON.stringify(userData.user));
    
      } catch (err) {
        console.error('Error fetching menu data:', err);
      }
    };

    fetchMenu();
  }

  const pushDummyData = () => {

  const dummyUser = {
      username: "guest101",
      email: "guest101@gmail.com",
      password: "guest1234",
      contact: "1234567890",
      address: "address guest",
  };
   axios
        .post("https://pizzapointserver.onrender.com/userDetail", dummyUser)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error", error);
          // alert("Failed to signup.");
        });
        // alert("Signup Successfully!");
        localStorage.setItem("user", JSON.stringify(dummyUser));
        setLoggedIn(true);
        navigate("/profile");
};
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
            <input type="text" placeholder="Email" value={inputEmail} onChange={(e)=>setInputEmail(e.target.value)} />
          </div>
          <div className="item">
            <label>
              <LockIcon sx={{ fontSize: "16px" }} />
            </label>
            <input type="password" placeholder="Password" value={inputPassword} onChange={(e)=>setInputPassword(e.target.value)} />
          </div>
            <button className="login-btn" onClick={()=>{setLoggedIn(true);handleBtn()}}>Login</button>
          <span onClick={pushDummyData}>Login As Guest</span>
          <span onClick={() => navigate("/signup")} style={{cursor:'pointer'}}>Create New Account </span>
        </div>
    </div>
  );
}

export default Login;
