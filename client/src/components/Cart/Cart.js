import React,{useMemo} from "react";
import "./cart.css";
import { useSelector,useDispatch } from "react-redux";
import {increase_qty,decrease_qty} from '../../redux/restuarentslice';
import Address from './Address'
import Payment from "./Payment";
import { useNavigate } from "react-router-dom";

function Cart() {
    const dispatch = useDispatch();
  const res_cartname = useSelector((state) => state.restuarents.cart_res_name);
  const cart = useSelector((state) => state.restuarents.cart);
  const usenavigate = useNavigate();
  const total_sum=useMemo(()=>{

    return cart.reduce((acc,item)=>{
      console.log("price price",item.price);
      let price;
      if(item.price){
         price = parseInt(item.price.toString().slice(0,-2))
      }else {
        price = parseInt(item.defaultPrice.toString().slice(0,-2))
      }
      return acc+price*item.qty;
    },0)
  },[cart])
  const Delivery_fee=useMemo(()=>{
    return Math.floor(Math.random()*100);
  },[])
  const increase=(item)=>{
    dispatch(increase_qty(item));
    console.log(item);
  }
  const decrease=(item)=>{
    dispatch(decrease_qty(item));
  }
  if (cart.length === 0) {
    return(
      <div className="flex justify-center items-center flex-col">
      <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt='no_cart' style={{width: "360px",
    marginTop: "40px"}}  />
      <div className="mt-3">
        <h1 className="mt-4" style={{textAlign:"center"}}>Your cart is empty</h1>
        <button className="mt-3" style={{padding: "15px",
    backgroundColor: "orange",
    color: "white"}} onClick={()=>usenavigate("/")}>SEE RESTUARANTS NEAR YOU</button>
      </div>
      </div>
    )
  }
  
  return (
    <div>
      <div className="w-4/5  m-auto mt-5 p-2">
        <div className="main_cartview flex justify-between  main_cart ">
          <div className="part_one">
            <div className="address_part ">
              <Address/>
            </div>
            <div className="address_part mt-5">
              <Payment/>
            </div>
          </div>
          <div className="cart_details shadow-lg">
            <div className="cartres_details flex gap-5 items-center">
              <img src={res_cartname.img} alt="res_photo" />
              <div>
                <h1>{res_cartname.name}</h1>
                <p>Place</p>
              </div>
            </div>
            <div className="items-details mt-5">
              {cart.map((item) => {
                return (
                  <div className=" flex justify-between items-center">
                    <div className="item_name">
                      <h1>{item.name}</h1>
                    </div>
                    <div>
                      <div className="flex justify-between items-center gap-5  cart_qty_buttons">
                        <button className="btn" onClick={()=>decrease(item.id)}>-</button>
                        <button>{item.qty}</button>
                        <button onClick={()=>increase(item.id)}>+</button>
                      </div>
                    </div>
                    <div>₹{item.price ? parseInt(item.price.toString().slice(0,-2)):parseInt(item.defaultPrice.toString().slice(0,-2))}</div>
                  </div>
                );
              })}
            </div>
            <div>
                <div>
                    <h1 style={{fontSize:"17px",marginTop:"31px"}}>Bill Details</h1>
                    <div className="bill_breakdown" style={{marginTop:"10px",fontSize:"14px"}}>
                        <div className="flex justify-between items-center pb-[6px]">
                            <h1>Item total</h1>
                            <h1>{total_sum}</h1>
                        </div>
                        <div className="flex justify-between items-center pb-[6px]">
                            <h1>Delievry Fee</h1>
                            <h1>{Delivery_fee}</h1>
                        </div>
                        <hr className="divider pb-[6px]" />
                        <div className="flex justify-between items-center">
                            <h1>Total</h1>
                            <h1>{total_sum+Delivery_fee}</h1>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
