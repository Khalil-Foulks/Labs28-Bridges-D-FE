import React, { useState, useEffect, useMemo, useContext } from 'react';
import { ContextDataDetails } from '../Store';
import { columns } from './HeaderColumns';
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
  withStyles,
} from '@material-ui/core';
import MuiTableCell from '@material-ui/core/TableCell';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

// set style to remove boarder in table rows
const TableCell = withStyles({
  root: {
    borderColor: '#372d4a',

    borderBottomWidth: '10px',
  },
})(MuiTableCell);

const Row = withStyles({
  root: {
    // borderBottom: "none",
    margin: '20%',
  },
})(TableRow);

const theme = createMuiTheme({
  overrides: {
    MuiTableRow: {
      root: {
        //This can be referred from Material UI API documentation.
        margin: '20%',
        borderBottom: 'none',
      },
    },
  },
});

// this section contains functions for sorting data info

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
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </TableHead>
  );
};

const BodyTable = () => {
  const [cardDetails, setCardDetails] = useContext(ContextDataDetails);

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

  // This function handles the Search compoonent
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

  // const[cardDetails, setCardDetails] = useContext(ContextDataDetails);
  //Axios call to get the Bridge Data
  useEffect(() => {
    axios.get('https://b2ptc.herokuapp.com/bridges').then(res => {
      setData(res.data);
      setCurrentData(res.data);
    });
  }, []);
  // console.log(currentData);

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
    setCardDetails(cardDetails.push(name));
    // FlyTo();
    // console.log('what is this', name);
    // console.log( 'what new inf1o', cardDetails)
  };

  const useStyles = makeStyles({
    container: {
      maxHeight: 400,
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
    },
  });
  const classes = useStyles();

  return (
    <div>
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
                    <TableCell align="left">{row.bridge_name}</TableCell>
                    <TableCell align="left">{row.bridge_type}</TableCell>
                    <TableCell align="left">{row.district_id}</TableCell>
                    <TableCell align="left">{row.district_name}</TableCell>
                    <TableCell align="left">{row.individuals_served}</TableCell>
                    <TableCell align="left">{row.latitude}</TableCell>
                    <TableCell align="left">{row.longitude}</TableCell>
                    <TableCell align="left">{row.project_code}</TableCell>
                    <TableCell align="left">{row.project_stage}</TableCell>
                    <TableCell align="left">{row.province_id}</TableCell>
                    <TableCell align="left">{row.province_name}</TableCell>
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
      />
    </div>
  );
};

export default BodyTable;
