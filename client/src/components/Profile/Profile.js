import React from 'react'
import {useSelector} from 'react-redux';
import './profile.css';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import EmailIcon from '@mui/icons-material/Email';
import Orders from './Orders'
function Profile() {
    const userDetails = useSelector((state)=>state.restuarents.userDetails);
  return (
    <div>
        <div className='profile'>
            <div className="info">
        <h1>{userDetails.name}</h1>
        <div className="sub_profile">
            <div style={{display:"flex",gap:"10px"}}>
                <PhoneInTalkIcon/>
            <h3>{userDetails.phonenumber}</h3>
            </div>
            <div style={{display:"flex",gap:"10px"}}>
                <EmailIcon/>
            <h2>{userDetails.email}</h2>
            </div>
        
        
        </div>
        </div>
        <Orders/>
        </div>
        
        
    </div>
  )
}

export default Profile