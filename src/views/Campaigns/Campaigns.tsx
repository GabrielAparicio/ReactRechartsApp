import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LoadingView from '../LoadingView';
import {
  selectCampaignIds,
  selectStatus,
  fetchCampaigns,
} from '../../features/campaigns/campaignsSlice';
import { useAppSelector, useAppDispatch } from '../../redux/storeHooks';
import AllCampaigns from '../../features/campaigns/components/AllCampaigns';
import CreateCampaignForm from '../../features/campaigns/components/CreateCampaignForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
    },
    firstRow: {
      height: '20%',
      margin: 'auto',
    },
    secondRow: {
      height: '80%',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

const Campaigns = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const campaignIds = useAppSelector(selectCampaignIds);
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, []);

  if (status === 'loading') return <LoadingView />;

  if (status === 'failed') return <div>Failed!</div>;

  return (
    <Grid container direction="column" className={classes.root}>
      {status === 'idle' && campaignIds.length > 0 ? (
        <>
          <Grid item className={classes.firstRow}>
            <CreateCampaignForm />
          </Grid>
          <Grid item className={classes.secondRow}>
            <AllCampaigns campaignIds={campaignIds} />
          </Grid>
        </>
      ) : (
        <div>Empty data</div>
      )}
    </Grid>
  );
};

export default Campaigns;
