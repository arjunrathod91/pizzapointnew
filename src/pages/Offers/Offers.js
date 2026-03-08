import React from "react";
import "./Offers.css";
import Card from "../../components/Card/Card";

function Offers() {
  const offer = [
    {
      name: '2 Crispy Burgers + 2 Regular Fries + 2 Regular Cold Drink',
      price: '189',
      img: 'https://www.everydayonsales.com/wp-content/uploads/sites/5/2020/09/9d165228-b4bc-4498-b74f-a995823982ee.jpg',
      category:'offer',
      type:'non-veg',
      tag:'chicken pizza'
  },
  {
    name: '2 Tandoori Paneer Pizza + Regular Cold Drink',
    price: '199',
    img: 'https://www.everydayonsales.com/wp-content/uploads/sites/5/2020/09/9d165228-b4bc-4498-b74f-a995823982ee.jpg',
    category:'offer',
    type:'non-veg',
    tag:'chicken pizza'
},
{
  name: 'Double Promo of 3 Regular Pizza For 200',
  price: '209',
  img: 'https://www.everydayonsales.com/wp-content/uploads/sites/5/2020/09/9d165228-b4bc-4498-b74f-a995823982ee.jpg',
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
              <Card item={item} key={index}/>
            ) : (
              ""
            )
          )}
    </div>
  </div>;
}

export default Offers;
