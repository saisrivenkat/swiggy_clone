import React,{useState} from 'react'
import CloseIcon from "@mui/icons-material/Close";
import {useDispatch,useSelector} from 'react-redux'
import {set_address,set_addressDetails,set_userDetails} from '../../redux/restuarentslice'

function Addaddress() {
    const dispatch = useDispatch();
    const userDetails= useSelector((state)=>state.restuarents.userDetails)
    const [address,setaddress]= useState()
    const[doorno,setdoorno]=useState()
    const[landmark,setlandmark]=useState()
    const remove=()=>{
        dispatch(set_address());
    }
    const submit=async()=>{
        const obj={address,doorno,landmark}
        const final={
            address:obj,
            email:userDetails.email
        }
        console.log(final)
        fetch('https://corsproxy.io/?https://swiggybackedn.onrender.com/user/address',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(final)
        }).then((res)=>res.json()).then((data)=>{
            console.log(data)
            dispatch(set_userDetails(data))
        })
        .catch((err)=>console.log(err))
        
        dispatch(set_addressDetails(obj))
        remove();
    }
  return (
    <div>
        <div className="loginsidebar">
            <CloseIcon onClick={remove}/>
            <div className="heading">
                <h1>Save Address</h1>
                <div className="break_line"></div>
            </div>
            
            <div>
                <input type="text" placeholder="Address" onChange={(e)=>setaddress(e.target.value)} />
            </div>
            
            <div>
                <input type="text" placeholder="Door No" onChange={(e)=>setdoorno(e.target.value)} />
            </div>
            <div>
                <input type="text" placeholder="Landmark" onChange={(e)=>setlandmark(e.target.value)} />
            </div>
            <div className='submit_button'>
                <button onClick={submit} >Save</button>
            </div>
        </div>
    </div>
  )
}

export default Addaddress