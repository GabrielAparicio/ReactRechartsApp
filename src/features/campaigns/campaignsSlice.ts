import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { CharPoint } from '../../redux/types';
import { getCampaignsData } from '../../services/axiosService/api';
import generateCampaign from '../../utils/generateCampaign';

interface Campaign {
  id: string;
  name: string;
  installs: CharPoint[];
}

type CampaignsResponse = Campaign[];

interface CampaignsState {
  campaigns: {
    byIds: {
      [key: string]: Campaign;
    };
    campaignIds: string[];
  };
  status: 'idle' | 'loading' | 'failed';
}

export const fetchCampaigns = createAsyncThunk('campaigns/fetch', async () => {
  const response = await getCampaignsData();
  return response as unknown as CampaignsResponse;
});

const initialState: CampaignsState = {
  campaigns: {
    byIds: {},
    campaignIds: [],
  },
  status: 'idle',
};

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    addCampaign(state, action: PayloadAction<string>) {
      const { payload: newCampaignName } = action;
      const notRepeated = state.campaigns.campaignIds.every(
        (id) => state.campaigns.byIds[id].name !== newCampaignName
      );

      if (notRepeated) {
        const newCampaign = generateCampaign(newCampaignName);
        state.campaigns.byIds[newCampaign.id] = newCampaign;
        state.campaigns.campaignIds.push(newCampaign.id);
      }
    },
    resetState(state) {
      state.campaigns = {
        byIds: {},
        campaignIds: [],
      };
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.status = 'loading';
        state.campaigns = {
          byIds: {},
          campaignIds: [],
        };
      })
      .addCase(fetchCampaigns.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.campaigns.campaignIds = payload.map((campaign) => campaign.id);
        payload.forEach((campaign) => {
          state.campaigns.byIds[campaign.id] = campaign;
        });
      })
      .addCase(fetchCampaigns.rejected, (state) => {
        state.status = 'failed';
        state.campaigns = {
          byIds: {},
          campaignIds: [],
        };
      });
  },
});

// Selectors
export const selectCampaignIds = (state: RootState) => state.campaigns.campaigns.campaignIds;
export const selectCampaigns = (state: RootState) => state.campaigns.campaigns.byIds;
export const selectCampaign = (state: RootState, id: string) => selectCampaigns(state)[id];
export const selectStatus = (state: RootState) => state.campaigns.status;

export const { addCampaign, resetState } = campaignsSlice.actions;
export default campaignsSlice.reducer;
