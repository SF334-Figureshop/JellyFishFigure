import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Page/Ecommerce/CartSlice";
export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});