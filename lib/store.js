// store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
// Import other reducers for separate features/pages if needed

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here for separate features/pages if needed
  },
});
