import React, { useState, useEffect, useContext } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import * as bridgeData from './bridges.json';
import * as testData from './test.json';
import axios from 'axios';
import { Context } from '../Store';
import GeoJSON from 'geojson';

import './map.css';

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: -1.9602,
    longitude: 30.138,
    width: '100vw',
    height: '100vh',
    zoom: 8.2,
    pitch: 0,
    bearing: -22,
  });

  const [data, setData] = useState([]);
  const [selectedBridge, setSelectedBridge] = useState(null);
  const [state, setState] = useContext(Context);
  let array = [];
  useEffect(() => {
    axios
      .get('http://b2pds.eba-xv3jd3sp.us-east-1.elasticbeanstalk.com/projects')
      .then(response => {
        response.data.map(element => {
          array.push(element);
        });
        // console.log(array);
        setData([array]);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  // console.log(array);
  console.log('Array?', data[1]);
  // var bridges = Array.from(data);
  // console.log(typeof bridges);

  var geojson = {
    type: 'FeatureCollection',
    features: [],
  };

  // for (let i = 0; i < bridges.length; i++) {
  //   geojson.features.push({
  //     type: 'Feature',
  //     geometry: {
  //       type: 'Point',
  //       coordinates: [bridges[i].latitude, bridges[i].longitude],
  //     },
  //     properties: {
  //       id: bridges.id,
  //     },
  //   });
  // }

  // console.log('geo', geojson);

  // console.log('stringifyed', bridges);

  var test = JSON.stringify(testData);
  // console.log(test.length);

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
      // mapStyle="mapbox://styles/jrhemann/cke28to9u0ixf19oevvv3kw8u"
      mapStyle="mapbox://styles/jrhemann/cked1kdcz2s261aql8jg3trbw"
      //mapStyle="mapbox://styles/jrhemann/cked11c6y2rjj1aqlvukjnnji"

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
            src={`${bridge.properties.ProjectStage}.png`}
            alt="bridge icon"
            onClick={e => {
              e.preventDefault();
              setSelectedBridge(bridge);
              setState({ bridge });
              console.log(state);
            }}
          />
        </Marker>
      ))}

      {selectedBridge ? (
        <Popup
          latitude={selectedBridge.geometry.coordinates[0]}
          longitude={selectedBridge.geometry.coordinates[1]}
          //this is supposed to close the tooltip when map is clicked
          closeOnClick={true}
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
      <div className="zoom-controls">
        <NavigationControl showZoom={true} />
      </div>
    </ReactMapGL>
  );
};

export default Map;
