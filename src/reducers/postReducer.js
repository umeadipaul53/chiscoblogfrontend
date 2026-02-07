import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

//----------------- CREATE POST ------------------
export const createPost = createAsyncThunk(
  "post/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/posts/create-post", formData, {
        withCredentials: true,
      });

      return res.data.data;
    } catch (err) {
      const errData = err.response?.data;
      const message =
        errData?.details?.[0]?.message ||
        errData?.message ||
        err.message ||
        "Login failed";
      return rejectWithValue(message);
    }
  },
);

//----------------- FETCH ALL POSTS ------------------
export const fetchAllPosts = createAsyncThunk(
  "post/fetchAllPosts",
  async ({ page }, { rejectWithValue }) => {
    try {
      const res = await API.get("/posts/get-posts", {
        withCredentials: true,
        params: {
          page,
        },
      });

      const { count, data, pagination } = res.data;
      return { count, data, pagination };
    } catch (err) {
      const errData = err.response?.data;
      const message =
        errData?.details?.[0]?.message ||
        errData?.message ||
        err.message ||
        "fetch all posts failed";
      return rejectWithValue(message);
    }
  },
);

//----------------- FETCH ALL POSTS BY CATEGORY ------------------
export const fetchAllPostsByCategory = createAsyncThunk(
  "post/fetchAllPostsByCategory",
  async ({ page, category, limit }, { rejectWithValue }) => {
    try {
      const res = await API.get("/posts/get-posts-by-category", {
        withCredentials: true,
        params: {
          page,
          category,
          ...(limit && { limit }),
        },
      });

      const { data, count, pagination } = res.data;
      return { category, data, count, pagination };
    } catch (err) {
      const errData = err.response?.data;
      const message =
        errData?.details?.[0]?.message ||
        errData?.message ||
        err.message ||
        "Fetch by category failed";
      return rejectWithValue(message);
    }
  },
);

//----------------- FETCH POST DETAILS ------------------
export const fetchPostDetails = createAsyncThunk(
  "post/fetchPostDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/posts/get-post/${id}`, {
        withCredentials: true,
      });

      const { data } = res.data;
      return { data };
    } catch (err) {
      const errData = err.response?.data;
      const message =
        errData?.details?.[0]?.message ||
        errData?.message ||
        err.message ||
        "Fetching Post details failed";
      return rejectWithValue(message);
    }
  },
);

//----------------- FETCH PARTNER POST ------------------
export const fetchPartnerPosts = createAsyncThunk(
  "post/fetchPartnerPosts",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/posts/get-partner-post/${id}`, {
        withCredentials: true,
      });

      const { data } = res.data;
      return { data };
    } catch (err) {
      const errData = err.response?.data;
      const message =
        errData?.details?.[0]?.message ||
        errData?.message ||
        err.message ||
        "Fetching Partner posts failed";
      return rejectWithValue(message);
    }
  },
);

//----------------- FETCH  MY POSTS ------------------
export const fetchMyPosts = createAsyncThunk(
  "post/fetchMyPosts",
  async ({ page }, { rejectWithValue }) => {
    try {
      const res = await API.get("/posts/get-my-posts", {
        withCredentials: true,
        params: {
          page,
        },
      });

      const { data, count, pagination } = res.data;
      return { data, count, pagination };
    } catch (err) {
      const errData = err.response?.data;
      const message =
        errData?.details?.[0]?.message ||
        errData?.message ||
        err.message ||
        "Fetching Partner posts failed";
      return rejectWithValue(message);
    }
  },
);

//----------------- FETCH PARTNER POST ------------------
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.delete(`/posts/delete-post/${id}`, {
        withCredentials: true,
      });

      const { message } = res.data;
      return { id, message };
    } catch (err) {
      const errData = err.response?.data;
      const message =
        errData?.details?.[0]?.message ||
        errData?.message ||
        err.message ||
        "Deleteing post failed";
      return rejectWithValue(message);
    }
  },
);

//----------------- FETCH PARTNER POST ------------------
export const editPost = createAsyncThunk(
  "post/editPost",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/posts/edit-post/${id}`, formData, {
        withCredentials: true,
      });

      const { data } = res.data;
      return { data };
    } catch (err) {
      const errData = err.response?.data;
      const message =
        errData?.details?.[0]?.message ||
        errData?.message ||
        err.message ||
        "Deleteing post failed";
      return rejectWithValue(message);
    }
  },
);

// --- initial values ---
const postSlice = createSlice({
  name: "post",
  initialState: {
    post: {},
    postsByCategory: {},
    posts: [],
    loading: false,
    error: null,
    count: 0,
    message: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalResults: 0,
      limit: 10,
      hasNextPage: false,
      hasPrevPage: false,
    },
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE POST
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH MY POSTS
      .addCase(fetchMyPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data || [];
        state.pagination = action.payload.pagination || {};
        state.count = action.payload.count || 0;
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ALL POSTS BY CATEGORY
      .addCase(fetchAllPostsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPostsByCategory.fulfilled, (state, action) => {
        const { category, count, pagination, data } = action.payload;
        state.loading = false;
        state.postsByCategory[category] = { data, count, pagination };
      })
      .addCase(fetchAllPostsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH POST DETAILS
      .addCase(fetchPostDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload.data;
      })
      .addCase(fetchPostDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE POST
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.id,
        );

        state.count -= 1;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH POST DETAILS
      .addCase(editPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload.data;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPartnerPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartnerPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
      })
      .addCase(fetchPartnerPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
