import { configureStore } from '@reduxjs/toolkit';
import nodesReducer from './slices/nodeSlice';

export const store = configureStore({
  reducer: {
    nodes: nodesReducer,
  },
});

// Optional: export RootState and AppDispatch for use with hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
