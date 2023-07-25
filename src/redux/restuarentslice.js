import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allrestuarents: [],
  currentfilter: 'RELEVANCE',
}

export const restuarentslice = createSlice({
  name: 'restuarents',
  initialState,
  reducers: {
    set_restuarent: (state,payload) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.allrestuarents  = payload;
    },
    set_currentfilter: (state,payload) => {
        state.currentfilter = payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { set_restuarent,set_currentfilter } = restuarentslice.actions

export default restuarentslice.reducer