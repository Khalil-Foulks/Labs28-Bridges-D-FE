import React, { useState, useEffect, useContext } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import axios from 'axios';
import { Context, ContextStatus, ContextStyle } from '../Store';
import './map.css';
import LeftSideBar from '../LeftSideBar/LeftSideBar';

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
  const [status, setStatus] = useContext(ContextStatus);
  const [style, setStyle] = useContext(ContextStyle);
  const array = [];

  useEffect(() => {
    axios
      .get('https://b2ptc.herokuapp.com/bridges')
      .then(response => {
        response.data.map(element => {
          //pushes every element to array variable
          array.push(element);
        });
        setData(array);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  //function to convert json data to geojson
  var bridge = {
    type: 'FeatureCollection',
    features: [],
  };

  for (let i = 0; i < data.length; i++) {
    //if statement filters bridges based on status
    if (data[i].project_stage === status) {
      bridge.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [data[i].latitude, data[i].longitude],
        },
        properties: {
          id: data[i].id,
          project_code: data[i].project_code,
          bridge_name: data[i].bridge_name,
          bridge_type: data[i].bridge_type,
          district_id: data[i].district_id,
          district_name: data[i].district_name,
          province_id: data[i].province_id,
          province_name: data[i].province_name,
          project_stage: data[i].project_stage,
          individuals_served: data[i].individuals_served,
          bridge_image: data[i].bridge_image,
        },
      });
    }
  }

  // allows user to press "ESC" key to exit popup
  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setSelectedBridge(null);
      }
    };
    window.addEventListener('keydown', listener);
  }, []);
  console.log(style);
  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      //Style of the map set. Initial state set in Context store
      mapStyle={style}
      //enable dragging
      onViewportChange={viewport => {
        setViewport(viewport);
      }}
    >
      <LeftSideBar />

      {/* Maps through all the data in bridges.json grabbing lat and lon to display markers */}
      {bridge.features.map(bridge => (
        <Marker
          key={bridge.properties.id}
          latitude={bridge.geometry.coordinates[0]}
          longitude={bridge.geometry.coordinates[1]}
        >
          {/* image used to display point on map */}
          <img
            className="marker-btn"
            src={`${bridge.properties.project_stage}.png`}
            alt="bridge icon"
            onClick={e => {
              e.preventDefault();
              setSelectedBridge(bridge);
              setState({ bridge });
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
            <h4>{selectedBridge.properties.bridge_name}</h4>
            <p>District: {selectedBridge.properties.district_name}</p>
            <p>Status: {selectedBridge.properties.project_stage}</p>
            <p>Type: {selectedBridge.properties.bridge_type}</p>
          </div>
        </Popup>
      ) : null}

      <div className="zoom-controls">
        <NavigationControl showZoom={true} showCompass={true} />
      </div>
    </ReactMapGL>
  );
};

export default Map;
