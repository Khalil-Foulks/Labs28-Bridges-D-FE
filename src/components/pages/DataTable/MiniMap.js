import React, { useState, useCallback, useRef } from 'react';
import MapGL, { GeolocateControl } from 'react-map-gl';
import ReactMapGL, { Marker, NavigationControl, StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import axios from 'axios';
import '../Map/mapbox-gl.css';
import bridge from './bridge-icon.png';

// import './miniMap.css';

const dataArray = [];
const MiniMap = ({ record, map, data }) => {
  const [heat, setHeat] = useState({
    COORDINATES: [
      record.bridge_opportunity_gps_latitude,
      record.bridge_opportunity_gps_longitude,
    ],
    WEIGHT: 10,
  });
  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  const [viewport, setViewport] = useState({
    latitude:
      record.bridge_opportunity_gps_latitude === undefined
        ? -2.513333
        : record.bridge_opportunity_gps_latitude,
    longitude:
      record.bridge_opportunity_gps_longitude === undefined
        ? 29.612778
        : record.bridge_opportunity_gps_longitude,
    zoom: 10.2,
    pitch: 0,
    bearing: -22,
    car: record.cell_service_quality,
  });

  const mapStyle =
    'mapbox://styles/bridgestoprosperity/ckf5rf05204ln19o7o0sdv860';

  console.log('this1', dataArray);

  const setCoord = (lat, long) => {
    setLat(lat);
    setLong(long);
  };

  const geolocateStyle = {
    float: 'left',
    margin: '20px',
    padding: '10px',
  };

  const mapRef = useRef();

  // const _onViewportChange = viewport =>
  //   setViewport({ ...viewport, transitionDuration: 1000 });
  const _onViewportChange = () => ({
    width: 500,
    height: 200,
    latitude:
      record.bridge_opportunity_gps_latitude === undefined
        ? -2.513333
        : record.bridge_opportunity_gps_latitude,
    longitude:
      record.bridge_opportunity_gps_longitude === undefined
        ? 29.612778
        : record.bridge_opportunity_gps_longitude,
    zoom: 10.2,
    pitch: 0,
    bearing: -22,
    car: record.cell_service_quality,
  });

  const layer = [
    new HeatmapLayer({
      heat,
      id: 'heatmp-layer',
      pickable: false,
      getPosition: d => d.COORDINATES,
      getWeight: d => d.WEIGHT,
    }),
  ];

  console.log('mm', dataArray);

  return (
    <div>
      <StaticMap
        ref={mapRef}
        {..._onViewportChange()}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle={mapStyle}
        controller={true}
        onViewportChange={_onViewportChange}
      >
        <Marker
          key={record.bridge_opportunity_project_code}
          latitude={
            record.bridge_opportunity_gps_latitude === undefined
              ? 2.513333
              : record.bridge_opportunity_gps_latitude
          }
          longitude={
            record.bridge_opportunity_gps_longitude === undefined
              ? 29.612778
              : record.bridge_opportunity_gps_longitude
          }
        >
          <img
            src={bridge}
            sytle={{
              width: '15px',
              height: '20px',
            }}
            alt="bridge icon"
          />
        </Marker>
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </StaticMap>
    </div>
  );
};

export default MiniMap;
