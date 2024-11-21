import React, { useContext, useEffect } from "react";
import "../Menu/Menu.css";
import allItems from "../../data/menu";
import { Context } from "../../context/Context";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import Card from "../../components/Card/Card";

function Menu() {
  const { category, setCategory } = useContext(Context);

  const press = () => {
    console.log(allItems);
  };

  const categoryItems = allItems.filter((item) => item.category === category);

  useEffect(() => {}, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  

  return (
    <div className="menus">
      {/* <div className='heading'>
            <p onClick={press}>Menu</p>
        </div> */}
      <div>
        <div style={{display:'flex',fontSize:'20px'}}>
        <h3>{capitalizeFirstLetter(category)}</h3>
        </div>
        
        <div className="tank">
          {categoryItems.map((item,index) => (
            <Card item={item} index={index}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
