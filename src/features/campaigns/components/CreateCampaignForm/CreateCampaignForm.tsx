import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useAppDispatch } from '../../../../redux/storeHooks';
import { addCampaign } from '../../campaignsSlice';

interface CreateCampaingFields {
  campaignName: string;
}

const inputFields = {
  campaignName: {
    name: 'campaignName',
    type: 'text',
    id: 'campaign-name',
    label: 'New Campaign Name',
    defaultValue: '',
    rules: {
      required: 'Campaign name required',
      minLength: { value: 5, message: '5 characters mimimum' },
    },
  },
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'block',
      marginTop: '2em',
    },
    submitButton: {
      marginRight: theme.spacing(2),
    },
  })
);

const CreateCampaignForm: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateCampaingFields>();

  const onSubmit: SubmitHandler<CreateCampaingFields> = (data) => {
    const { campaignName } = data;
    dispatch(addCampaign(campaignName));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              type={inputFields.campaignName.type}
              id={inputFields.campaignName.id}
              label={inputFields.campaignName.label}
            />
          )}
          name="campaignName"
          control={control}
          defaultValue={inputFields.campaignName.defaultValue}
          rules={inputFields.campaignName.rules}
        />
        {errors.campaignName && <p>{errors.campaignName.message}</p>}

        <Button className={classes.root} type="submit" color="primary" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateCampaignForm;
