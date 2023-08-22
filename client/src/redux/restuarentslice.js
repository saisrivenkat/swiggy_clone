import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allrestuarents: [],
  currentfilter: "RELEVANCE",
  res_menu: [],
  cart_res_name:'',
  cart: [],
  location: { lat: 17.385044, lng: 78.486671,city:'Hyderabad,Telangana' },
  isLogin: false,
  isSidebar: false,
  widgetOffset: {},
  nextOffset: "",
  isLoginSidebar: false,
  userDetails:{},
  current:"register"

};

export const restuarentslice = createSlice({
  name: "restuarents",
  initialState,
  reducers: {
    set_restuarent: (state, action) => {
      console.log("new",action.payload)
      if(action.payload.type === 'NEW'){
        
        state.allrestuarents = [...action.payload.all_restuarants];
      }else{
        state.allrestuarents = [...state.allrestuarents, ...action.payload];
      }
    },
    set_currentfilter: (state, action) => {
      state.currentfilter = action.payload;
    },
    set_userDetails:(state,action)=>{
      state.userDetails = action.payload
    },
    set_filter_res: (state, action) => {
      state.allrestuarents = action.payload;
    },
    set_res_menu: (state, action) => {
      state.res_menu = action.payload;
    },
    set_cart_res_name:(state,action)=>{
      state.cart_res_name = action.payload
    },
    set_current:(state,action)=>{
      state.current = action.payload
    },
    set_cart: (state, action) => {
      if(action.payload.type === 'REMOVE_CART'){
        state.cart=[]
      }else{
      state.cart = [...state.cart, action.payload];
      }
    },
    set_sidebar: (state, action) => {
      state.isSidebar = !state.isSidebar;
    },
    set_loginsidebar:(state,action)=>{
      state.isLoginSidebar = !state.isLoginSidebar;
    },
    set_widgetoffset: (state, action) => {
      state.widgetOffset = action.payload;
    },
    set_nextoffset: (state, action) => {
      state.nextOffset = action.payload;
    },
    set_location:(state,action)=>{
      const loc = {...state.location,lat:action.payload.lat,lng:action.payload.lng,city:action.payload.city}
      state.location=loc; 
     console.log(state.location);
    },
    increase_qty: (state, action) => {
      //console.log("redux",action.payload,state.cart)
      const newCart = state.cart.map((item) => {
        if (item.id === action.payload) {
          item.qty = item.qty + 1;
        }
        return item;
      });
      state.cart = [...newCart];
      console.log(newCart);
    },
    decrease_qty: (state, action) => {
      let index; // store the index of an elemrnt which is less than 1 for removing from cart
      const newCart = state.cart.map((item, idx) => {
        if (item.id === action.payload) {
          if (item.qty !== 1) {
            item.qty = item.qty - 1;
          }else{
            index = idx;
            console.log("index of the item",idx)
          }
        }
        return item;
      });
      if (index) {
        console.log(index);
        newCart.splice(index, 1);
      }
      state.cart = [...newCart];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  set_restuarent,
  set_currentfilter,
  set_filter_res,
  set_res_menu,
  set_cart_res_name,
  set_cart,
  increase_qty,
  decrease_qty,
  set_widgetoffset,
  set_nextoffset,
  set_sidebar,
  set_loginsidebar,
  set_location,
  set_userDetails,
  set_current
} = restuarentslice.actions;
export const get_all_res = (initialState) => initialState.allrestuarents;

export default restuarentslice.reducer;
