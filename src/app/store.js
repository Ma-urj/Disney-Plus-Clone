import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import movieReducer from '../features/movie/movieSlice';
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
