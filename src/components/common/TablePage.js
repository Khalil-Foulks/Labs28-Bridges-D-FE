import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  TablePagination,
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    marginTop: '2%',
    '& thead th': {
      fontWeight: '600',
      color: 'blue',
      backgroundColor: 'red',
    },
    '& tbody td': {
      fontWeight: '600',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cusor: 'pointer',
    },
  },
});

export default function TablePage(data, columns) {
  const classes = useStyles();

  console.log('this', data.length);

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const TblContainer = props => (
    <Table className={classes.table}>
      {/* props.childern referers to all of the elements in the data table */}
      {props.children}
    </Table>
  );
  const TblHead = props => {
    return (
      <TableHead>
        <TableRow>
          {columns.map(headCell => (
            <TableCell key={headCell.id}>{headCell.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={[5, 10, 25]}
      rowsPerPage={rowsPerPage}
      count={data.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );

  return {
    TblContainer,
    TblHead,
    TblPagination,
  };
}
