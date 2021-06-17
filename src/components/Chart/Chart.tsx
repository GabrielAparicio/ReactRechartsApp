import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { CharPoint } from '../../redux/types';

export interface ChartPoints {
  points: CharPoint[];
  title: string;
}

const Chart: React.FC<ChartPoints> = ({ points, title }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Divider />

      <ResponsiveContainer width="85%" height="50%">
        <LineChart data={points}>
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="day" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;
