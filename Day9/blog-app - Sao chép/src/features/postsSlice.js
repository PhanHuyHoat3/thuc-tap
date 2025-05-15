import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/api';

// Async thunks
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await api.getPosts();
  return response.data;
});

export const createNewPost = createAsyncThunk('posts/createNewPost', async (post) => {
  const response = await api.createPost(post);
  return response.data;
});

export const updateExistingPost = createAsyncThunk('posts/updateExistingPost', async ({ id, post }) => {
  const response = await api.updatePost(id, post);
  return response.data;
});

export const deleteExistingPost = createAsyncThunk('posts/deleteExistingPost', async (id) => {
  await api.deletePost(id);
  return id;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createNewPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })

      .addCase(updateExistingPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })

      .addCase(deleteExistingPost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;