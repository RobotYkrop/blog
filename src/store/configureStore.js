import { createSlice } from '@reduxjs/toolkit';

import {
  getArticle,
  getOneArticle,
  postRegisterUser,
  postUserLogin,
  putUpdateUser,
} from '../components/BlogApi/BlogApi';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    articles: [],
    oneArticle: {},
    author: {},
    postsCount: 0,
    isError: false,
    isLoading: false,
    userInfo: {},
    token: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userInfo = {};
    },
  },
  extraReducers: {
    // Изменение информации о пользователе в профиле
    [putUpdateUser.pending]: (state) => {
      state.isError = false;
      state.isLoading = true;
    },
    [putUpdateUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload.user;
    },
    [putUpdateUser.rejected]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    // Отправка запроса на регистрацию пользователя
    [postRegisterUser.pending]: (state) => {
      state.isError = false;
      state.isLoading = true;
    },
    [postRegisterUser.fulfilled]: (state, action) => {
      state.token = action.payload.user.token;
      state.userInfo = action.payload.user;
    },
    [postRegisterUser.rejected]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    // Отправка запроса на вход в систему
    [postUserLogin.pending]: (state) => {
      state.isError = false;
      state.isLoading = true;
    },
    [postUserLogin.fulfilled]: (state, action) => {
      state.token = action.payload.user.token;
      state.userInfo = action.payload.user;
    },
    [postUserLogin.rejected]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    // Получение одного поста
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
    // Получение списка постов
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

export const { logout } = blogSlice.actions;

export default blogSlice.reducer;
