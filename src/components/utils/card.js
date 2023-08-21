import React from 'react';
import './card.css'
const Card=({res_data})=>{
    
    return(
        <div className='card hover:shadow-xl' >
            <div className='inner_card'>
            <img src= {`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${res_data.cloudinaryImageId}`} alt="" />
            <div>
                <h1>{res_data.name}</h1>
                {res_data.cuisines.map((item)=>{
                    return <span className='items'>{item}, </span>
                })}
                
            </div>
            <div className='flex justify-between mt-4'>
                <div className={res_data.avgRating >= 4?"flex gap-2 rating items-center green": res_data.avgRating?"flex gap-2 rating items-center orange":"flex gap-2 rating items-center no_rating"}  >
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>
                    <span >{res_data.avgRating}</span>
                </div>
                <span>{res_data.sla.deliveryTime} MINS</span>
                <span>{res_data.costForTwo}</span>
            </div>
            </div>
        </div>
    )
}
export default Card;