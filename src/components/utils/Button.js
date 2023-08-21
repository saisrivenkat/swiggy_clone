import React from "react";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { set_cart,decrease_qty,increase_qty,set_cart_res_name } from "../../redux/restuarentslice";
import { useDispatch,useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import './button.css'
const style = {
  position: 'absolute',
  top: '80%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  borderRadius:"20px",
  boxShadow: 24,
  p: 4,
  putline:"none"
};
const Button = (props) => {
  const { isthere, item,count,res_data } = props;
  const[open,setopen] = React.useState(false);
  const dispatch = useDispatch();
  const cart_res_name = useSelector((state) => state.restuarents.cart_res_name);
  console.log(count);
  console.log("from add button",res_data)
  const handleClose=()=>{
    setopen(!open);
  }
  const remove_cart=(item)=>{
    const obj={type:'REMOVE_CART'};
    dispatch(set_cart(obj));
    dispatch(set_cart_res_name(""));
    const obj2={...item,qty:1};
    dispatch(set_cart(obj2));
    dispatch(set_cart_res_name(res_data.name));
    setopen(!open);
  }
  const add = (menu_item) => {
    if(cart_res_name){
      if(cart_res_name !== res_data.name){
        setopen(true)
        return
      }
    }
    const obj={...menu_item,qty:1};
    dispatch(set_cart(obj));
    dispatch(set_cart_res_name(res_data.name));
  };
  const increase=()=>{
    dispatch(increase_qty(item.id));
    
  }
  const decrease=()=>{

    dispatch(decrease_qty(item.id));
  }

  return (
    <div>
      {!isthere ? (
        <div className="add_cart_button">
          <button onClick={() => add(item)}>Add</button>
        </div>
      ) : (
        <div className="add_cart_button quantity">
            <div onClick={()=>decrease()}><RemoveOutlinedIcon/></div>
            <div>{count.qty}</div>
            <div onClick={()=>increase()}><AddOutlinedIcon/></div>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Items already in cart
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h6" style={{fontSize:"16px"}}>
          Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?
          </Typography>
          <div className=" modal_buttons flex justify-around items-center ">
            <button className="" onClick={()=>remove_cart(item)}>Change</button>
            <button className="cancel_button" onClick={handleClose}>Cancel</button>
          </div>
        </Box>
      </Modal>
    </div>
  )
};
export default Button;
