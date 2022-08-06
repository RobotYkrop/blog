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

export const postRegisterUser = createAsyncThunk(
  'blog/postRegisterUser',
  async ({ username, email, password, rejectWithValue }) => {
    try {
      const res = await fetch('https://blog.kata.academy/api/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: username,
            email: email,
            password: password,
            image: '',
          },
        }),
      });
      const json = res.json();
      console.log(res);
      if (!res.ok) {
        throw 'Error';
      }
      console.log(json);
      return json;
    } catch (err) {
      if (!err.res) {
        throw new Error(err.message);
      }
      return rejectWithValue(err.res.json);
    }
  }
);

export const postUserLogin = createAsyncThunk('blog/postUserLogin', async ({ email, password, rejectWithValue }) => {
  try {
    const res = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    });
    const json = res.json();
    console.log(res);
    if (!res.ok) {
      throw 'Error';
    }
    console.log(json);
    return json;
  } catch (err) {
    if (!err.res) {
      throw new Error(err.message);
    }
    return rejectWithValue(err.res.json);
  }
});

export const putUpdateUser = createAsyncThunk(
  'blog/postUserLogin',
  async ({ username, email, password, image, token, rejectWithValue }) => {
    try {
      const res = await fetch('https://blog.kata.academy/api/user', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: {
            username: username,
            email: email,
            password: password,
            image: image,
          },
        }),
      });
      const json = res.json();
      console.log(res);
      if (!res.ok) {
        throw 'Error';
      }
      console.log(json);
      return json;
    } catch (err) {
      if (!err.res) {
        throw new Error(err.message);
      }
      return rejectWithValue(err.res.json);
    }
  }
);
