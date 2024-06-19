import { configureStore } from "@reduxjs/toolkit";

import reciepeReducer from "./reciepeSlice";
import foodReducer from "./foodSlice";
const store = configureStore({
  reducer: {
    reciepe: reciepeReducer,
    food: foodReducer,
  },
});
export default store;
