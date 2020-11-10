import React, { useState, useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { FlyToInterpolator } from 'react-map-gl';
import {
  root,
  infoCard,
  chartCard,
  tableCard,
  green,
  gold,
  container,
  table,
  mapOpen,
  mapClosed,
  mapContainer,
} from './dataStyles.js';
import { columns } from './HeaderColumns';

import { ContextView } from '../Store';

import axios from 'axios';
import {
  makeStyles,
  Card,
  Grid,
  CardMedia,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableHead,
  Table,
  TableContainer,
  TableSortLabel,
} from '@material-ui/core';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TablePage from '../../common/TablePage';
import DetailsCard from './DetailsCard.js';
import MiniMap from './MiniMap.js';
import Graphs from './Graphs.js';
import Graphs2 from './Graphs2.js';

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

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  root,
  infoCard,
  chartCard,
  tableCard,
  green,
  gold,
  container,
  table,
  mapOpen,
  mapClosed,
  mapContainer,
});

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
        searchinfo.bridge_name.toLowerCase().includes(search.toLowerCase()) ||
        searchinfo.bridge_type.toLowerCase().includes(search.toLowerCase()) ||
        searchinfo.district_name.toLowerCase().includes(search.toLowerCase()) ||
        searchinfo.project_stage.toLowerCase().includes(search.toLowerCase()) ||
        searchinfo.province_name.toLowerCase().includes(search.toLowerCase()) ||
        searchinfo.district_id.toString().includes(search) ||
        searchinfo.individuals_served.toString().includes(search) ||
        searchinfo.latitude.toString().includes(search) ||
        searchinfo.project_code.toString().includes(search) ||
        searchinfo.project_stage.toString().includes(search) ||
        searchinfo.province_id.toString().includes(search) ||
        searchinfo.longitude.toString().includes(search)
      );
    });
  }, [currentData, search]);

  // function to expand Record Data
  const handleExpandClick = () => {
    setExpanded(!expanded ? true : false);
    setRowSize(expanded === true ? 7 : 12);
    setRowSize2(expanded === true ? 5 : 12);
  };
  const handleSortRequest = cellId => {
    const isAsc = orderBy === cellId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(cellId);
  };

  //hits endpoint and gets all bridges
  useEffect(() => {
    axios.get('https://b2ptc.herokuapp.com/bridges').then(res => {
      setData(res.data);
      setCurrentData(res.data);
    });
  }, []);

  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = data.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

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

  const handleClick = (event, name) => {
    setSelected(name);
    FlyTo();
    console.log('what is this', name);
  };

  const handleChangeDense = event => {
    setDense(event.target.checked);
  };

  // const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  console.log(data);

  const setCoord = (lat, long) => {
    setLat(lat);
    setLong(long);
  };

  return (
    <Grid container spacing={2}>
      <Grid container direction="row" item xs={6} sm={rowSize}>
        <DetailsCard record={selected === undefined ? '' : selected} />

        {expanded === false ? (
          <div className={classes.mapClosed}></div>
        ) : (
          <div className={classes.mapOpen}>
            <MiniMap
              map={viewport}
              record={selected === undefined ? 3 : selected}
            />
            something
          </div>
        )}

        <ArrowForwardIcon onClick={handleExpandClick} />
      </Grid>

      <Grid item xs={12} sm={rowSize2}>
        <Card xs={12} sm={6} className={classes.chartCard}>
          <Graphs />

          {expanded === false ? (
            <div className={classes.mapClosed}></div>
          ) : (
            <div className={classes.mapOpen}>
              <Graphs2 />
            </div>
          )}
        </Card>
      </Grid>

      <Card className={classes.root}>
        <div className="filter-search">
          <input
            type="text"
            name="Search Projects"
            placeholder="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableData.length}
            />

            <TableBody>
              {stableSort(tableData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // const isItemSelected = isSelected(row);

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row)}
                      // aria-checked={isItemSelected}

                      key={row}
                      // selected={isItemSelected}
                    >
                      <TableCell align="left">{row.bridge_name}</TableCell>
                      <TableCell align="left">{row.bridge_type}</TableCell>
                      <TableCell align="left">{row.district_id}</TableCell>
                      <TableCell align="left">{row.district_name}</TableCell>
                      <TableCell align="left">
                        {row.individuals_served}
                      </TableCell>
                      <TableCell align="left">{row.latitude}</TableCell>
                      <TableCell align="left">{row.longitude}</TableCell>
                      <TableCell align="left">{row.project_code}</TableCell>
                      <TableCell align="left">{row.project_stage}</TableCell>
                      <TableCell align="left">{row.province_id}</TableCell>
                      <TableCell align="left">{row.province_name}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
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
        />
      </Card>
    </Grid>
  );
}
