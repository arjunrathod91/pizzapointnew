import React, { useContext, useEffect, useState } from "react";
// import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
// import pizza from "../../Images/pizza img 2.png";
// import allItems from "../../data/menu";
import burger from "../../Images/burger.jpg";
import momos from "../../Images/momos.png";
import sandwitch from "../../Images/sandwitch.jpg";
import fries from "../../Images/fries.webp";
// import telephone from "../../Images/telephone.png";
// import delivary from "../../Images/delivery-bike.png";
// import veggieSupreme from "../../Images/veggie supreme.jpg";
// import StarHalfIcon from "@mui/icons-material/StarHalf";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import Card from "../../components/Card/Card";
import axios from "axios";
import sliderImg1 from "../../Images/Slider/slider1.png"
import sliderImg2 from "../../Images/Slider/slider2.png"
import sliderImg3 from "../../Images/Slider/slider3.png"
// import { Troubleshoot } from "@mui/icons-material";

function Home({open}) {
  const navigate = useNavigate();
  const {
    // sidebarOpen,
    // setSidebarOpen,
    // cart,
    // setCart,
    // total,
    // setTotal,
    // category,
    setCategory,
  } = useContext(Context);

  // const cartObj = (item) => {
  //   setCart((prevCart) => {
  //     return [...prevCart, { ...item, quantity: 1 }];
  //   });
  //   setTotal((prevTotal) => prevTotal + Number(item.price));
  // };
  const imgSrc = [
    sliderImg1,
    sliderImg2,
    sliderImg3
  ];

  const [sliderImg, setSliderImg] = useState(imgSrc[0]);
  const [style, setStyle] = useState({});
  const [activeIndex, setActiveIndex] = useState("0");
  const [allItems, setAllItems] = useState([]);
  const [loadMore, setLoadMore] = useState(10);
  // const [close,setClose] = useState(false);

  const transition = (newImg) => {
    setStyle({
      transform: "translateX(-100%)", // Add transform effect, for example, scaling the image
      transition: "transform 0.4s ease-in-out", // Apply smooth transition
    });

    // Reset the style after the transition is complete (optional)
    // setTimeout(() => {
    //   setStyle({});
    // }, 400);
    setTimeout(() => {
      setSliderImg(newImg);
      setStyle({ transform: "translateX(0)", transition: "none" }); // Reset position after changing image
    }, 200);
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          "https://pizzapointserver.onrender.com/allItems"
          // "http://localhost:8000/allItems"
        );
        setAllItems(response.data);
      } catch (err) {
        console.error("Error fetching menu data:", err);
        console.log(err);
      }
    };

    fetchMenu();
  }, []);

  const categoryClick = (item) => {
    // setTimeout(()=>{
    //   localStorage.setItem("category",category)
    // },3000)
    localStorage.setItem("category", item);
  };

  const isValidImage = (url) => {
    // Check for a valid URL structure
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
          <img src={sliderImg} style={style} alt=""/>
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
            <div className="loading">
              <img src="https://icon-library.com/images/burger-icon-png/burger-icon-png-1.jpg" alt="" />
              <div style={{ marginLeft: "5px" }}>Loading ...</div>
            </div>
          )}
        </div>
        {allItems.length > loadMore && (
          <div
          onClick={() => setLoadMore((prev) => prev + 10)}
          style={{ display: "flex",justifyContent:"center",alignContent:'center',color:'blue',cursor:'pointer' }}
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
          <div className="review">
            {/* <img
              src="https://th.bing.com/th/id/R.401e039791cb60a99db7574995b20ac5?rik=rp30JJuIzeQdWg&riu=http%3a%2f%2fwww.dailyexcelsior.com%2fwp-content%2fuploads%2f2018%2f12%2fShahrukh-Khan.jpg&ehk=6AraZHbQ%2fZ2Gti88ZqaMmCK05C74TjyOsO%2buVFCUT3I%3d&risl=&pid=ImgRaw&r=0"
              alt=""
            /> */}
            {/* <div>Rating</div> */}
            <p>
              "Ordered late at night and the pizza arrived hot and fresh. The cheese was perfectly melted and the packaging was great. Highly recommended!""
            </p>
            <div className="name-box">
            <p className="name">- Sneha Jadhav</p>
            </div>
          </div>
          <div className="review">
            {/* <img
              src="https://th.bing.com/th/id/R.401e039791cb60a99db7574995b20ac5?rik=rp30JJuIzeQdWg&riu=http%3a%2f%2fwww.dailyexcelsior.com%2fwp-content%2fuploads%2f2018%2f12%2fShahrukh-Khan.jpg&ehk=6AraZHbQ%2fZ2Gti88ZqaMmCK05C74TjyOsO%2buVFCUT3I%3d&risl=&pid=ImgRaw&r=0"
              alt=""
            /> */}
            {/* <div>Rating</div> */}
            <p>
              “Great experience overall. Friendly service and quick delivery. The garlic bread and pizza combo was amazing.”
            </p>
            <div className="name-box">
            <p className="name">- Rahul Pawar</p>
            </div>
          </div>
          <div className="review">
            {/* <img
              src="https://th.bing.com/th/id/R.401e039791cb60a99db7574995b20ac5?rik=rp30JJuIzeQdWg&riu=http%3a%2f%2fwww.dailyexcelsior.com%2fwp-content%2fuploads%2f2018%2f12%2fShahrukh-Khan.jpg&ehk=6AraZHbQ%2fZ2Gti88ZqaMmCK05C74TjyOsO%2buVFCUT3I%3d&risl=&pid=ImgRaw&r=0"
              alt=""
            /> */}
            {/* <div>Rating</div> */}
            <p>
              "One of the best pizzas I’ve had recently. The crust was perfectly baked and the toppings tasted very fresh. Definitely ordering again from PizzaPoint!"
            </p>
            <div className="name-box">
            <p className="name">- Avinash Kumar</p>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="write-review"> */}
        {/* <h2>Write a Review</h2> */}
        {/* <div >
          <input type="text" placeholder="Your Name" />
          <input type="text" placeholder="Your Email" />
          <textarea
            cols="30"
            rows="10"
            placeholder="Write your review here..."
          ></textarea>
          <button>Submit</button>
        </div> */}
      {/* </section> */}
      <Footer />

    </div>

  );
}

export default Home;

