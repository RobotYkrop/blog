import { createSlice } from '@reduxjs/toolkit';

import { getArticle, getOneArticle } from '../components/BlogApi/BlogApi';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    articles: [],
    oneArticle: {},
    author: {},
    postsCount: 0,
    isError: false,
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [getOneArticle.pending]: (state) => {
      state.isError = false;
      state.isLoading = true;
    },
    [getOneArticle.rejected]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    [getOneArticle.fulfilled]: (state, action) => {
      state.oneArticle = action.payload.article;
      state.author = action.payload.article.author;
      state.isError = false;
      state.isLoading = false;
    },
    [getArticle.pending]: (state) => {
      state.isError = false;
      state.isLoading = true;
    },
    [getArticle.fulfilled]: (state, action) => {
      state.articles = action.payload.articles;
      state.postsCount = action.payload.articlesCount;
      state.isError = false;
      state.isLoading = false;
    },
    [getArticle.rejected]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

export const { setCurrentPage, setCurrentLimit } = blogSlice.actions;

export default blogSlice.reducer;
