import React, { useState, useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { FlyToInterpolator } from 'react-map-gl';

import { columns } from './HeaderColumns';
import './datatable.css';

import { ContextView } from '../Store';

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
} from '@material-ui/core';
import MuiTableCell from '@material-ui/core/TableCell';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TablePage from '../../common/TablePage';
import DetailsCard from './DetailsCard.js';
import MiniMap from './MiniMap.js';
import Graphs from './Graphs.js';
import Graphs2 from './Graphs2.js';
import BodyTable from './BodyTable.js';
import Graphs3 from './Graphs3';

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
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
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
  const [expanded, setExpanded] = useState(false);
  const [rowSize, setRowSize] = useState(7);
  const [rowSize2, setRowSize2] = useState(5);
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

  const tableData = useMemo(() => {
    if (!search) return currentData;

    return currentData.filter(searchinfo => {
      return (
        searchinfo.country.toLowerCase().includes(search.toLowerCase()) ||
        searchinfo.name_of_nearest_city
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        searchinfo.bridge_opportunity_level1_government
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        searchinfo.bridge_opportunity_level2_government
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        searchinfo.bridge_name.toLowerCase().includes(search.toLowerCase()) ||
        searchinfo.bridge_opportunity_bridge_type
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        searchinfo.bridge_opportunity_project_code
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        searchinfo.primary_occupations
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        searchinfo.primary_crops_grown
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        searchinfo.bridge_opportunity_individuals_directly_served
          .toString()
          .includes(search) ||
        searchinfo.bridge_opportunity_gps_latitude
          .toString()
          .includes(search) ||
        searchinfo.project_code.toString().includes(search) ||
        searchinfo.project_stage.toString().includes(search) ||
        searchinfo.bridge_opportunity_gps_longitude.toString().includes(search)
      );
    });
  }, [currentData, search]);

  // const[cardDetails, setCardDetails] = useContext(ContextDataDetails);
  //Axios call to get the Bridge Data
  useEffect(() => {
    axios
      .get(
        'http://b2p2018-finalmerge1.eba-4apifgmz.us-east-1.elasticbeanstalk.com/all_data'
      )
      .then(res => {
        setData(res.data);
        setCurrentData(res.data);
      });
  }, []);
  console.log(currentData);

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
    // FlyTo();
    // console.log('what is this', name);
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
  }));

  const CssTextField = withStyles({
    root: {
      '& label': {
        color: '#39d1e6',
      },

      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#39d1e6',
        },
      },
    },
  })(TextField);

  const classes = useStyles();

  const FlyTo = () => {
    const flyViewport = {
      latitude: lat,
      longitude: long,
      zoom: 14,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: d3.easeCubic,
    };
    setViewport(flyViewport);
  };

  return (
    <div
      style={{ marginRight: '5%', backgroundColor: '#372d4a', height: '100vh' }}
    >
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className="filter-search">
            <CssTextField
              variant="outlined"
              id="custom-css-outlined-input"
              type="text"
              name="Search Projects"
              label="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                backgroundColor: '#372d4a',
                color: '#39d1e6',
                borderColor: 'white',
                boxShadow: 'none',
              }}
              size="small"
            />
          </div>
        </Toolbar>
      </AppBar>
      <main
        style={{ backgroundColor: '#372d4a', maxWidth: '87%' }}
        className={classes.content}
      >
        <div className={classes.toolbar} />
        <Grid container spacing={3}>
          <Grid item direction="row" item xs={4} style={{ width: '80%' }}>
            <Paper className={classes.paper} elevation={7}>
              <Graphs2 />
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper className={classes.paper} elevation={7}>
              <Graphs />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper} elevation={7}>
              <Graphs />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper} elevation={7}>
              <DetailsCard record={selected} />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper} elevation={7}>
              <Graphs3 />
            </Paper>
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
                      // const isItemSelected = isSelected(row);
                      // console.log('can i see the index', index)
                      return (
                        <TableRow
                          hover
                          // className ={tableRow1 }
                          // index % 2 ? classes.tableRow0:classes.tableRow1

                          onClick={event => handleClick(event, row)}
                          // aria-checked={isItemSelected}
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
                          // selected={isItemSelected}
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
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              style={{ backgroundColor: '#372d4a', color: 'white' }}
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
        <MiniMap record={selected} />
      </Drawer>
    </div>
  );
}
