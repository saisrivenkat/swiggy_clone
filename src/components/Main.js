import React, { useState, useEffect } from "react";
import "./main.css";
import Card from "./card";
import { useSelector, useDispatch } from "react-redux";
import { set_restuarent, set_currentfilter } from "../redux/restuarentslice";

import { Link } from "react-router-dom";
import { ConstructionOutlined } from "@mui/icons-material";

const MainWrapper = () => {
  const [filter, setfilter] = useState([]);
  const [restuarents, setrestuarents] = useState([]);
  const [currentfilter, setcurrentfilter] = useState("");
  const [offset, setoffset] = useState(0);

  const fetch_restuarents = async () => {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=15.8166616&lng=80.35869&page_type=DESKTOP_WEB_LISTING"
    );
    const data = await response.json();
    setrestuarents(data.data.cards[2].data.data.cards);
    setcurrentfilter(data.data.sorts[0].key);
    setfilter(data.data.sorts);
    window.scrollTo(0, 0);
  };
//lat=17.385044&lng=78.486671 - hyd
//lat=15.8166616&lng=80.35869 -chirala
  const fetch_more = async () => {
    console.log("coming");
    const url = await fetch(
      `https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=15.8166616&lng=80.35869&offset=${offset}&sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`
    );
    const res = await url.json();
    let more_data = [];
    console.log(res?.data?.cards?.map((item) => item.cardType === 'restaurant' && item.data))
    res?.data?.cards?.map((item) => {
      if (item.cardType === "restaurant") {
        more_data.push(item.data);
      }
    });
    console.log(more_data)
    
    setrestuarents([...restuarents, ...more_data])
  };

  const scroll = () => {
    if (
      document.documentElement.scrollTop + window.innerHeight + 1 >=
      document.documentElement.scrollHeight
    ) {
      
      setoffset(prev=>prev + 16);
      console.log(offset+16)
      console.log("scrolling")
      console.log(document.documentElement.scrollTop + window.innerHeight + 1 >=
        document.documentElement.scrollHeight)
    }
  };

  // we can try with useCallback next time
  useEffect(() => {
    //fetch_more();
    offset!==0 && fetch_more();
    console.log("changing",offset)
  }, [offset]);

  useEffect(() => {
    window.addEventListener("scroll", scroll);
    return window.addEventListener("scroll", scroll);
  }, []);

  useEffect(() => {
    fetch_restuarents();
  }, []);

  const filterselect = (filter_item) => {
    console.log(filter_item);
    setcurrentfilter(filter_item.key);
    const newrestuarents = [...restuarents];
    if (filter_item.key === "DELIVERY_TIME") {
      newrestuarents.sort((a, b) => {
        return a.data.deliveryTime - b.data.deliveryTime;
      });
      setrestuarents(newrestuarents);
    } else if (filter_item.key === "RATING") {
      newrestuarents.sort((a, b) => {
        return b.data.avgRating - a.data.avgRating;
      });
      setrestuarents(newrestuarents);
    } else if (filter_item.key === "COST_FOR_TWO") {
      newrestuarents.sort((a, b) => {
        return a.data.costForTwo - b.data.costForTwo;
      });
      setrestuarents(newrestuarents);
    } else if (filter_item.key === "COST_FOR_TWO_H2L") {
      newrestuarents.sort((a, b) => {
        return b.data.costForTwo - a.data.costForTwo;
      });
      setrestuarents(newrestuarents);
    } else if (filter_item.key === "RELEVANCE") {
    }
  };

  return (
    <div>
      <div className="main_wrapper w-4/5  m-auto mt-5 p-2">
        <div
          className="flex justify-between items-center p-2"
          style={{ borderBottom: "1px solid #d3d3d3" }}>
          <h1 style={{ fontWeight: "600", fontSize: "28px" }}>
            {restuarents.length} Restuarents
          </h1>
          <div className=" filter_items flex gap-6">
            {filter.map((filter) => {
              return (
                <h1
                  className={currentfilter === filter.key ? "selected" : ""}
                  onClick={() => filterselect(filter)}>
                  {filter.title}
                </h1>
              );
            })}
          </div>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap justify-around">
            {restuarents.map((restuarent) => {
              return (
                <Link to={`/restaurants/${restuarent.data.id}`}>
                  <Card res_data={restuarent} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainWrapper;
/*
 */
