import React from "react";
import "./Offers.css";
import Card from "../../components/Card/Card";

function Offers() {
  const offer = [
    {
      name: 'Double Promo of 3 Regular Pizza For 200',
      price: '119',
      img: 'https://www.everydayonsales.com/wp-content/uploads/sites/5/2020/09/9d165228-b4bc-4498-b74f-a995823982ee.jpg',
      category:'offer',
      type:'non-veg',
      tag:'chicken pizza'
  },
  {
    name: 'Double Promo of 3 Regular Pizza For 200',
    price: '119',
    img: 'https://www.everydayonsales.com/wp-content/uploads/sites/5/2020/09/9d165228-b4bc-4498-b74f-a995823982ee.jpg',
    category:'offer',
    type:'non-veg',
    tag:'chicken pizza'
},
{
  name: 'Double Promo of 3 Regular Pizza For 200',
  price: '119',
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
              <Card item={item} key={index} index={index} />
            ) : (
              ""
            )
          )}
    </div>
  </div>;
}

export default Offers;
