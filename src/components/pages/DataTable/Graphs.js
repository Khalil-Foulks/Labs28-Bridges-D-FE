import React, { PureComponent } from 'react';
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

const served = [
  { name: 'Pepole Served', Year_2: 2300, Year_1: 1200, amt: 2400 },
];
const tragedy = [{ name: 'tragedy', injuries: 13, deaths: 2, amt: 2400 }];

// let served1 = [];
// while(served1.length < 1347){
//     var a = Math.floor(Math.random() *(6000 - 2000) ) + 2000;
//     if(served1.indexOf(a) === -1) served1.push(a);
// }
// let served2 = [];
// while(served2.length < 1347){
//     var f = Math.floor(Math.random() *(7000 - 2500) ) + 2000;
//     if(served2.indexOf(f) === -1) served2.push(f);
// }
// let span = [];
// while(span.length < 1347){
//     var b = Math.floor(Math.random() *(150 - 30) ) + 30;
//     if(span.indexOf(b) === -1) span.push(b);
// }
// let flooded = [];
// while(flooded.length < 1347){
//     var c = Math.floor(Math.random() *(365 - 20) ) + 20;
//     if(flooded.indexOf(c) === -1) flooded.push(c);
// }
// let deaths = [];
// while(deaths.length < 1347){
//     var d = Math.floor(Math.random() *(20 - 0) ) + 0;
//     if(deaths.indexOf(d) === -1) deaths.push(d);
// }
// let injuries = [];
// while(injuries.length < 1347){
//     var e = Math.floor(Math.random() *(60 - 0) ) + 0;
//     if(injuries.indexOf(e) === -1) injuries.push(e);
// }

const Graphs = () => {
  return (
    <div className="bar-container" style={{ margin: '0', height: '100%' }}>
      <div>
        <BarChart className="chart1" width={100} height={175} data={served}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Year_1" fill="#8884d8" />
          <Bar dataKey="Year_2" fill="#82ca9d" />
        </BarChart>
      </div>
      <div>
        <BarChart width={100} height={175} data={tragedy}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="deaths" stackId="a" fill="#8884d8" />
          <Bar dataKey="injuries" stackId="a" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};

export default Graphs;
