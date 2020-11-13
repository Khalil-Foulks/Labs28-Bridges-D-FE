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

  console.log('lt', record);
  const mapRef = useRef();

  // const _onViewportChange = viewport =>
  //   setViewport({ ...viewport, transitionDuration: 1000 });
  const _onViewportChange = () => ({
    width: 500,
    height: 200,
    latitude: record.latitude,
    longitude: record.longitude,
    zoom: 10.2,
    pitch: 0,
    bearing: -22,
    car: record.cell_service_quality,
  });

  return (
    <div>
      <MapGL
        ref={mapRef}
        {..._onViewportChange()}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/navigation-preview-night-v4"
        onViewportChange={_onViewportChange}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </MapGL>
    </div>
  );
};

export default MiniMap;
