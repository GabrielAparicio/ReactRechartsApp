import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../components/ErrorFallback';
import Chart from '../../components/Chart';
import LoadingView from '../LoadingView';
import { selectData, selectStatus, fetchOverviewData } from '../../features/overview/overviewSlice';
import { useAppSelector, useAppDispatch } from '../../redux/storeHooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

const Overview: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchOverviewData());
  }, []);

  if (status === 'loading') return <LoadingView />;

  if (status === 'failed') throw new Error('Fetching operation failed');

  return (
    <Grid container className={classes.root}>
      {status === 'idle' && data !== null ? (
        <>
          <Grid item xs={12} sm={6}>
            <Chart points={data.installs} title="Installs" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Chart points={data.installs} title="Revenue" />
          </Grid>
        </>
      ) : (
        <div>Empty data</div>
      )}
    </Grid>
  );
};

const BoundOverview = () => {
  const dispatch = useAppDispatch();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => dispatch(fetchOverviewData())}>
      <Overview />
    </ErrorBoundary>
  );
};

export default BoundOverview;
