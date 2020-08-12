import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import * as bridgeData from './bridges.json';

import './map.css';

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: -1.9402,
    longitude: 29.8738,
    width: '70vw',
    height: '79.3vh',
    zoom: 7.4,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      //custom style... edit later
      mapStyle="mapbox://styles/jrhemann/ckdiatyxk0eki1imx64uew7yw"
      //enable dragging
      onViewportChange={viewport => {
        setViewport(viewport);
      }}
    >
      {bridgeData.features.map(bridge => (
        <Marker
          key={bridge.properties.bridge_id}
          latitude={bridge.geometry.coordinates[0]}
          longitude={bridge.geometry.coordinates[1]}
        >
          <img className="markder-btn" src="bridge.svg" alt="bridge icon" />
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default Map;
