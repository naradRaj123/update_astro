import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Safe JSON parse helper
const parseJSON = (str) => {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};

// Initial State
const initialState = {
  user: parseJSON(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  astroUser: parseJSON(localStorage.getItem("astroUser")) || null,
  astroToken: localStorage.getItem("astroToken") || null,
  loading: false,
  error: null,
};

// ───────────────────────────────────────────
// REGISTER USER
// ───────────────────────────────────────────
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://astro-talk-backend.onrender.com/web/register",
        userData
      );
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { token, user };
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || "Registration failed."
      );
    }
  }
);

// ───────────────────────────────────────────
// USER LOGIN
// ───────────────────────────────────────────
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://astro-talk-backend.onrender.com/web/login/",
        { email, password }
      );
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { token, user };
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

// ───────────────────────────────────────────
// ASTROLOGER LOGIN
// ───────────────────────────────────────────
export const astroLoginUser = createAsyncThunk(
  "auth/astroLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://astro-talk-backend.onrender.com/web/astro/login",
        { email, password }
      );

      const { token, data: user } = res.data;

      localStorage.setItem("astroToken", token);
      localStorage.setItem("astroUser", JSON.stringify(user));

      return { token, user };
    } catch (err) {
      console.error("Astro login error:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || "Astrologer login failed."
      );
    }
  }
);

// ───────────────────────────────────────────
// UPDATE PROFILE
// ───────────────────────────────────────────
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (updateData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://astro-talk-backend.onrender.com/web/user/update",
        {
          user_id: updateData._id,
          user_name: updateData.user_name,
          user_email: updateData.user_email,
          user_password: updateData.user_password,
          user_phone: updateData.user_phone,
        }
      );

      const updatedUser = res.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return updatedUser;
    } catch (err) {
      console.error("Profile update error:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || "Profile update failed."
      );
    }
  }
);

// ───────────────────────────────────────────
// AUTH SLICE
// ───────────────────────────────────────────
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.astroUser = null;
      state.astroToken = null;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("astroUser");
      localStorage.removeItem("astroToken");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Astro Login
      .addCase(astroLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(astroLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.astroUser = action.payload.user;
        state.astroToken = action.payload.token;
      })
      .addCase(astroLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;
