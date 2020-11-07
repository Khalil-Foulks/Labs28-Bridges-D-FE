import React, { useState, useEffect } from 'react';
import './datatable.css';
import axios from 'axios';
import { makeStyles, CssBaseline } from '@material-ui/core';

const DataTable = () => {
  const [data, setData] = useState([]);

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
        console.log(array);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <dev>test</dev>
    </div>
  );
};
export default DataTable;
