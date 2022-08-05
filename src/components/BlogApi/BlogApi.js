import { createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'https://blog.kata.academy/api/';

export const getArticle = createAsyncThunk('blog/getArticle', async ({ offset, rejectWithValue }) => {
  try {
    const res = await fetch(URL + `articles?limit=5&offset=${offset}`);
    console.log(res);
    if (!res.ok) {
      throw new Error('Не найден API' + `${res.status}`);
    }
    const json = await res.json();
    console.log(json);
    return json;
  } catch (err) {
    if (!err.res) {
      throw new Error(err.message);
    }
    return rejectWithValue(err.res.json);
  }
});

export const getOneArticle = createAsyncThunk('blog/getOneArticle', async (slug, { rejectWithValue }) => {
  try {
    const res = await fetch(URL + `articles/${slug}`);
    console.log(res);
    if (!res.ok) {
      throw new Error('Не найден API' + `${res.status}`);
    }
    const json = await res.json();
    console.log(json);
    return json;
  } catch (err) {
    if (!err.res) {
      throw new Error(err.message);
    }
    return rejectWithValue(err.res.json);
  }
});
