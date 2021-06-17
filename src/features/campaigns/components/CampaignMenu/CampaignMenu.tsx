import React from 'react';
import { useAppSelector } from '../../../../redux/storeHooks';
import { selectCampaign } from '../../campaignsSlice';

interface CampaignProps {
  id: string;
}

const CampaignMenu: React.FC<CampaignProps> = ({ id }) => {
  const campaign = useAppSelector((state) => selectCampaign(state, id));
  return <option value={id}>{campaign.name}</option>;
};

export default CampaignMenu;
