import { createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'https://blog.kata.academy/api/';

export const getArticle = createAsyncThunk('blog/getArticle', async (offset, { rejectWithValue }) => {
  try {
    const res = await fetch(URL + `articles?limit=5&offset=${offset}`);
    if (!res.ok) {
      throw new Error('Не найден API' + `${res.status}`);
    }
    return await res.json();
  } catch (err) {
    return rejectWithValue(err.res);
  }
});

export const getOneArticle = createAsyncThunk('blog/getOneArticle', async (slug, { rejectWithValue }) => {
  try {
    const res = await fetch(URL + `articles/${slug}`);
    if (!res.ok) {
      throw new Error('Не найден API' + `${res.status}`);
    }
    const json = await res.json();
    return json;
  } catch (err) {
    return rejectWithValue(err.res);
  }
});

export const postRegisterUser = createAsyncThunk(
  'blog/postRegisterUser',
  async ({ username, email, password, rejectWithValue }) => {
    try {
      const res = await fetch(URL + 'users', {
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
      if (!res.ok) {
        throw Error;
      }
      return json;
    } catch (err) {
      return rejectWithValue(err.res);
    }
  }
);

export const postUserLogin = createAsyncThunk('blog/postUserLogin', async ({ email, password, rejectWithValue }) => {
  try {
    const res = await fetch(URL + 'users/login', {
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
    console.log(res);
    const json = res.json();
    if (!res.ok) {
      throw Error;
    }
    return json;
  } catch (err) {
    throw rejectWithValue(err.message);
  }
});

export const putUpdateUser = createAsyncThunk(
  'blog/postUserLogin',
  async ({ username, email, password, image, token, rejectWithValue }) => {
    try {
      const res = await fetch(URL + 'user', {
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
      if (!res.ok) {
        throw Error;
      }
      return json;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const postCreateArticle = createAsyncThunk(
  'blog/postCreateArticle',
  async ({ title, description, body, tagList, token, rejectWithValue }) => {
    try {
      const res = await fetch(URL + 'articles', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          article: {
            title: title,
            description: description,
            body: body,
            tagList: [...tagList],
          },
        }),
      });
      const json = res.json();
      if (!res.ok) {
        throw Error;
      }
      return json;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const putUpdateArticle = createAsyncThunk(
  'blog/putUpdateArticle',
  async ({ slug, title, description, body, tagList, token, rejectWithValue }) => {
    try {
      const res = await fetch(URL + `articles/${slug}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          article: {
            title: title,
            description: description,
            body: body,
            tagList: [...tagList],
          },
        }),
      });
      const json = res.json();
      if (!res.ok) {
        throw Error;
      }
      return json;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteArticle = createAsyncThunk('blog/deleteArticle', async ({ slug, token, rejectWithValue }) => {
  try {
    const res = await fetch(URL + `articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw Error;
    }
    return await res.json();
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const postLikes = createAsyncThunk('blog/postLikes', async ({ slug, token, rejectWithValue }) => {
  try {
    const res = await fetch(URL + `articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const json = res.json();
    if (!res.ok) {
      throw Error;
    }
    return json;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const deleteLikes = createAsyncThunk('blog/deleteLikes', async ({ slug, token, rejectWithValue }) => {
  try {
    const res = await fetch(URL + `articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const json = res.json();
    if (!res.ok) {
      throw Error;
    }
    return json;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});
