import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: [],
    totalPage: 0,
    pageNumber: 0,
  },
  reducers: {},
});

// export const selectPosts = ({ state }) => state;
// export const {} = blogSlice.actions;

export default blogSlice.reducer;
