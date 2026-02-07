import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

/* ---------------- LOGIN ---------------- */
export const login = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await API.post("/auth/login", credentials, {
        withCredentials: true,
      });

      return res.data.data; // backend return data of user info
    } catch (error) {
      const errData = error.response?.data;
      const message =
        errData?.details?.[0]?.message ||
        errData?.message ||
        error.message ||
        "Login failed";
      return rejectWithValue(message);
    }
  },
);

/* ---------------- SIGNUP ---------------- */
export const signup = createAsyncThunk(
  "user/signup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/auth/signup", data, {
        withCredentials: true,
      });

      return res.data.data; // user object
    } catch (error) {
      const errData = error.response?.data;

      // Prefer Joi field-level messages
      if (errData?.details?.length) {
        return rejectWithValue(errData.details[0].message);
      }

      return rejectWithValue(
        errData?.message || error.message || "Something went wrong",
      );
    }
  },
);

/* ---------------- CHECK AUTH  ---------------- */
export const fetchUser = () => async (dispatch) => {
  dispatch(setLoading());

  try {
    const res = await API.get("/user/me", {
      withCredentials: true,
    });

    dispatch(setUser(res.data.data));
  } catch (err) {
    if (err.response?.status === 401 || err.response?.status === 403) {
      // token missing or expired — expected
      dispatch(clearUser());
      return;
    }

    console.error("Fetch user failed:", err);
    dispatch(clearUser());
  }
};

/* ---------------- LOGOUT ---------------- */
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await API.post("/auth/logout", {}, { withCredentials: true });
      return true;
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  },
);

/* ---------------- SLICE ---------------- */
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },

  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SIGN UP
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // 👈 exact backend message
      })

      // LOGOUT
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser, setLoading, clearError } = userSlice.actions;
export default userSlice.reducer;
