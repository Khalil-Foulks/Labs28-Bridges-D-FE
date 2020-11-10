import React, { useState, useEffect } from 'react';
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
    color: 'black',
  },
});

const DetailsCard = ({ record }) => {
  // const [info,setInfo] = useState([record])
  const classes = useStyles();
  console.log('new record', record);
  return (
    <div style={{ color: 'black' }}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <div>
            {record.bridge_image !== 'Waiting on Data' ? (
              <div className="bridge-image">
                <CardMedia
                  style={{ width: '200px' }}
                  alt="bridge_image"
                  src={`${record.bridge_image}`}
                />
              </div>
            ) : (
              <div className="bridge-image">
                <img
                  style={{ width: '200px' }}
                  alt="bridge_image_needed"
                  src="https://midlandbrewing.com/wp-content/uploads/2018/04/Photo-Coming-Soon.png"
                />
              </div>
            )}
          </div>
          <CardMedia />
        </Grid>
        <Grid item xs={6} sm={3}>
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
