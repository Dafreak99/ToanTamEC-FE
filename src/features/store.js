import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './project/projectSlice';
import userSlice from './user/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    project: projectSlice,
  },
});
