import { configureStore } from '@reduxjs/toolkit';

import blogSlice from './configureStore';

export default configureStore({
  reducer: {
    blogSlice: blogSlice,
  },
});
