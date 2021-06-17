import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTE_PATHS } from '../../Routes/Routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    header: {
      marginRight: theme.spacing(4),
    },
    gridContainer: {
      width: '50%',
    },
  })
);

const NavBar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" className={classes.header}>
              AppLike Frontend Test
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button color="default" component={RouterLink} to={ROUTE_PATHS.HOMEPAGE_ROUTE}>
              Overview
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button color="default" component={RouterLink} to={ROUTE_PATHS.CAMPAIGNS_ROUTE}>
              Campaigns
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
