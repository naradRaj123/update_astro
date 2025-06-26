import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Astrologer login thunk
export const astrologerLogin = createAsyncThunk(
  'auth/astrologerLogin',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        'https://astro-talk-backend.onrender.com/web/astro/login',
        credentials
      );

      const { token, user } = res.data;

      if (!token || !user) throw new Error('Invalid response format');

      return { token, user };
    } catch (err) {
      let message = 'Astrologer login failed. Please try again.';
      if (err.response) {
        // Server responded with a status code out of 2xx
        message =
          err.response.data?.message ||
          `Error ${err.response.status}: ${err.response.statusText}` ||
          message;
      } else if (err.request) {
        // Request made but no response
        message = 'No response from server. Please check your network connection.';
      } else if (err.message) {
        // Something else happened
        message = err.message;
      }
      return rejectWithValue(message);
    }
  }
);

// User login thunk
export const userLogin = createAsyncThunk(
  'auth/userLogin',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        'https://astro-talk-backend.onrender.com/web/login/',
        credentials
      );

      const { token, user } = res.data;

      if (!token || !user) throw new Error('Invalid response format');

      return { token, user };
    } catch (err) {
      let message = 'User login failed. Please try again.';
      if (err.response) {
        message =
          err.response.data?.message ||
          `Error ${err.response.status}: ${err.response.statusText}` ||
          message;
      } else if (err.request) {
        message = 'No response from server. Please check your network connection.';
      } else if (err.message) {
        message = err.message;
      }
      return rejectWithValue(message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // Astrologer Login
      .addCase(astrologerLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(astrologerLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(astrologerLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // User Login
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
