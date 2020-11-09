import React, { useState, useEffect } from 'react';
import {
  root,
  infoCard,
  chartCard,
  tableCard,
  green,
  gold,
} from './dataStyles.js';
import { columns } from './HeaderColumns';

import axios from 'axios';
import {
  makeStyles,
  CssBaseline,
  Card,
  Grid,
  CardMedia,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TablePage from '../../common/TablePage';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [rowSize, setRowSize] = useState(7);
  const [rowSize2, setRowSize2] = useState(5);

  // function to expand Record Data
  const handleExpandClick = () => {
    setExpanded(!expanded ? true : false);
    setRowSize(expanded === true ? 7 : 12);
    setRowSize2(expanded === true ? 5 : 12);
  };

  const { TblContainer, TblHead } = TablePage(data, columns);

  const array = [];
  //hits endpoint and gets all bridges
  useEffect(() => {
    axios
      .get('https://b2ptc.herokuapp.com/bridges')
      .then(response => {
        response.data.map(element => {
          //pushes every element to array variable
          array.push(element);
        });
        setData(array);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  console.log(data);

  const useStyles = makeStyles({
    root,
    infoCard,
    chartCard,
    tableCard,
    green,
    gold,
  });
  const classes = useStyles();
  return (
    <CssBaseline>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={rowSize}>
          <Card xs={12} sm={6} className={classes.infoCard}>
            <dev>test</dev>
            <ArrowForwardIcon onClick={handleExpandClick} />
          </Card>
        </Grid>
        <Grid item xs={12} sm={rowSize2}>
          <Card xs={12} sm={6} className={classes.chartCard}>
            <dev>test</dev>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className={classes.tableCard}>
            <dev>test</dev>
            <TblContainer>
              <TblHead />
              <TableBody>
                {data.map(item => (
                  <TableRow
                    className={item.id % 2 ? classes.green : classes.gold}
                    key={item.id}
                  >
                    <TableCell>{item.bridge_name}</TableCell>
                    <TableCell>{item.bridge_type}</TableCell>
                    <TableCell>{item.bridge_type}</TableCell>
                    <TableCell>{item.district_name}</TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.individuals_served}</TableCell>
                    <TableCell>{item.latitude}</TableCell>
                    <TableCell>{item.longitude}</TableCell>
                    <TableCell>{item.project_code}</TableCell>
                    <TableCell>{item.project_stage}</TableCell>
                    <TableCell>{item.province_id}</TableCell>
                    <TableCell>{item.province_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TblContainer>
          </Card>
        </Grid>
      </Grid>
    </CssBaseline>
  );
};
export default DataTable;
