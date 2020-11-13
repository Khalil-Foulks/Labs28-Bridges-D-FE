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
  // const graph = record.latitude;

  // console.log('graph2', graph)

  return (
    <div className="bar-container" style={{ margin: '0', height: '100%' }}>
      <div>
        <BarChart width={100} height={175}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bridge_name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="river_crossing_deaths_in_last_3_years"
            stackId="a"
            fill="#8884d8"
          />
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
