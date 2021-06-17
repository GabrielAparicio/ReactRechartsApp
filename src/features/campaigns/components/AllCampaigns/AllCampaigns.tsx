import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import CampaignMenu from '../CampaignMenu';
import CampaignChart from '../CampaignChart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);

interface AllCampaignsProps {
  campaignIds: string[];
}

const AllCampaigns: React.FC<AllCampaignsProps> = ({ campaignIds }) => {
  const classes = useStyles();
  const [currentCampaignId, setCurrentCampaingId] = useState<null | string>(null);

  useEffect(() => {
    if (campaignIds.length !== 0) setCurrentCampaingId(campaignIds[0]);
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCurrentCampaingId(event.target.value as string);
  };

  if (currentCampaignId === null) return <div>Empty</div>;

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-label">Campaign Names</InputLabel>
        <Select native labelId="select-label" value={currentCampaignId} onChange={handleChange}>
          {campaignIds.map((id) => (
            <CampaignMenu key={id} id={id} />
          ))}
        </Select>
      </FormControl>
      <CampaignChart id={currentCampaignId} />
    </>
  );
};

export default AllCampaigns;
