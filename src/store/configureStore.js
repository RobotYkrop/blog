import { createSlice } from '@reduxjs/toolkit';

import { getArticle } from '../components/BlogApi/BlogApi';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    articles: [],
    postsCount: 0,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getArticle.fulfilled]: (state, action) => {
      state.articles = action.payload.articles;
      state.postsCount = action.payload.articlesCount;
    },
  },
});

export const { setCurrentPage, setCurrentLimit } = blogSlice.actions;

export default blogSlice.reducer;
