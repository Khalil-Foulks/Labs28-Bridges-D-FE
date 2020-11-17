import React, { useState, useCallback, useRef } from 'react';
import MapGL, { GeolocateControl } from 'react-map-gl';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import axios from 'axios';
import '../Map/mapbox-gl.css';

// import './miniMap.css';

const MiniMap = ({ record, map }) => {
  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  // const [viewport, setViewport] = useState({

  //   width: 500,
  //   height: 200,
  //   latitude: record.latitude,
  //   // longitude: lg,
  //   zoom: 10.2,
  //   pitch: 0,
  //   bearing: -22,
  //   car: record.cell_service_quality
  // });

  const setCoord = (lat, long) => {
    setLat(lat);
    setLong(long);
  };

  const geolocateStyle = {
    float: 'left',
    margin: '50px',
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

  console.log('mm', record.bridge_opportunity_gps_latitude);

  return (
    <div>
      <ReactMapGL
        ref={mapRef}
        {..._onViewportChange()}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/bridgestoprosperity/ckf5rf05204ln19o7o0sdv860"
        onViewportChange={_onViewportChange}
      >
        <Marker
          key={0}
          latitude={
            record.bridge_opportunity_gps_latitude === undefined
              ? 0
              : record.bridge_opportunity_gps_latitude
          }
          longitude={
            record.bridge_opportunity_gps_longitude === undefined
              ? 0
              : record.bridge_opportunity_gps_longitude
          }
        >
          <img
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
      </ReactMapGL>
    </div>
  );
};

export default MiniMap;
