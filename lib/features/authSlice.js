import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for authentication
const getInitialUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

const getInitialMobile = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("mobile");
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
      console.log("logged in");  // Consider removing this in production
      // Store user information in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    storeMobile(state, action) {
      state.mobile = action.payload;
      console.log("mobile stored");  // Consider removing this in production
      // Store mobile in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("mobile", action.payload);
      }
    },
    // Reducer for logout
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.mobile = null;  // Ensure mobile is also cleared
      // Clear authentication information from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("mobile");
      }
    },
    // Reducer for editing user information
    editUser(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        // Update user information in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      }
    },
  },
});

// Export action creators
export const { loginSuccess, logout, editUser, storeMobile } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
