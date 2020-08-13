import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
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

  const [selectedBridge, setSelectedBridge] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setSelectedBridge(null);
      }
    };
    window.addEventListener('keydown', listener);
  }, []);

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
      {/* Maps through all the data in bridges.json grabbing lat and lon to display markers */}
      {bridgeData.features.map(bridge => (
        <Marker
          key={bridge.properties.bridge_id}
          latitude={bridge.geometry.coordinates[0]}
          longitude={bridge.geometry.coordinates[1]}
        >
          {/* image used to display point on map */}
          <img
            className="marker-btn"
            src="bridge.svg"
            alt="bridge icon"
            onClick={e => {
              e.preventDefault();
              setSelectedBridge(bridge);
            }}
          />
        </Marker>
      ))}

      {selectedBridge ? (
        <Popup
          latitude={selectedBridge.geometry.coordinates[0]}
          longitude={selectedBridge.geometry.coordinates[1]}
          //Closes popup when X is clicked by resetting state to null
          onClose={() => {
            setSelectedBridge(null);
          }}
        >
          {/* Div to display what data is wanted in the popup*/}
          <div>
            <h4>{selectedBridge.properties.BridgeSiteName}</h4>
            <p>Status: {selectedBridge.properties.ProjectStage}</p>
            <p>Type: {selectedBridge.properties.BridgeType}</p>
            <p>Span: {selectedBridge.properties.Span} meters</p>
          </div>
        </Popup>
      ) : null}
    </ReactMapGL>
  );
};

export default Map;
