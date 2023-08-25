import { configureStore } from "@reduxjs/toolkit";
// import combinedReducers from "./reducers";
import reducer from "./slice.js";

const store = configureStore({
  reducer: {
    user: reducer,
  },
});

export default store;
