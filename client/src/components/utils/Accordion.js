import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "./Button";
import "./accordion.css";
import { useSelector } from "react-redux";
const Accordion = (props) => {
  const {heading,menus,category,res_data} = props;
  const [show, setshow] = useState(false);
  const cartItems = useSelector((state) => state.restuarents.cart);
  const cart_res_name = useSelector((state) => state.restuarents.cart_res_name);
  return (
    <>
      <div>
        <div
          className="flex justify-between items-center p-5"
          onClick={() => setshow(!show)}>
          <h1>
            {heading}
            {menus&&<span style={{ margin: "0 0 0 10px" }}>({menus&& ((menus.length))})</span>}
          </h1>
          {show ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </div>
        {show && (
          <div className={show ? "menu" : "menu hide"}>
            {category?.map((category_item) => {
              return (
                <>
                <Accordion heading={category_item.title} menus={category_item.itemCards} />
                </>
              )
              })}
            {menus?.map((menu_item) => {
              return (
                <React.Fragment key={menu_item.card.info.id}>
                  <div className="p-5 item_outer">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex gap-2">
                          {menu_item?.card?.info?.itemAttribute?.vegClassifier ===
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
                        <p style={{ width: "70%" }}>
                          {menu_item.card.info.description}
                        </p>
                      </div>
                      <div
                        className="item_img_cart"
                        style={{ position: "relative" }}>
                        <div className="item_logo">
                          {menu_item.card.info.imageId ? (
                            <img
                              alt="res_item_logo"
                              width="118"
                              height="96"
                              src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/${menu_item.card.info.imageId}`}
                            />
                          ) : (
                            <img
                              alt="n_image"
                              src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                            />
                          )}
                        </div>
                        <div style={{ position: "absolute", bottom: "0" }}>
                          <Button
                          count={cartItems.find((item)=>{
                            if(item.id === menu_item.card.info.id){
                              return item.qty;
                            }

                          })}
                            item={menu_item.card.info}
                            isthere={cartItems.find(
                              (item) => item.id === menu_item.card.info.id
                            )}
                            res_data ={res_data}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
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
