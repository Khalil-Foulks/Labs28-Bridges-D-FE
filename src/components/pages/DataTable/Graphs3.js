import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

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
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 800],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#39d1e6',
  },
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: '300px',
  },
});

const Graphs3 = ({ record }) => {
  console.log('bridg', record);

  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <BorderLinearProgress variant="determinate" value={record} />
        <div>Bridge Span {record}km</div>
      </div>
    </div>
  );
};

export default Graphs3;
