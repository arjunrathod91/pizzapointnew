import React from "react";
import "./Offers.css";
import Card from "../../components/Card/Card";
import burgerMeal from "../../Images/offers/burgermeal.png";
import pizzaMeal from "../../Images/offers/1+1.png";
import bigCombo from "../../Images/offers/bigcombo.png"


function Offers() {
  const offer = [
    {
      name: '1 + 1 Tandoori Chiken Pizza',
      price: '229',
      img: pizzaMeal,
      category:'offer',
      type:'non-veg',
      tag:'chicken pizza'
  },
  {
    name: '1 Chiken Grill Burger + 1 Regular Fries + 1 Cold Drink',
    price: '149',
    img: burgerMeal,
    category:'offer',
    type:'non-veg',
    tag:'chicken pizza'
},
{
  name: '2 Any Large Supreme Pizzas + 2 Cold Drinks + 1 Peri Peri Fries',
  price: '209',
  img:bigCombo,
  category:'offer',
  type:'non-veg',
  tag:'chicken pizza'
},
  ];
  return <div className="offer">
    <h3 style={{paddingLeft:'30px'}}>New Offers</h3>
    <div className="cont-offers">
    {offer.map((item,index) =>
            item.img ? (
              <Card item={item} key={item.name}/>
            ) : (
              ""
            )
          )}
    </div>
  </div>;
}

export default Offers;
