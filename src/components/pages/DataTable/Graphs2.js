import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';

const data01 = [
  { name: 'Completed', value: 400 },
  { name: 'Rejected', value: 300 },
  { name: 'building', value: 300 },
  { name: 'confirmed', value: 200 },
  { name: 'rejected', value: 278 },
  { name: 'identified', value: 189 },
];

const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: '300px',
  },
});

const Graphs2 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        'http://b2p2018-finalmerge1.eba-4apifgmz.us-east-1.elasticbeanstalk.com/all_data'
      )
      .then(res => {
        setData(res.data);
      });
  }, []);

  return (
    <div>
      <div>
        <div>Bridge Status</div>
        <PieChart width={400} height={300}>
          <Pie
            isAnimationActive={false}
            data={data01}
            cx={150}
            cy={70}
            outerRadius={50}
            fill="#39d1e6"
            label
          />

          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default Graphs2;
