import React, {  useEffect, useMemo, useState } from "react";
import "./locationsidebar.css";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { set_sidebar, set_location } from "../../redux/restuarentslice";
import useDebounce from "../../hooks/useDebounce";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const Sidebar = () => {
  const dispatch = useDispatch();
  const [search, setsearch] = useState();
  const [locations, setlocations] = useState([]);
  const [placeId, setplaceId] = useState();

  const deboucnedsearch = useDebounce(search, 1000);

  const remove = () => {
    dispatch(set_sidebar());
    document.body.style.overflow = "unset";
    document.getElementById("outer_overlay").classList.remove("overlay");
  };
  useEffect(() => {
    const fetch_loc = async () => {
      if (deboucnedsearch !== undefined) {
        const fetch_loc = await fetch(
          `https://corsproxy.io/?https://www.swiggy.com/dapi/misc/place-autocomplete?input=${deboucnedsearch}&types=`
        );
        const data = await fetch_loc.json();
        console.log(data);
        setlocations(data.data);
      }
    };
    fetch_loc();
  }, [deboucnedsearch]);

  
  useEffect(() => {
    if (placeId !== undefined) {
      const fetch_lat_long = async () => {
        const fetch_data = await fetch(
          `https://corsproxy.io/?https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeId}`
        );
        const data = await fetch_data.json();
        console.log(data);
        const obj = {
          lat: data.data[0].geometry.location.lat,
          lng: data.data[0].geometry.location.lng,
          city: data.data[0].formatted_address,
        };
        dispatch(set_location(obj));
      };
      fetch_lat_long();
      remove();
    }
  }, [placeId]);

  const loaction_data = useMemo(()=>{return locations}, [locations])


  return (
    <>
      <div className="location_sidebar">
        <CloseIcon onClick={remove} />
        <div className="sidebar">
          <input
            placeholder="Enter Location..."
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>
        <div className="location_list">
          {loaction_data.map((location) => {
            return (
              <div
                className="location_box"
                onClick={() => setplaceId(location.place_id)}>
                <div>
                  <LocationOnIcon />
                </div>
                <div>
                  <h2>{location.structured_formatting.main_text}</h2>
                  <h4>{location.structured_formatting.secondary_text}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default React.memo(Sidebar);
