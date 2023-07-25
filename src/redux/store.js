import { configureStore } from '@reduxjs/toolkit'
import restuarentslice from './restuarentslice';

export const store = configureStore({
  reducer: {
    restuarents: restuarentslice,
  },
})
