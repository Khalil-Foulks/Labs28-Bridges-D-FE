import React, { useState, useEffect, useContext } from 'react';
import { ContextDataDetails } from '../Store';
import * as d3 from 'd3';
import { FlyToInterpolator } from 'react-map-gl';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  makeStyles,
  Grid,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  paper: {
    textAlign: 'center',
  },
});
console.log('what', ContextDataDetails);

const DetailsCard = ({ record }) => {
  const [cardDetails, setCardDetails] = useContext(ContextDataDetails);

  const classes = useStyles();

  setCardDetails(cardDetails);

  return (
    <div style={{ color: 'white', marginTop: '4%' }}>
      <Grid container spacing={3}>
        <Grid style={{ color: 'white' }} item xs={6} sm={3}>
          <div className={classes.div}>Bridge name: {record.bridge_name}</div>
          <div className={classes.div}>Bridge Type: {record.bridge_type}</div>
          <div className={classes.div}>
            District Name: {record.district_name}
          </div>
          <div className={classes.div}>
            Individuals_Served: {record.bridge_name}
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className={classes.div}>
            Province Name: {record.province_name}
          </div>
          <div className={classes.div}>
            Project Stage: {record.project_stage}
          </div>
          <div className={classes.div}>Latitude: {record.latitude}</div>
          <div className={classes.div}>Longitude: {record.longitude}</div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className={classes.div}>Province Id: {record.province_id}</div>
          <div className={classes.div}>Project Code: {record.project_code}</div>
          <div className={classes.div}>Province Id: {record.province_id}</div>
          <div className={classes.div}>District Id: {record.district_id}</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default DetailsCard;
