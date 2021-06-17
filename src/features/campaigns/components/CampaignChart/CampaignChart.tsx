import React from 'react';
import Chart from '../../../../components/Chart';
import { useAppSelector } from '../../../../redux/storeHooks';
import { selectCampaign } from '../../campaignsSlice';

interface CampaignChartProps {
  id: string;
}

const CampaignChart: React.FC<CampaignChartProps> = ({ id }) => {
  const campaign = useAppSelector((state) => selectCampaign(state, id));
  return <Chart points={campaign.installs} title="Installs" />;
};

export default CampaignChart;
