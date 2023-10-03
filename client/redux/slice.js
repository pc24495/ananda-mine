import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  loggedIn: false,
  appLoading: false,
  counter: 0,
  name: "",
  birthday: null,
  token: null,
  pic1Url: null,
  pic2Url: null,
  pic3Url: null,
  pic4Url: null,
  pic5Url: null,
  pic6Url: null,
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
      state.pic1Url = action.payload.pic1Url;
      state.birthday = action.payload.birthday;
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
    setPic1Url: (state, action) => {
      state.pic1Url = action.payload.pic1Url;
    },
    setPics: (state, action) => {},
    setBirthday: (state, action) => {
      state.birthday = action.payload.birthday;
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
  setPic1Url,
  setBirthday,
} = userSlice.actions;
export default userSlice.reducer;
