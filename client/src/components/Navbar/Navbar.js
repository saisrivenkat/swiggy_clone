import React from "react";
import swiggy_logo from "../../assests/swiggy.svg";
import cartsvg from "../../assests/cart.svg";
import cartGreen from '../../assests/cartgreen.svg'
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {useNavigate} from 'react-router-dom'
import "./navbar.css";

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useDispatch, useSelector } from "react-redux";
import { set_sidebar,set_loginsidebar,set_userDetails } from "../../redux/restuarentslice";
import Logout from '@mui/icons-material/Logout';
const Navbar = () => {
  const cartItem = useSelector((state) => state.restuarents.cart);
  const issidebar = useSelector((state) => state.restuarents.isSidebar);
  const isLoginSidebar = useSelector((state)=>state.restuarents.isLoginSidebar)
  const userDetails = useSelector((state)=>state.restuarents.userDetails);
  const city = useSelector((state) => state.restuarents.location.city);
  const dispatch = useDispatch();
  const name = userDetails?.name !== undefined ? userDetails?.name : "Login";
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open=Boolean(anchorEl);

  const profile=()=>{
    navigate('/profile')
    setAnchorEl(null)
  }
  const logout=()=>{
    dispatch(set_userDetails({}))
    window.localStorage.removeItem('user');
    setAnchorEl(null)
  }
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
  const close=()=>{
    setAnchorEl(null);
  }
  const setLoginSidebar = (e) => {
    if(userDetails?.name !== undefined){
       return setAnchorEl(e.currentTarget)
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
      <div className="flex justify-between items-center p-4 w-4/5 m-auto nav_bar">
        <div className="flex  items-center nav_logo">
          <div onClick={()=>navigate('/')} style={{cursor:"pointer"}}>
            <img src={swiggy_logo} alt="swiggy_logo" className="swiggy_logo" />
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
          <div>
          <Menu
    anchorEl={anchorEl}
    id="account-menu"
    open={open}
    onClose={close}
    onClick={close}
    PaperProps={{
      elevation: 0,
      sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1,
        },
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: 'background.paper',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
        },
      },
    }}
    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
  >
    <MenuItem onClick={profile}>
      <Avatar /> Profile
    </MenuItem>
    <MenuItem onClick={logout}>
      <ListItemIcon>
        <Logout/>
      </ListItemIcon>
      Logout
    </MenuItem>
  </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
