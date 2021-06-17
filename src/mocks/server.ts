import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BASE_URL, OVERVIEW_ENDPOINT } from '../services/axiosService/api';
import { overviewData } from './mockOverviewData';

const server = setupServer(
  rest.get(`${BASE_URL}${OVERVIEW_ENDPOINT}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(overviewData));
  })
);

export { server, rest };