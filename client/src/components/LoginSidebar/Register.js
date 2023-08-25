import React,{useRef,useState,useEffect} from 'react'
import CloseIcon from "@mui/icons-material/Close";
import {useDispatch,useSelector} from 'react-redux'
import {set_loginsidebar} from '../../redux/restuarentslice'
import {set_userDetails,set_current} from '../../redux/restuarentslice';

import './login.css'
const Login = () => {
    const dispatch = useDispatch();
    const ref= useRef();
    const[name,setname]=useState('')
    const[email,setemail]=useState('')
    const[phonenumber,setphonenumber]=useState('')
    const[password,setpassword]=useState('')
    const[err,setError]=useState('')
    const userDetails = useSelector((state)=>state.restuarents.userDetails);

    const remove = () => {
        dispatch(set_loginsidebar());
        document.body.style.overflow = "unset";
        document.getElementById("outer_overlay").classList.remove("overlay");
      };

      const submit=()=>{
        const user={
          name:name,
          email:email,
          phonenumber:phonenumber,
          password:password
        }
        console.log(user)
        fetch('https://corsproxy.io/?https://swiggybackedn.onrender.com/user/register',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(user)
        }).then(res=>res.json()).then(data=>{
            if(data._id){
                dispatch(set_userDetails(data))
                remove();
            }
          if(err){
            setError(err)
          }
        })
      }
      useEffect(()=>{
        ref.current.focus();
      },[])
    return(
        <>
        <div className="loginsidebar">
            <CloseIcon onClick={remove}/>
            <div className="heading">
                <h1>Create a account</h1>
                <h2>or <span onClick={()=>dispatch(set_current('login'))}>Login</span></h2>
                <div className="break_line"></div>
            </div>
            <div>
                <input type="text" value={name} ref={ref} placeholder="Enter your Name" onChange={(e)=>setname(e.target.value)}/>
            </div>
            <div>
                <input type="text"  placeholder="Enter your Email" onChange={(e)=>setemail(e.target.value)}/>
            </div>
            <div>
                <input type="text" placeholder="Enter your Phone Number" onChange={(e)=>setphonenumber(e.target.value)}/>
            </div>
            <div>
                <input type="text" placeholder="Enter your Password" onChange={(e)=>setpassword(e.target.value)}/>
            </div>
            <div className='submit_button'>
                <button onClick={()=>submit()}>Submit</button>
            </div>
        </div>
        </>
    )
}
export default Login