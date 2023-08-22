import React from 'react'
import {useSelector} from 'react-redux'
import Login  from './Login';
import Register from './Register'

const Index=()=> {
    
    const current = useSelector((state)=>state.restuarents.current);
  return (
    <div>
        {current ==='register'&&<Register/>}
        {current ==='login'&&<Login/>}
    </div>
  )
}

export default Index