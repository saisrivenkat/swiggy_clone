import React from 'react';
import swiggy_logo from '../assests/swiggy.svg';
import cartsvg from '../assests/cart.svg';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import './navbar.css';

const Navbar = () => {
  return (
    <div
      className=""
      style={{
        boxShadow: '0 2px 10px #171a2927',
      }}
    >
      <div className="flex justify-between items-center p-4 w-4/5 m-auto">
        <div>
          <img src={swiggy_logo} />
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="cart_icon">
              <img src={cartsvg} height="20" width="20" />
              <span className="text-sm">0</span>
            </div>

            <span>Cart</span>
          </div>
          <div className="gap-2">
            <PermIdentityOutlinedIcon /> <span>Sign In</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
