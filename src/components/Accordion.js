import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./accordion.css";
const Accordion = ({ heading, menus }) => {
  const [show, setshow] = useState(false);
  const [cart,setcart] = useState([])
  const addToCart=(item)=>{
    
    console.log(item);
    setcart([...cart,item])
  }
  return (
    <>
      <div>
        <div
          className="flex justify-between items-center p-5"
          onClick={() => setshow(!show)}>
          <h1>
            {heading}
            <span style={{ margin: "0 0 0 10px" }}>({menus.length})</span>
          </h1>
          {show ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </div>
        {show && (
          <div className={show ? "menu" : "menu hide"}>
            {menus.map((menu_item) => {
              return (
                <>
                  <div className="p-5 item_outer">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex gap-2">
                          {menu_item.card.info.itemAttribute.vegClassifier ===
                          "NONVEG" ? (
                            <img
                              src="https://img.icons8.com/?size=20&id=61082&format=png"
                              alt="non_veg_logo"
                            />
                          ) : (
                            <img
                              src="https://img.icons8.com/?size=20&id=61083&format=png"
                              alt="veg_logo"
                            />
                          )}
                          <span style={{ color: "#ee9c0" }}>
                            {menu_item.card.info.ribbon.text}
                          </span>
                        </div>
                        <h1>{menu_item.card.info.name}</h1>
                        <p style={{width:"70%"}}>{menu_item.card.info.description}</p>
                      </div>
                      <div className="item_img_cart">
                        <div className="item_logo">
                          {menu_item.card.info.imageId ? (
                            <img
                              alt="res_item_logo"
                              width='118'
                              height="96"
                              src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${menu_item.card.info.imageId}`}
                            />
                          ) : (
                            <img
                              alt="n_image"
                              src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                            />
                          )}
                        </div>
                        <div className="cart">
                            {cart.length === 0 && <button className="cart_button shadow-xl" onClick={()=>addToCart(menu_item.card.info)}>Add</button> }
                            {cart.filter((menu_items)=>menu_items.id!==menu_item.card.info.id).map((item)=>{
                                   
                                        console.log(item.id,menu_item.id)
                                        return(
                                        <button className="cart_button shadow-xl" onClick={(menu_item)=>addToCart(menu_item)}>Add</button>
                                        )
                                    
                                
                            })}
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </>
              );
            })}
          </div>
        )}
      </div>
      <div className="blank_space"></div>
    </>
  );
};
export default Accordion;
