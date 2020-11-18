import React, { PureComponent, useState } from 'react';
import './graphs.css';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const Graphs = ({ record }) => {
  const noUndefined = x => {
    if (x === undefined) {
      return 1;
    } else {
      return x;
    }
  };

  const data = [
    {
      name: 'Incidents',
      Deaths: noUndefined(record),
      Injuries: 2400,
      amt: 2400,
    },
  ];

  console.log('graph2', data);

  return (
    <div className="bar-container" style={{ margin: '0', height: '100%' }}>
      <div>
        <BarChart width={100} height={175} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Deaths" stackId="a" fill="#8884d8" />
          <Bar
            dataKey="river_crossing_injuries_in_last_3_years"
            stackId="a"
            fill="#82ca9d"
          />
        </BarChart>
      </div>
    </div>
  );
};

export default Graphs;
