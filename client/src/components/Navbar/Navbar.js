import React from "react";
import swiggy_logo from "../../assests/swiggy.svg";
import cartsvg from "../../assests/cart.svg";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {useNavigate} from 'react-router-dom'
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { set_sidebar,set_loginsidebar } from "../../redux/restuarentslice";
const Navbar = () => {
  const cartItem = useSelector((state) => state.restuarents.cart);
  const issidebar = useSelector((state) => state.restuarents.isSidebar);
  const isLoginSidebar = useSelector((state)=>state.restuarents.isLoginSidebar)
  const userDetails = useSelector((state)=>state.restuarents.userDetails);
  const city = useSelector((state) => state.restuarents.location.city);
  const dispatch = useDispatch();
  const name = userDetails?.name !== undefined ? userDetails?.name : "Login";
  const navigate = useNavigate()
  const setsidebar = () => {
    dispatch(set_sidebar());
    if (issidebar) {
      const ele = document.getElementById("outer_overlay");
      ele.classList.remove("overlay");
      document.body.style.overflow = "unset";
    } else {
      const ele = document.getElementById("outer_overlay");
      ele.classList.add("overlay");
      document.body.style.overflow = "hidden";
    }
  };
  const setLoginSidebar = () => {
    if(userDetails?.name !== undefined){
      return navigate('/profile')
    }
    dispatch(set_loginsidebar());
    if (isLoginSidebar) {
      const ele = document.getElementById("outer_overlay");
      ele.classList.remove("overlay");
      document.body.style.overflow = "unset";
    } else {
      const ele = document.getElementById("outer_overlay");
      ele.classList.add("overlay");
      document.body.style.overflow = "hidden";
    }
  }
  return (
    <div
      className=""
      style={{
        boxShadow: "0 2px 10px #171a2927",
      }}>
      <div className="flex justify-between items-center p-4 w-4/5 m-auto">
        <div className="flex  items-center" style={{ gap: "1.5rem" }}>
          <div onClick={()=>navigate('/')} style={{cursor:"pointer"}}>
            <img src={swiggy_logo} alt="swiggy_logo" />
          </div>
          <div className="address flex gap-2 items-center" onClick={setsidebar}>
            <div className="others">
              <p>Others</p>
            </div>
            <div className="items-center location flex ">
              <p>{city}</p>
              <KeyboardArrowDownIcon />
            </div>
            <div></div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2" onClick={()=>navigate('/cart')} style={{cursor:"pointer"}}>
            <div className="cart_icon" >
              <img src={cartsvg} alt="cart_logo" height="20" width="20" />
              <span className="text-sm">{cartItem.length}</span>
            </div>

            <span>Cart</span>
          </div>
          <div className="gap-2"  onClick={setLoginSidebar}>
            <PermIdentityOutlinedIcon /> <span>{name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
