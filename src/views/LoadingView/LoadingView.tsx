import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingView: React.FC = () => {
  return (
    <Grid container justify="center">
      <div>Loading</div>
      <CircularProgress color="secondary" />
    </Grid>
  );
};

export default LoadingView;
