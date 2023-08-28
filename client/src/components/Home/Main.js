import React, { useState, useEffect } from "react";
import "./main.css";
import { useSelector, useDispatch } from "react-redux";
import {
  set_restuarent,
  set_currentfilter,
  set_filter_res,
  set_widgetoffset,
  set_nextoffset,
  set_location,
  set_userDetails,
} from "../../redux/restuarentslice";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Card from "../utils/card";

const MainWrapper = () => {
  const [filter, setfilter] = useState([]);
  const [offset, setoffset] = useState(0);
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  const allres = useSelector((state) => state.restuarents.allrestuarents);
  const curr_filter = useSelector((state) => state.restuarents.currentfilter);
  const widgetoffset = useSelector((state) => state.restuarents.widgetOffset);
  const nextOffset = useSelector((state) => state.restuarents.nextOffset);
  const location = useSelector((state) => state.restuarents.location);
  useEffect(() => {
    const user = window.localStorage.getItem("user");
    if (user) {
      dispatch(set_userDetails(JSON.parse(user)));
    }
  }, []);

  const fetch_restuarents = async () => {
    //setloading();
    const response = await fetch(
      `https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=${location.lat}&lng=${location.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const data = await response.json();

    const all_res = data.data.cards.filter((item) => {
      return item.card.card.id === "restaurant_grid_listing";
    });
    const all_restuarants = [];
    dispatch(set_nextoffset(data.data.pageOffset.nextOffset));
    dispatch(set_widgetoffset(data.data.pageOffset.widgetOffset));
    const res = all_res[0].card.card.gridElements.infoWithStyle.restaurants;
    res.map((item) => {
      all_restuarants.push(item.info);
    });

    const filter = data.data.cards.filter((item) => {
      return item.card.card.sortConfigs;
    });
    const new_res = {
      all_restuarants,
      type: "NEW",
    };
    console.log("allres", new_res);
    console.log("allres length", allres.length);
    if (allres.length >= 0) {
      console.log("entering");
      dispatch(set_restuarent(new_res));
      setloading(false);
    }

    dispatch(set_currentfilter(filter[0].card.card.sortConfigs[0]));

    window.scrollTo(0, 0);
  };

  const fetch_more = async () => {
    if (
      offset > 0 &&
      parseInt(
        widgetoffset.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo
      ) > 0
    ) {
      console.log("widget offset before", widgetoffset);
      console.log();
      const obj = {
        lat: location.lat,
        lng: location.lng,
        nextOffset: `${nextOffset}`,
        widgetOffset: widgetoffset,
        filters: {},
        seoParams: {
          seoUrl: "https://www.swiggy.com/",
          pageType: "FOOD_HOMEPAGE",
          apiName: "FoodHomePage",
        },
        page_type: "DESKTOP_WEB_LISTING",
        _csrf: "nZys87ESVIiI-JEozS5ug3JxdpVLwAFZ-6NfIEz4",
      };
      console.log("widgetoffset after", obj.widgetOffset);
      console.log("coming");
      const response = await fetch(
        "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/update",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const result = await response.json();
      console.log("Success:", result?.data);
      if (result?.data?.pageOffset?.nextOffset) {
        dispatch(set_widgetoffset(result?.data?.pageOffset?.widgetOffset));
      }

      const remaining_res = result?.data?.cards.map((item) => {
        if (item.card.card.id === "restaurant_grid_listing") {
          return item.card.card.gridElements.infoWithStyle.restaurants;
        }
      });
      const res_info = remaining_res[0].map((item) => {
        return item.info;
      });
      console.log("remaining_res", res_info);
      dispatch(set_restuarent(res_info));
    }
  };

  const scroll = () => {
    if (
      document.documentElement.scrollTop + window.innerHeight + 1 >=
      document.documentElement.scrollHeight
    ) {
      setoffset((prev) => prev + 16);
      console.log(offset + 16);
      console.log("scrolling");
      console.log(
        document.documentElement.scrollTop + window.innerHeight + 1 >=
          document.documentElement.scrollHeight
      );
    }
  };

  useEffect(() => {
    
    fetch_more();
    
  }, [offset]);

  useEffect(() => {
    window.addEventListener("scroll", scroll);
    return window.addEventListener("scroll", scroll);
  }, []);

  useEffect(() => {
    setloading(!loading);
    fetch_restuarents();
    setloading(!loading);
    localStorage.setItem("location", JSON.stringify(location));
  }, [location]);

  const filterselect = (filter_item) => {
    console.log(filter_item);
    dispatch(set_currentfilter(filter_item.key));
    const newrestuarents = [...allres];
    if (filter_item.key === "DELIVERY_TIME") {
      newrestuarents.sort((a, b) => {
        return a.data.deliveryTime - b.data.deliveryTime;
      });
      dispatch(set_filter_res(newrestuarents));
    } else if (filter_item.key === "RATING") {
      newrestuarents.sort((a, b) => {
        return b.data.avgRating - a.data.avgRating;
      });
      dispatch(set_filter_res(newrestuarents));
    } else if (filter_item.key === "COST_FOR_TWO") {
      newrestuarents.sort((a, b) => {
        return a.data.costForTwo - b.data.costForTwo;
      });
      dispatch(set_filter_res(newrestuarents));
    } else if (filter_item.key === "COST_FOR_TWO_H2L") {
      newrestuarents.sort((a, b) => {
        return b.data.costForTwo - a.data.costForTwo;
      });
      dispatch(set_filter_res(newrestuarents));
    } else if (filter_item.key === "RELEVANCE") {
    }
  };

  return (
    <div>
      <div className="main_wrapper w-4/5  m-auto mt-5 p-2">
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              alignItems: "center",
            }}>
            {Array.from(new Array(8)).map((item) => {
              return (
                <div>
                  <Skeleton variant="rectangular" width={210} height={118} />
                  <br />
                  <Skeleton variant="rectangular" width={100} height={10} />
                  <br />
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div
              className="flex justify-between items-center p-2"
              style={{ borderBottom: "1px solid #d3d3d3" }}>
              {/* <h1 style={{ fontWeight: "600", fontSize: "28px" }}>
                {allres.length} Restuarents
              </h1> */}
              <div className=" filter_items flex gap-6">
                {filter.map((filter) => {
                  return (
                    <h1
                      className={curr_filter === filter.key ? "selected" : ""}
                      onClick={() => filterselect(filter)}>
                      {filter.title}
                    </h1>
                  );
                })}
              </div>
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap justify-around">
                {allres.map((restuarent) => {
                  return (
                    <Link to={`/restaurants/${restuarent.id}`}>
                      <Card res_data={restuarent} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default React.memo(MainWrapper);
/*
 */
