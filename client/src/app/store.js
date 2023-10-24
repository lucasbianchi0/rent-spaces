// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/UserSlice.js';
import spaceReducer from './space/SpaceSlice.js';
import { spacesApi } from './space/api.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    space: spaceReducer,
    [spacesApi.reducerPath]: spacesApi.reducer,
    // ...otros reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spacesApi.middleware),
});

export default store;
