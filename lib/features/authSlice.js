import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Define the initial state for authentication
const getInitialUser = () => {
  if (typeof window !== "undefined") {
    const user = Cookies.get("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

const getInitialMobile = () => {
  if (typeof window !== "undefined") {
    return Cookies.get("mobile");
  }
  return null;
};

const initialState = {
  isAuthenticated: false,
  user: getInitialUser(),
  mobile: getInitialMobile(),
};

// Create the authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer for successful login
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      // Store user information in secure cookies
      if (typeof window !== "undefined") {
        Cookies.set("user", JSON.stringify(action.payload), { secure: true, sameSite: 'Strict' });
      }
    },
    storeMobile(state, action) {
      state.mobile = action.payload;
      // Store mobile in secure cookies
      if (typeof window !== "undefined") {
        Cookies.set("mobile", action.payload, { secure: true, sameSite: 'Strict' });
      }
    },
    // Reducer for logout
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.mobile = null;  // Ensure mobile is also cleared
      // Clear authentication information from cookies
      if (typeof window !== "undefined") {
        Cookies.remove("user");
        Cookies.remove("mobile");
      }
    },
    // Reducer for editing user information
    editUser(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        // Update user information in secure cookies
        if (typeof window !== "undefined") {
          Cookies.set("user", JSON.stringify(state.user), { secure: true, sameSite: 'Strict' });
        }
      }
    },
  },
});

// Export action creators
export const { loginSuccess, logout, editUser, storeMobile } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
