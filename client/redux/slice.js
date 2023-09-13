import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  loggedIn: false,
  appLoading: false,
  counter: 0,
  name: "",
  token: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    initialUserSetup: (state, action) => {
      console.log(action);
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.loggedIn = true;
      state.token = action.payload.token;
    },
    setAppLoading: (state) => {
      state.appLoading = true;
    },
    logOut: (state) => {
      // eslint-disable-next-line no-unused-vars
      state = initialState;
    },
    setAppNotLoading: (state) => {
      state.appLoading = false;
    },
    setName: (state, action) => {
      state.name = action.payload.name;
    },
  },
});

console.log("userSlice: ", userSlice);

export const {
  initialUserSetup,
  setAppLoading,
  setAppNotLoading,
  logOut,
  setName,
} = userSlice.actions;
export default userSlice.reducer;
