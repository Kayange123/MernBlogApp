import {
  applyMiddleware,
  compose,
  configureStore,
  createSlice,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducers from "../reducers/index";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("userId");
      state.isLoggedIn = false;
    },
  },
});
export const authActions = authSlice.actions;
export const store = configureStore(
  { reducer: reducers },
  compose(applyMiddleware(thunk))
);
