import React from "react";
import Accordion from './Accordion';

function Menudata({ menu }) {
  return (
    <div>
      <div>
        
        {menu.map((menu_item)=>{
          return(
            <Accordion heading={menu_item.card.card.title} menus={menu_item.card.card.itemCards}  />
          )
        })}
      </div>
    </div>
  );
}

export default Menudata;

