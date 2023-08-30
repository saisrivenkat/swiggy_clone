import React,{useRef,useState,useEffect} from 'react'
import CloseIcon from "@mui/icons-material/Close";
import {useDispatch,useSelector} from 'react-redux'
import {set_loginsidebar} from '../../redux/restuarentslice'
import {set_userDetails,set_current} from '../../redux/restuarentslice';
import CircularProgress from '@mui/material/CircularProgress';

import './login.css'

const Login = () => {
    const dispatch = useDispatch();
    const ref= useRef();
    
    const[email,setemail]=useState()
    
    const[password,setpassword]=useState()
    const[err,setError]=useState('')
    const[loading,setloading]=useState(false);
   

    

    const remove = () => {
        dispatch(set_loginsidebar());
        document.body.style.overflow = "unset";
        document.getElementById("outer_overlay").classList.remove("overlay");
      };

      const submit=()=>{

        setloading(!loading)
        const user={
          email,
          password
        }
        
        console.log(user)
        fetch('https://corsproxy.io/?https://swiggybackedn.onrender.com/user/login',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(user)
        }).then(res=>res.json()).then(data=>{
            if(data.user){
                dispatch(set_userDetails(data.user))
                window.localStorage.setItem('user',JSON.stringify(data.user))
                remove();
            }
          if(err){
            setError(err)
          }
        })
        setloading(!loading);
        
      }
      useEffect(()=>{
        ref.current.focus();
      },[])
    return(
        <>
        <div className="loginsidebar">
            <CloseIcon onClick={remove}/>
            <div className="heading">
                <h1>Login</h1>
                <h2>or <span onClick={()=>dispatch(set_current("register"))}>Create a account</span></h2>
                <div className="break_line"></div>
            </div>
            
            <div>
                <input type="text" placeholder="Enter your Email" ref={ref} onChange={(e)=>setemail(e.target.value)}/>
            </div>
            
            <div>
                <input type="password" placeholder="Enter your Password" onChange={(e)=>setpassword(e.target.value)}/>
            </div>
           
            <div className='submit_button'>
              {loading?<CircularProgress style={{width:"30px",height:"30px"}}/>:
                <button onClick={submit}>Login</button>}
            </div>
        </div>
        </>
    )
}
export default Login