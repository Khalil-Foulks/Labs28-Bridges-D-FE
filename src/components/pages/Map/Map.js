import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
import ReactMapGL, {
  Marker,
  NavigationControl,
  FlyToInterpolator,
  Layer,
  Source,
} from 'react-map-gl';
import useSupercluster from 'use-supercluster';
import axios from 'axios';
import './mapbox-gl.css';
import Tooltip from '@material-ui/core/Tooltip';
import { Drawer } from 'antd';

import {
  Context,
  ContextStatus,
  ContextRejectedFilter,
  ContextCompleteFilter,
  ContextActiveFilters,
  ContextStyle,
  ContextMargin,
  ContextSearchData,
  ContextLong,
  ContextLat,
  ContextView,
  ContextDataDetails,
} from '../Store';
import './map.css';
import LeftSideBar from '../LeftSideBar/LeftSideBar';
import Footer from '../Footer/Footer';

const Map = () => {
  const mapRef = useRef();

  const handleViewportChange = useCallback(
    newViewport => setViewport(newViewport),
    []
  );

  const showDrawer = () => {
    // if (visible === true) setVisible(false);
    if (visible === false) setVisible(true);
  };

  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  const [cardDetails, setCardDetails] = useContext(ContextDataDetails);

  //state of longitude and latitude for fly to function
  const [long, setLong] = useContext(ContextLong);
  const [lat, setLat] = useContext(ContextLat);

  //initial state of view when the map first renders
  const [viewport, setViewport] = useContext(ContextView);

  //initial data that it pulled in from web-endpoint
  const [data, setData] = useState([]);

  //data passed to search bar in map component
  const [searchData, setSearchData] = useContext(ContextSearchData);

  //state of currently clicked on bridge marker
  const [selectedBridge, setSelectedBridge] = useState(null);

  //state of selected bridge passed to Sidebar
  const [state, setState] = useContext(Context);

  //toggle state for changing view to satellite
  const [toggle, setToggle] = useState(false);

  //state for filtering bridge by project status
  const [status, setStatus] = useContext(ContextStatus);

  //state for changing the map style attribute
  const [style, setStyle] = useContext(ContextStyle);

  //margin state for moving the button that controls the sidebar
  const [collapseMargin, setCollapseMargin] = useContext(ContextMargin);

  //state of filter that are active
  const [activeFilters, setActiveFilters] = useContext(ContextActiveFilters);

  //array that all the bridge data is pushed to before formatted to GeoJson
  const array = [];

  //hits endpoint and gets all bridges
  useEffect(() => {
    axios
      .get(
        'http://b2p2018-finalmerge1.eba-4apifgmz.us-east-1.elasticbeanstalk.com/all_data'
      )
      .then(response => {
        response.data.map(element => {
          //pushes every element to array variable
          array.push(element);
        });
        setData(array);
        setSearchData(array);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // Function to toggle map style state with toggle switch
  const mapStyle = () => {
    if (
      style === 'mapbox://styles/bridgestoprosperity/ckh3x490s06uf1atng20ald51'
    )
      setStyle('mapbox://styles/bridgestoprosperity/ckf5rf05204ln19o7o0sdv860');

    if (
      style === 'mapbox://styles/bridgestoprosperity/ckf5rf05204ln19o7o0sdv860'
    )
      setStyle('mapbox://styles/bridgestoprosperity/ckh3x490s06uf1atng20ald51');
  };

  //function to convert json data to geojson
  var bridge = {
    type: 'FeatureCollection',
    features: [],
  };

  //checkes if input word is in activeFilters
  const filterBy = word => {
    if (activeFilters.includes(word) === true) {
      return word;
    }
  };

  for (let i = 0; i < data.length; i++) {
    //if statement filters bridges based on status
    if (
      data[i].bridge_opportunity_stage === filterBy('Complete') ||
      data[i].bridge_opportunity_stage === filterBy('Under Construction') ||
      data[i].bridge_opportunity_stage === filterBy('Confirmed') ||
      data[i].bridge_opportunity_stage === filterBy('Prospecting') ||
      data[i].bridge_opportunity_stage === filterBy('Identified') ||
      data[i].bridge_opportunity_stage === filterBy('Rejected')
    ) {
      bridge.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            data[i].bridge_opportunity_gps_latitude,
            data[i].bridge_opportunity_gps_longitude,
          ],
        },
        properties: {
          // id: data[i].id,
          project_code: data[i].bridge_opportunity_project_code,
          bridge_name: data[i].bridge_name,
          bridge_type: data[i].bridge_opportunity_bridge_type,
          // district_id: data[i].district_id,
          // district_name: data[i].district_name,
          // province_id: data[i].province_id,
          province_name: data[i].bridge_opportunity_level1_government,
          project_stage: data[i].bridge_opportunity_stage,
          individuals_served:
            data[i].bridge_opportunity_individuals_directly_served,
          // bridge_image: data[i].bridge_image,
        },
      });
    }
  }
  // add points
  const points = bridge.features.map(point => ({
    type: 'Feature',
    properties: {
      cluster: false,
      // id: point.properties.id,
      project_code: point.properties.project_code,
      bridge_type: point.properties.bridge_type,
      project_stage: point.properties.project_stage,
      bridge_name: point.properties.bridge_name,
      // district_name: point.properties.district_name,
      // province_id: point.properties.province_id,
      province_name: point.properties.province_name,
    },
    geometry: {
      type: 'Point-B',
      coordinates: [
        point.geometry.coordinates[1],
        point.geometry.coordinates[0],
      ],
    },
  }));

  // add bounds
  const bounds = mapRef.current
    ? mapRef.current
        .getMap()
        .getBounds()
        .toArray()
        .flat()
    : null;

  //get clusters
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  // allows user to press "ESC" key to exit popup
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
      ref={mapRef}
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      //Style of the map. Initial state set in Context store
      mapStyle={style}
      //enable dragging
      onViewportChange={handleViewportChange}
    >
      <Source
        id="village-bounds"
        type="vector"
        url="mapbox://bridgestoprosperity.bmo6bmeu"
      />
      <div className="sidebar">
        <LeftSideBar />
      </div>
      {clusters.map(cluster => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const {
          cluster: isCluster,
          point_count: pointCount,
        } = cluster.properties;

        //there is a cluster to render
        if (isCluster) {
          return (
            <Marker
              key={`bridge-${cluster.properties.id}`}
              latitude={latitude}
              longitude={longitude}
            >
              <Tooltip
                title={
                  <h2 style={{ color: 'white', margin: 'auto' }}>
                    {cluster.properties.bridge_name}
                  </h2>
                }
                arrow
                placement="top"
              >
                <img
                  className="marker-btn"
                  src={`${cluster.properties.project_stage}.png`}
                  alt="bridge icon"
                  onClick={e => {
                    e.preventDefault();
                    setSelectedBridge(bridge);
                    setState({ cluster });
                    showDrawer();
                  }}
                />
              </Tooltip>
            </Marker>
          );
        }

        //there is a single point to render
        return (
          <Marker
            key={`bridge-${cluster.properties.project_code}`}
            latitude={latitude}
            longitude={longitude}
          >
            <Tooltip
              title={
                <h2 style={{ color: 'white', margin: 'auto' }}>
                  {cluster.properties.bridge_name}
                </h2>
              }
              arrow
              placement="top"
            >
              <img
                className="marker-btn"
                src={`${cluster.properties.project_stage}.png`}
                alt="bridge icon"
                onClick={e => {
                  e.preventDefault();
                  setSelectedBridge(bridge);
                  setState({ cluster });
                  showDrawer();
                }}
              />
            </Tooltip>
          </Marker>
        );
      })}

      <div className="footerHolder">
        <Footer />
      </div>
      {/* controls for zooming in and out*/}
      <div className="zoom-controls">
        <NavigationControl
          showZoom={true}
          showCompass={true}
          showFullscreen={true}
        />
      </div>
      {/* Toggle view to satellite and regular view */}
      <div
        className="mini-view"
        onClick={() => {
          setToggle(!toggle);
          mapStyle();
        }}
      >
        {toggle ? (
          <div className="sat-button">
            <img className="satellite" src="./mapButton.png" />
          </div>
        ) : (
          <div className="nav-button">
            <img className="satellite" src="./satelliteButton.png" />
          </div>
        )}
      </div>

      <Drawer
        className="infoDrawer"
        title={<h2>Bridge Info</h2>}
        drawerStyle={{ backgroundColor: 'white' }}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        mask={false}
        maskClosable={true}
        overflow={false}
      >
        <h3>Bridge Name: {state.cluster.properties.bridge_name}</h3>
        <h3>Province: {state.cluster.properties.province_name}</h3>
        {/* <h3>District: {state.cluster.properties.district_name}</h3> */}
        <h3>Project Stage: {state.cluster.properties.project_stage}</h3>
        <h3>Project Code: {state.cluster.properties.project_code}</h3>
        <h3>Bridge Type: {state.cluster.properties.bridge_type}</h3>
        <h3>
          Individuals Served: {state.cluster.properties.individuals_served}
        </h3>
      </Drawer>
    </ReactMapGL>
  );
};

export default Map;
