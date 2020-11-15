import React, { PureComponent, useEffect, useState } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';

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

const Graphs3 = ({ record }) => {
  const newData = data => {
    const newCurrentData = data.map(obj =>
      Object.keys(obj)
        .filter(x => obj[x] !== null)
        .reduce((o, e) => {
          o[e] = obj[e];
          return o;
        }, {})
    );
    const noUnderfined = newCurrentData.map(obj =>
      Object.keys(obj)
        .filter(x => obj[x] !== undefined)
        .reduce((o, e) => {
          o[e] = obj[e];
          return o;
        }, {})
    );

    return noUnderfined;
  };

  console.log('g5', record);

  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <BorderLinearProgress variant="determinate" value={record} />
        <div>Bridge Span</div>
      </div>
    </div>
  );
};

export default Graphs3;
