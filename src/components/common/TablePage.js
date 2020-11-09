import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
} from '@material-ui/core';

import axios from 'axios';

import { DataGrid } from '@material-ui/data-grid';

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

export default function TablePage(records, headCells) {
  const classes = useStyles();

  const [detailsData, setDetailsData] = useState([]);

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[pages]);
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
          {headCells.map(headCell => (
            <TableCell key={headCell.id}>{headCell.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  return {
    TblContainer,
    TblHead,
  };
}
