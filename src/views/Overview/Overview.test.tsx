import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { server, rest } from '../../mocks/server';
import { store } from '../../redux/store';
import Overview from './Overview';
import { BASE_URL, OVERVIEW_ENDPOINT } from '../../services/axiosService/api';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

it('Renders Overview page successfully', async () => {
  const { getByText } = render(
    <Provider store={store}>
      <Overview />
    </Provider>
  );
  expect(getByText(/loading/i)).toBeInTheDocument();
  await waitFor(() => expect(getByText(/installs/i)).toBeInTheDocument());
  await waitFor(() => expect(getByText(/revenue/i)).toBeInTheDocument());
});

it('Renders Error view because of a failed request', async () => {
  server.use(
    rest.get(`${BASE_URL}${OVERVIEW_ENDPOINT}`, (req, res, ctx) => {
      return res(ctx.status(404));
    })
  );

  const { getByText } = render(
    <Provider store={store}>
      <Overview />
    </Provider>
  );
  expect(getByText(/loading/i)).toBeInTheDocument();
  await waitFor(() => expect(getByText(/something went wrong/i)).toBeInTheDocument());
  await waitFor(() => expect(getByText(/fetching operation failed/i)).toBeInTheDocument());
  await waitFor(() => expect(getByText(/try again/i)).toBeInTheDocument());
});
