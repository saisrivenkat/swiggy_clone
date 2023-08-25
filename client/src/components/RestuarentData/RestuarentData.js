import React, { useState, useEffect } from "react";
import Menudata from './Menudata';
import { useParams } from "react-router-dom";
import star from "../../assests/star.svg";
import { useDispatch } from "react-redux";
import TimelapseOutlinedIcon from "@mui/icons-material/TimelapseOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import { Skeleton } from "@mui/material";
import './restuarentdata.css'
function RestuarentData() {
  let { resId } = useParams();
  const [res_data, setresdata] = useState([]);
  const [offers, setoffers] = useState([]);
  const [menu_data, setmenudata] = useState([]);
  const[loading,setloading] = useState(true);

//lat=15.8166616&lng=80.35869 -chirala
  useEffect(() => {
    const fetch_data = async () => {
      const response = await fetch(
        `https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=15.8166616&lng=80.35869&restaurantId=${resId}`
      );
      const data = await response.json();
      console.log("res name",data);
      console.log(data.data.cards);
      console.log("individual res Data",data.data.cards[0].card.card.info)
      setresdata(data.data.cards[0].card.card.info);
      console.log(data.data.cards[0].card.card.info);
      setoffers(data.data.cards[1].card.card.gridElements.infoWithStyle.offers);
      const groupedCard=data.data.cards.filter((item)=>{return item.groupedCard})
      console.log("menudata cards",groupedCard)
      setmenudata(groupedCard[0].groupedCard.cardGroupMap.REGULAR.cards);
      setloading(false);
    };
    fetch_data();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  menu_data.shift()
  menu_data.pop()
  menu_data.pop()
  return (
    <div>
      <div className="main_wrapper w-4/5  m-auto mt-5 p-2">
        
        <div className="res_info">
          <div className="res_info_inner flex justify-between items-center ">
            <div>
              <h1>{res_data.name}</h1>
              <p>{res_data?.slugs?.city}</p>
            </div>
            <div className="res_rating shadow-xl ">
              <div className="flex flex-col items-center ">
                <span className="flex justify-between res_info_rating">
                  <img src={star} className="mr-2" alt="star" />
                  {res_data.avgRating}
                </span>
                <hr className="hr" />
                <span className="total_rating">
                  {res_data.totalRatingsString}
                </span>
              </div>
            </div>
          </div>
          <hr />
          {/* <div className="res_deleivery_info">
            <div className="res_delivery_inner flex">
              <div>
                <TimelapseOutlinedIcon />
                <CurrencyRupeeOutlinedIcon />
                <span>{res_data.costForTwoMessage}</span>
              </div>
            </div>
          </div> */}
          <div className="offers">
            <div className="flex flex-nowrap  gap-2">
              {offers.map((offer) => {
                return (
                  <div className="offer_tile flex flex-col" key={offer.info.header}>
                    <div className="flex gap-2">
                      <img
                        alt="logo"
                        src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/${offer.info.offerLogo}`}
                      />
                      <h1 style={{color:"#686b78"}} >{offer.info.header}</h1>
                    </div>
                    <p style={{color:"#686b78"}}>{offer.info.couponCode} || {offer.info.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <Menudata res_data={res_data} menu= {menu_data}/>
        </div>
      </div>
    </div>
  );
}

export default RestuarentData;
