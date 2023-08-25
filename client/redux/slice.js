import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  loggedIn: false,
  appLoading: false,
  counter: 0,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    initialUserSetup: (state, action) => {
      state.id = action.payload.id;
      state.loggedIn = action.payload.loggedIn;
    },
    setAppLoading: (state) => {
      state.appLoading = true;
    },
    logOff: (state) => {
      // eslint-disable-next-line no-unused-vars
      state = initialState;
    },
    setAppNotLoading: (state) => {
      state.appLoading = false;
    },
  },
});

console.log("userSlice: ", userSlice);

export const { initialUserSetup, setAppLoading, setAppNotLoading, logOff } =
  userSlice.actions;
export default userSlice.reducer;
