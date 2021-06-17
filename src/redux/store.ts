import { configureStore } from '@reduxjs/toolkit';
import overviewReducer from '../features/overview/overviewSlice';
import campaignsReducer from '../features/campaigns/campaignsSlice';

export const store = configureStore({
  reducer: {
    overview: overviewReducer,
    campaigns: campaignsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
