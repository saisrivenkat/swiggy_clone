import React from 'react'; 
import Logo from '../assests/swiggy.svg'
import './location.css'
const Location =()=>{
    return(
        <>
        <div className='flex '>
            <div className='content'>
                <div>
                    <img src={Logo} alt="logo"  />
                </div>
                <div className='details'>
                    <h1>Cooking gone wrong?</h1>
                    <p>Order food from favourite restuarent near you.</p>

                    <div>
                        <input type='text' />
                        <buttton>Find Food</buttton>
                    </div>
                </div>
            </div>
            <div className='image'>
                <div className="right_image">
                <h1>saiii</h1>
                </div>
            </div>
        </div>

        </>
    )
}

export default Location