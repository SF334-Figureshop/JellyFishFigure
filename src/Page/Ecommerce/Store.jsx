import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice.jsx"
export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});