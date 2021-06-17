import axios from 'axios';

export const BASE_URL = 'http://5c3db915a9d04f0014a98a79.mockapi.io';
export const OVERVIEW_ENDPOINT = '/overview';
export const CAMPAIGNS_ENDPOINT = '/campaigns';

const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getOverviewData = async () => {
  const response = await axiosInstance.get(OVERVIEW_ENDPOINT);
  return response.data;
};

export const getCampaignsData = async () => {
  const response = await axiosInstance.get(CAMPAIGNS_ENDPOINT);
  return response.data;
};
