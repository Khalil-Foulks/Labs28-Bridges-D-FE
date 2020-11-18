import React, { PureComponent } from 'react';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

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
    marginTop: '10%',
    paddingBottom: '18%',
    marginLeft: '50%',
    height: 20,
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

const Graphs3 = () => {
  const classes = useStyles();
  return (
    <div>
      {/* <div>
        <PieChart width={400} height={300} >
          <div>Bridge Status</div>
          <Pie
            isAnimationActive={false}
            data={data01}
            cx={150}
            cy={80}
            outerRadius={50}
            fill="#8884d8"
            label
          />

          <Tooltip />
        </PieChart>
      </div> */}
      <div className={classes.root}>
        <BorderLinearProgress variant="determinate" value={70} />
        <div>Bridge Span</div>
      </div>
    </div>
  );
};

export default Graphs3;
