import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOverviewData } from '../../services/axiosService/api';
import { RootState } from '../../redux/store';
import { CharPoint } from '../../redux/types';

interface OverviewResponse {
  installs: CharPoint[];
  revenue: CharPoint[];
}

interface OverviewState {
  data: OverviewResponse | null;
  status: 'idle' | 'loading' | 'failed';
}

export const fetchOverviewData = createAsyncThunk('overview/fetch', async () => {
  const response = getOverviewData();
  return response as unknown as OverviewResponse;
});

const initialState: OverviewState = {
  data: null,
  status: 'idle',
};

const overviewSlice = createSlice({
  name: 'overview',
  initialState,
  reducers: {
    resetState(state) {
      state.data = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOverviewData.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchOverviewData.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchOverviewData.rejected, (state) => {
        state.status = 'failed';
        state.data = null;
      });
  },
});

// Selectors
export const selectData = (state: RootState) => state.overview.data;
export const selectStatus = (state: RootState) => state.overview.status;

export const { resetState } = overviewSlice.actions;
export default overviewSlice.reducer;
