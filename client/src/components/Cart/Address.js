import React from 'react'
import './address.css';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {useDispatch,useSelector} from 'react-redux';
import { set_address } from '../../redux/restuarentslice';


export default function Address() {

    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.restuarents.userDetails);
    const add=()=>{
        dispatch(set_address())
    }
  return (
    <div>
        <div className='heading_address'>
            <h1>Select Delivery Address</h1>
        </div>
        <div>
            <div className='flex flex-wrap main_address justify-between items-center'>
            {userDetails?.address?.map((item)=>{
                return(
                    <div className='saved_card'>
                <div className='flex items-center gap-5'>
                    <LocationOnIcon/>
                    <div>
                        <h1>{item.address}</h1>
                        <p>{item.doorno},{"  "}{item.landmark}</p>
                    </div>
                </div>
                <div>
                    <button onClick={add}>Deliver here</button>
                </div>
            </div>
                )
            })}
            <div className='saved_card'>
                <div className='flex items-center gap-5'>
                    <LocationOnIcon/>
                    <div>
                        <h1>Add New Address</h1>
                    </div>
                </div>
                <div>
                    <button onClick={add}>ADD NEW</button>
                </div>
            </div>
            </div>
            
        </div>
    </div>
  )
}
