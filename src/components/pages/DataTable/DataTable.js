import React, { useState, useEffect, useMemo } from 'react';

import * as d3 from 'd3';
import { FlyToInterpolator } from 'react-map-gl';
import { motion } from 'framer-motion';

import { BrowserRouter as Link } from 'react-router-dom';

import { columns } from './HeaderColumns';
import './datatable.css';

import axios from 'axios';
import {
  makeStyles,
  Grid,
  TableBody,
  TableRow,
  TablePagination,
  TableHead,
  Table,
  TableContainer,
  TableSortLabel,
  Drawer,
  Divider,
  withStyles,
  Toolbar,
  AppBar,
  Paper,
  TextField,
  List,
  ListItem,
  Input,
  InputAdornment,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MuiTableCell from '@material-ui/core/TableCell';

import MiniMap from './MiniMap.js';
import Graphs from './Graphs.js';
import Graphs2 from './Graphs2.js';

import Graphs3 from './Graphs3';
import Graphs4 from './Graphs4';
import Graph5 from './Graph5';

const TableCell = withStyles({
  root: {
    borderColor: '#372d4a',

    borderBottomWidth: '10px',
    color: 'white',
  },
})(MuiTableCell);

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

// This is the compnent for the Table Header
// it takes in the columns component for the Table
//Column names and functions for sort
const EnhancedTableHead = props => {
  const {
    classes,

    order,
    orderBy,

    onRequestSort,
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'asc' : 'desc'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default function EnhancedTable() {
  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [selected, setSelected] = useState([]);
  const [dense, setDense] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [search, setSearch] = useState('');
  const [viewport, setViewport] = useState([]);
  const [long, setLong] = useState();
  const [lat, setLat] = useState();

  console.log(data);

  const tableData = useMemo(() => {
    if (!search) return currentData;

    return currentData.filter(searchinfo => {
      return (
        searchinfo.country.toLowerCase().includes(search.toLowerCase()) ||
        searchinfo.bridge_opportunity_level1_government
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        searchinfo.bridge_opportunity_level2_government
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        searchinfo.bridge_opportunity_stage
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        searchinfo.bridge_name.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [currentData, search]);

  // Axios call to get the Bridge Data
  useEffect(() => {
    axios
      .get('https://b2pmergefinal.bridgestoprosperity.dev/all_data')
      .then(res => {
        setData(res.data);
        setCurrentData(res.data);
      });
  }, []);

  //Show new page When table is updated
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // Handles how many rows will be on the table
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Contols the table sorting
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  /// OnClick function that updates detais card
  const handleClick = (event, name) => {
    setSelected(name);
    setLat(name.bridge_opportunity_gps_latitude);
    setLong(name.bridge_opportunity_gps_longitude);
    FlyTo(lat, long);
    console.log('what is this', name.bridge_opportunity_gps_latitude);
    // console.log( 'what new inf1o', cardDetails)
  };

  const drawerWidth = 240;
  const useStyles = makeStyles(theme => ({
    container: {
      maxHeight: 300,
      backgroundColor: '#372d4a',
      overflowY: 'auto',
      margin: 0,
      padding: 0,
      listStyle: 'none',
      height: '100%',
      '&::-webkit-scrollbar': {
        width: '0.4em',
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '10px solid slategrey',
      },
    },
    table: {
      minWidth: 750,
      maxHeight: '400px',
      backgroundColor: '#372d4a',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginRight: drawerWidth,
      backgroundColor: '#372d4a',
      color: ' black',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      background:
        'linear-gradient(93deg, rgba(41,66,122,1) 0%, rgba(91,69,133,1) 81%)',
    },
    drawerPaper: {
      width: drawerWidth,
      background:
        'linear-gradient(93deg, rgba(41,66,122,1) 0%, rgba(91,69,133,1) 81%)',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      background:
        'linear-gradient(93deg, rgba(41,66,122,1) 0%, rgba(91,69,133,1) 81%)',
      color: 'white',
      maxHeight: '200px',
      borderRadius: '20px',
    },
    graph4: {
      paddingBottom: '5%',
      paddingLeft: '8%',
      textAlign: 'center',
      background:
        'linear-gradient(93deg, rgba(41,66,122,1) 0%, rgba(91,69,133,1) 81%)',
      color: 'white',
      maxHeight: '200px',
      borderRadius: '20px',
    },
    graph3: {
      textAlign: 'center',
      background:
        'linear-gradient(93deg, rgba(41,66,122,1) 0%, rgba(91,69,133,1) 81%)',
      color: 'white',
      maxHeight: '200px',
      borderRadius: '20px',
    },
    textBlock: {
      backgroundColor: '#39d1e6',
    },
  }));

  const classes = useStyles();

  const FlyTo = (x, y) => {
    console.log('what is x', x);
    const flyViewport = {
      latitude: x,
      longitude: y,
      zoom: 14,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: d3.easeCubic,
    };
    setViewport(flyViewport);
  };

  console.log('selected info', selected.river_crossing_deaths_in_last_3_years);
  return (
    <div
      style={{ marginRight: '5%', backgroundColor: '#372d4a', height: '100vh' }}
    >
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar
          style={{
            displey: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link to="/main">
            <h1 style={{ color: '#39d1e6', fontWeight: '600' }}>Home</h1>
          </Link>
          <h1 style={{ color: '#39d1e6', fontWeight: '600' }}>Dashboard</h1>
          <div className="filter-search">
            <form className={classes.textBlock} noValidate>
              <TextField
                className={classes.textBlock}
                color="primary"
                variant="filled"
                id="outlined-basic"
                label="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </div>
        </Toolbar>
      </AppBar>
      <main
        style={{ backgroundColor: '#372d4a', maxWidth: '87%' }}
        className={classes.content}
      >
        <div className={classes.toolbar} />
        <Grid container spacing={3}>
          <Grid item direction="row" xs={4} style={{ width: '80%' }}>
            <motion.div
              whileHover={{
                scale: 1.1,

                borderRadius: '25px',
                border: '2px solid #39d1e6',
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Paper className={classes.paper} elevation={7}>
                <Graphs
                  record={selected.river_crossing_deaths_in_last_3_years}
                  record2={selected.river_crossing_injuries_in_last_3_years}
                />
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={4}>
            <motion.div
              whileHover={{
                scale: 1.1,

                borderRadius: '25px',
                border: '2px solid #39d1e6',
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Paper className={classes.paper} elevation={7}>
                <Graphs2 />
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={4}>
            <motion.div
              whileHover={{
                scale: 1.1,

                borderRadius: '25px',
                border: '2px solid #39d1e6',
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Paper className={classes.paper} elevation={7}>
                <Graph5 record={selected.primary_crops_grown} />
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={6}>
            <motion.div
              whileHover={{
                scale: 1.1,

                borderRadius: '25px',
                border: '2px solid #39d1e6',
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Paper className={classes.graph4} elevation={7}>
                <Graphs4 record={selected} />
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={6}>
            <motion.div
              style={{ height: '100%' }}
              whileHover={{
                scale: 1.1,

                borderRadius: '25px',
                border: '2px solid #39d1e6',
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Paper
                className={classes.paper}
                style={{
                  height: '100%',
                }}
                elevation={7}
              >
                <Graphs3 record={selected.bridge_opportunity_span_m} />
              </Paper>
            </motion.div>
          </Grid>

          <Paper
            elevation={7}
            style={{
              maxHeight: '300px',
              width: '100%',
              backgroundColor: '#372d4a',
            }}
          >
            <TableContainer className={classes.container}>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
                aria-label="sticky table"
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  style={{ color: 'white' }}
                  onRequestSort={handleRequestSort}
                  rowCount={tableData.length}
                />

                <TableBody>
                  {stableSort(tableData, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          onClick={event => handleClick(event, row)}
                          style={
                            index % 2
                              ? {
                                  background:
                                    'linear-gradient(93deg, rgba(41,66,122,1) 0%, rgba(91,69,133,1) 81%)',
                                }
                              : {
                                  background:
                                    'linear-gradient(93deg, rgba(41,66,122,1) 0%, rgba(91,69,133,1) 81%)',
                                }
                          }
                          key={row}
                        >
                          <TableCell align="left">{row.country}</TableCell>
                          <TableCell align="left">
                            {row.name_of_nearest_city}
                          </TableCell>
                          <TableCell align="left">
                            {row.bridge_opportunity_level1_government}
                          </TableCell>
                          <TableCell align="left">
                            {row.bridge_opportunity_level2_government}
                          </TableCell>
                          <TableCell align="left">{row.bridge_name}</TableCell>
                          <TableCell align="left">
                            {row.bridge_opportunity_bridge_type}
                          </TableCell>
                          <TableCell align="left">
                            {row.bridge_opportunity_stage}
                          </TableCell>
                          <TableCell align="left">
                            {row.bridge_opportunity_project_code}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              elevation={7}
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              style={{
                backgroundColor: '#372d4a',
                color: 'white',
                boxShadow: '10px 10px 33px 1px rgba(0,0,0,0.75',

                maxHeight: '50px',
              }}
            />
          </Paper>
        </Grid>
      </main>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />

        <Divider />

        <List style={{ color: 'white' }}>
          <ListItem style={{ textAlign: 'center' }}>
            Bridge Name: {selected.bridge_name}
          </ListItem>
          <Divider style={{ backgroundColor: '#39d1e6' }} />
          <ListItem style={{ textAlign: 'center' }}>
            Entry By: {selected.form_created_by}
          </ListItem>
          <Divider style={{ backgroundColor: '#39d1e6' }} />
          <ListItem style={{ textAlign: 'center' }}>
            Date: {selected.form_form_name}
          </ListItem>
          <Divider style={{ backgroundColor: '#39d1e6' }} />
          <ListItem style={{ textAlign: 'center' }}>
            Flagged for rejection: {selected.flag_for_rejection}
          </ListItem>
          <Divider style={{ backgroundColor: '#39d1e6' }} />
          <ListItem style={{ textAlign: 'center' }}>
            Opportuniry Stage: {selected.bridge_opportunity_stage}
          </ListItem>
          <Divider style={{ backgroundColor: '#39d1e6' }} />
          <ListItem style={{ textAlign: 'center' }}>
            Accessibility: {selected.four_wd_accessibility}
          </ListItem>
          <Divider style={{ backgroundColor: '#39d1e6' }} />
          <ListItem style={{ textAlign: 'center' }}>
            All weather crossing : {selected.nearest_all_weather_crossing_point}
          </ListItem>
          <Divider style={{ backgroundColor: '#39d1e6' }} />
        </List>
        <Divider />
        <MiniMap record={selected} />
        <Divider />
        <List style={{ color: 'white' }}>
          <Divider style={{ backgroundColor: '#39d1e6' }} />
          <ListItem style={{ textAlign: 'center' }}>
            Bridge Name: {selected.primary_crops_grown}
          </ListItem>
          <Divider style={{ backgroundColor: '#39d1e6' }} />
          <ListItem style={{ textAlign: 'center' }}>
            Social Information: {selected.notes_on_social_information}
          </ListItem>
          <Divider style={{ backgroundColor: '#39d1e6' }} />
          <ListItem style={{ textAlign: 'center' }}>
            Entry By: {selected.primary_occupations}
          </ListItem>
          <Divider style={{ backgroundColor: '#39d1e6' }} />
          <ListItem style={{ textAlign: 'center' }}>
            Date: {selected.incident_descriptions}
          </ListItem>
          <Divider style={{ backgroundColor: '#39d1e6' }} />
          <ListItem style={{ textAlign: 'center' }}>
            Flagged for rejection: {selected.market_access_blocked_by_river}
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
