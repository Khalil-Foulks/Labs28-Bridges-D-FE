import React, { useState, useCallback, useRef } from 'react';
import MapGL, { GeolocateControl } from 'react-map-gl';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import axios from 'axios';
import '../Map/mapbox-gl.css';

// import './miniMap.css';

const MiniMap = ({ record, map }) => {
  const [lat, setLat] = useState(record.latitude);
  const [long, setLong] = useState(record.longitude);

  console.log('africa', map);

  const [viewport, setViewport] = useState({
    width: 500,
    height: 200,
    latitude: lat,
    longitude: long,
    zoom: 10.2,
    pitch: 0,
    bearing: -22,
  });

  const geolocateStyle = {
    float: 'left',
    margin: '50px',
    padding: '10px',
  };

  const mapRef = useRef();

  const _onViewportChange = viewport =>
    setViewport({ ...viewport, transitionDuration: 1000 });
  return (
    <div>
      <MapGL
        ref={mapRef}
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/bridgestoprosperity/ckh3x490s06uf1atng20ald51"
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
