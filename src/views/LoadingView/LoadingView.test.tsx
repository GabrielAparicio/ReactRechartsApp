import React from 'react';
import { render } from '@testing-library/react';
import LoadingView from './LoadingView';

test('Renders loading message successfully', async () => {
  const { getByText } = render(<LoadingView />);
  expect(getByText(/loading/i)).toBeInTheDocument();
});
