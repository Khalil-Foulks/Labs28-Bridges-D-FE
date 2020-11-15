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

const Graphs = ({ record, record2 }) => {
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
      Injuries: noUndefined(record2),
      amt: 2400,
    },
  ];

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
          <Bar dataKey="Injuries" stackId="a" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};

export default Graphs;
