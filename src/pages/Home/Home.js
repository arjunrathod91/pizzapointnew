import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import burger from "../../Images/burger.jpg";
import momos from "../../Images/momos.png";
import sandwitch from "../../Images/sandwitch.jpg";
import fries from "../../Images/fries.webp";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import Card from "../../components/Card/Card";
import axios from "axios";
import sliderImg1 from "../../Images/Slider/slider1.png"
import sliderImg2 from "../../Images/Slider/slider2.png"
import sliderImg3 from "../../Images/Slider/slider3.png"

function Home({ open }) {
  const navigate = useNavigate();
  const {
    setCategory, //use this
    userDetails,loggedIn,setLoggedIn
  } = useContext(Context);
  const imgSrc = [
    sliderImg1,
    sliderImg2,
    sliderImg3
  ];

  const [sliderImg, setSliderImg] = useState(imgSrc[0]);
  const [style, setStyle] = useState({});
  const [activeIndex, setActiveIndex] = useState("0");
  const [allItems, setAllItems] = useState([]); // use this
  const [loadMore, setLoadMore] = useState(10);
  const [loading, setLoading] = useState(false);
  const [inputName, setInputName] = useState();
  const [inputReview, setInputReview] = useState();
  const [reviews, setReviews] = useState();

  const transition = (newImg) => {
    setStyle({
      transform: "translateX(-100%)", // Add transform effect, for example, scaling the image
      transition: "transform 0.4s ease-in-out", // Apply smooth transition
    });
    setTimeout(() => {
      setSliderImg(newImg);
      setStyle({ transform: "translateX(0)", transition: "none" }); // Reset position after changing image
    }, 200);
  };

  // const itemData = JSON.parse(localStorage.getItem("itemData")) || [];
  // const newReviews = JSON.parse(localStorage.getItem("reviews")) || [];

  const pushReview = async () => {
    setLoading(true);
    const pushData = {
      username: inputName,
      review: inputReview
    };
    // console.log("Review submitted successfully:", pushData);
    // alert("Your review is submitted.");
    // https://pizzapointserver.onrender.com/reviews
    try {
      const response = await axios.post(
        // "http://localhost:8000/reviews",
        "https://pizzapointserver.onrender.com/reviews",
        pushData
      );

      // 🔥 instantly update UI
      //push reviews to localhost
      setReviews((prev) => [...prev, response.data.data]);

      setInputName("");
      setInputReview("");

      alert("Review submitted");

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const newReviews = [
  //   {
  //     name: "Sneha Jadhav",
  //     review:
  //       "Ordered late at night and the pizza arrived hot and fresh. The cheese was perfectly melted and the packaging was great. Highly recommended!",

  //   },
  //   {
  //     name: "Rahul Jadhav",
  //     review:
  //       "Ordered late at night and the pizza arrived hot and fresh. The cheese was perfectly melted and the packaging was great. Highly recommended!",

  //   },
  //   {
  //     name: "Karan Rathod",
  //     review:
  //       "Ordered late at night and the pizza arrived hot and fresh. The cheese was perfectly melted and the packaging was great. Highly recommended!",

  //   }
  // ]

  //   useEffect(() => {
  //   const wakeServer = async () => {
  //     try {
  //       await axios.get("https://pizzapointserver.onrender.com/");
  //       console.log("Server is awake");
  //     } catch (err) {
  //       console.log("Waking server...");
  //     }
  //   };
  //UptimeRobot (free)
  //   wakeServer();
  // }, []);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          "https://pizzapointserver.onrender.com/allItems"
          // "http://localhost:8000/allItems"
        );
        localStorage.setItem("itemData", JSON.stringify(response.data));
        const storedItems = localStorage.getItem("itemData");
        setAllItems(JSON.parse(storedItems));
      } catch (err) {
        console.error("Error fetching menu data:", err);
        console.log(err);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "https://pizzapointserver.onrender.com/reviews"
          // "http://localhost:8000/reviews"
        );
        // setReviews(response.data);
        localStorage.setItem("reviews", JSON.stringify(response.data));
        const storedReviews = localStorage.getItem("reviews");
        setReviews(JSON.parse(storedReviews));
      } catch (err) {
        console.error("Error fetching menu data:", err);
        console.log(err);
      }
    };
    fetchMenu();
    fetchReviews();
    const status = localStorage.getItem("loggedInStatus");
    if(status){
      setLoggedIn(status);
    }
    // console.log(loggedIn);
    // console.log(userDetails);
    // console.log("status",status);
  },[]);

  const categoryClick = (item) => {
    localStorage.setItem("category", item);
  };

  // useEffect(() => {
  //   const storedReviews = localStorage.getItem("reviews");
  //   const storedItems = localStorage.getItem("itemData");

  //   if (storedReviews) {
  //     setReviews(JSON.parse(storedReviews));
  //   }
  //   if (storedItems) {
  //     setAllItems(JSON.parse(storedItems));
  //   }
  // }, [reviews,allItems]);

  const isValidImage = (url) => {
    return (
      typeof url === "string" && url.startsWith("http") && url.trim() !== ""
    );
  };
  return (
    <div className="home">
      {/* <div
        className="sidebar-section"
        style={{ display: `${open ? "flex" : "none"}` }}
      >
        <Sidebar />
      </div> */}
      <div className="overflow">
        <div className="slider">
          <img src={sliderImg} style={style} alt="" />
          <div className="controls">
            <div
              className={`ball ${activeIndex === "0" ? "active" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => {
                transition(imgSrc[0]);
                setActiveIndex("0");
              }}
            ></div>
            <div
              className={`ball ${activeIndex === "1" ? "active" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => {
                transition(imgSrc[1]);
                setActiveIndex("1");
              }}
            ></div>
            <div
              className={`ball ${activeIndex === "2" ? "active" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => {
                transition(imgSrc[2]);
                setActiveIndex("2");
              }}
            ></div>
          </div>
          {/* <div className="s-left">
            <img src={''} alt="" />
          </div> */}
          {/* <div className="s-right">
            <strong>Pizza Point</strong>
            <p>Cheesy Fun Flavour</p>
            <button>Order Now</button>
          </div> */}
        </div>
      </div>
      <section className="section1">
        <div className="s1-up">
          <h2>Dishes</h2>
        </div>
        <div className="s1-down">
          <div
            className="box"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setCategory("pizza");
              navigate("/menu");
              categoryClick("pizza");
            }}
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/021/311/747/non_2x/pizza-transparent-background-png.png"
              alt=""
            />
            <p>Pizza</p>
          </div>
          <div
            className="box"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setCategory("burger");
              navigate("/menu");
              categoryClick("burger");
            }}
          >
            <img src={burger} alt="" />
            <p>Burger</p>
          </div>
          <div
            className="box"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setCategory("fries");
              navigate("/menu");
              categoryClick("fries");
            }}
          >
            <img src={fries} alt="" />
            <p>Fries</p>
          </div>
          <div
            className="box"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setCategory("momos");
              navigate("/menu");
              categoryClick("momos");
            }}
          >
            <img src={momos} alt="" />
            <p>Momos</p>
          </div>
          <div
            className="box"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setCategory("sandwich");
              navigate("/menu");
              categoryClick("sandwitch");
            }}
          >
            <img src={sandwitch} alt="" />
            <p>Sandwitch</p>
          </div>
        </div>
      </section>
      <section className="section2">
        <h2>{allItems.length > 0 ? "Bestseller" : ""}</h2>
        <div className="s2-down">
          {allItems.length > 0 ? (
            allItems.slice(0, loadMore).map((item, index) =>
              item?.img && isValidImage(item.img) ? (
                // (
                <Card item={item} key={index} index={index} />
              ) : (
                // )
                ""
              )
            )
          ) : (
            <div className="s2-down" style={{ display: 'flex', gap: '30px' }}>
              <Box>
                <Skeleton variant="rectangular" width={210} height={118} />
                {/* <Skeleton /> */}
                <Skeleton width="60%" />
                <Skeleton width="60%" />
              </Box>
              <Box>
                <Skeleton variant="rectangular" width={210} height={118} />
                {/* <Skeleton /> */}
                <Skeleton width="60%" />
                <Skeleton width="60%" />
              </Box>
              <Box>
                <Skeleton variant="rectangular" width={210} height={118} />
                {/* <Skeleton /> */}
                <Skeleton width="60%" />
                <Skeleton width="60%" />
              </Box>
            </div>
          )}
        </div>
        {allItems.length > loadMore && (
          <div
            onClick={() => setLoadMore((prev) => prev + 10)}
            style={{ display: "flex", justifyContent: "center", alignContent: 'center', color: 'blue', cursor: 'pointer' }}
          >
            See More
          </div>
        )}
      </section>
      {/* {allItems.length > 0 ? console.log(true) : console.log(false)}
      <section className="section2">
        <h2>Top Dishes</h2>
        <div className="s2-down">
          {pizza.map((item, index) => (
            <Card item={item} index={index}/>
          ))}
        </div>
      </section> */}
      {/* <section className="call-delivery"> */}
      {/* <div><img src={telephone} alt="" />
        <p className="delivery-text">Call On Delivary</p>
        </div>
        <div>
          <img src={delivary} alt="" />
          <p className="order-no">+91 7350887544</p>
        </div> */}
      {/* </section> */}
      <section className="reviews">
        <div className="heads"> Reviews</div>
        <div className="block">
          {reviews ? reviews.map((item, index) => (
            <div className="review" key={index}>
              <p>
                {item.review}
              </p>
              <div className="name-box">
                <p className="name">- {item.username}</p>
              </div>
            </div>
          )) : (<>No Reviews</>)}
        </div>
      </section>
      <section className="write-review">
        <div className="heads"> Write a Review</div>
        <div className="write-block">
          {/* <div>
            <input placeholder="Email" name="email" />
          </div> */}
          <div>
            <input placeholder="Username" onChange={(e) => setInputName(e.target.value)} value={inputName} />
          </div>
          <div>
            <textarea placeholder="Message" rows={5} onChange={(e) => setInputReview(e.target.value)} value={inputReview} />
          </div>
          <button style={{ cursor: 'pointer' }} onClick={pushReview}>{loading ? "Submitting..." : "Submit"}</button>

        </div>
        {/* <h2>Write a Review</h2>
        <div >
          <input type="text" placeholder="Your Name" />
          <input type="text" placeholder="Your Email" />
          <textarea
            cols="30"
            rows="10"
            placeholder="Write your review here..."
          ></textarea>
          <button>Submit</button>
        </div> */}
      </section>
      <Footer />

    </div>

  );
}

export default Home;

