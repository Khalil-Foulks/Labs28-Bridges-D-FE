import React from 'react';

import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

const Graphs4 = ({ record }) => {
  const good = [
    { service: 'Good', A: 100 },
    { service: 'Fair', A: 50 },
    { service: 'Nonexistent', A: 30 },
  ];
  const Fair = [
    { service: 'Good', A: 30 },
    { service: 'Fair', A: 100 },
    { service: 'Nonexistent', A: 30 },
  ];
  const Nonexistent = [
    { service: 'Good', A: 20 },
    { service: 'Fair', A: 20 },
    { service: 'Nonexistent', A: 100 },
  ];
  const Blank = [
    { service: 'Good', A: 50 },
    { service: 'Fair', A: 50 },
    { service: 'Nonexistent', A: 50 },
  ];

  let service = record.cell_service_quality;
  const quality = service => {
    if (service === 'Good') {
      return good;
    }
    if (service === 'Fair') {
      return Fair;
    }

    if (service === 'Nonexistent') {
      return Nonexistent;
    }

    if (service === null) {
      return Blank;
    }
  };

  return (
    <div>
      <h3 style={{ color: 'white', fontWeight: 600 }}>Cell Quality</h3>
      <RadarChart
        style={{ margin: '0px' }}
        cx={200}
        cy={100}
        outerRadius={80}
        width={300}
        height={200}
        data={quality(service) === undefined ? Blank : quality(service)}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="service" />
        <PolarRadiusAxis />
        <Radar
          name="Mike"
          dataKey="A"
          stroke="#8884d8"
          fill="#39d1e6"
          fillOpacity={0.6}
        />
      </RadarChart>
    </div>
  );
};

export default Graphs4;
