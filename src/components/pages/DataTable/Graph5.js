import React, { PureComponent } from 'react';
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

const Graph5 = ({ record }) => {
  const newData = data => {
    if (data === undefined) {
      return 'blank';
    } else if (data === null) {
      return 'blank';
    } else {
      return data;
    }
  };
  console.log('farm1', record);

  const farm =
    newData(record) === undefined ? 1 : newData(record).split(' ').length;
  console.log('farm', farm);

  const data = [{ name: 'Crop types', crops: farm, amt: 2400 }];

  return (
    <div>
      <BarChart
        width={200}
        height={175}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar dataKey="crops" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default Graph5;
