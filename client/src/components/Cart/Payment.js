import React from 'react'
import './payment.css'
import {useSelector} from 'react-redux'
function Payment() {
    const cart = useSelector((state) => state.restuarents.final_cart);
    const pay=async()=>{
                
        fetch('http://localhost:5000/user/order',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(cart)
          })
          .then()
          .catch()
    }
  return (
    <div className='payment_main'>
        <div>
            <h1>Payment Method</h1>
            <h2>{process.env.NODE_ENV}</h2>
        </div>
        <button onClick={pay}>Proceed to pay</button>
    </div>
  )
}

export default Payment