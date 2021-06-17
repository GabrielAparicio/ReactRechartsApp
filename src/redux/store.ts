import { configureStore } from '@reduxjs/toolkit';
import overviewsReducer from '../features/overview/overviewSlice';
import campaignsReducer from '../features/campaigns/campaignsSlice';

export const store = configureStore({
  reducer: {
    overviews: overviewsReducer,
    campaigns: campaignsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
