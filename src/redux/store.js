// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';  // <-- import reducer correctly

const store = configureStore({
  reducer: {
    auth: authReducer,  // assign reducer here
  },
});

export default store;
