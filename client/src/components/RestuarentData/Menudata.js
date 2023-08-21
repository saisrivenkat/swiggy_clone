import React from "react";
import Accordion from '../utils/Accordion';

function Menudata({ menu,res_data }) {
  console.log("menusData",menu)
  return (
    <div>
      <div>
        {menu.map((menu_item)=>{
          console.log("menu_item heading",menu_item.card.card.title,"menus",menu_item.card.card.itemCards)
          return(
            <Accordion res_data={res_data} heading={menu_item.card.card.title} menus={menu_item.card.card.itemCards} category={menu_item.card?.card?.categories}  />
          )
        })}
      </div>
    </div>
  );
}

export default Menudata;

