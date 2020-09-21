import React, { useState, useContext } from 'react';
import {
  ContextSearchData,
  ContextLong,
  ContextLat,
  ContextView,
} from '../Store';
import * as d3 from 'd3';
import ReactMapGL, { FlyToInterpolator } from 'react-map-gl';

const Search = () => {
  const [searchData, setSearchData] = useContext(ContextSearchData);
  const [filterDataList, setFilterDataList] = useState([]);
  const [searchText, setSearchText] = useState('');
  // const [long, setLong] = useContext(ContextLong);
  // const [lat, setLat] = useContext(ContextLat);
  const [long, setLong] = useState();
  const [lat, setLat] = useState();
  const [viewport, setViewport] = useContext(ContextView);
  const dataList = searchData;

  //List everything to exclude with filtering
  const exclude = ['id'];

  //filter function for filtering search data out of dataList
  const filterData = value => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === '') setFilterDataList([]);
    else {
      const filteredData = dataList.filter(item => {
        return Object.keys(item).some(key =>
          exclude.includes(key)
            ? false
            : item[key]
                .toString()
                .toLowerCase()
                .includes(lowercasedValue)
        );
      });
      setFilterDataList(filteredData);
    }
  };

  //Handle change for search box
  const handleChange = value => {
    setSearchText(value);
    filterData(value);
  };

  const FlyTo = () => {
    const flyViewport = {
      // ...viewport,
      // latitude: -1.723639,
      // longitude: 29.366194,
      latitude: lat,
      longitude: long,
      zoom: 14,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: d3.easeCubic,
    };
    setViewport(flyViewport);
    console.log('fly viewport', flyViewport);
  };

  const setCoord = (lat, long) => {
    setLat(lat);
    setLong(long);
  };

  return (
    <div>
      {/* search bar */}
      Search:{' '}
      <input
        style={{ marginLeft: 5 }}
        type="text"
        placeholder="Type to search..."
        value={searchText}
        onChange={e => handleChange(e.target.value)}
      />
      {/* Container for rendering search data */}
      <div className="box-container">
        {filterDataList.map((d, i) => {
          return (
            <div
              key={i}
              className="box"
              style={{ backgroundColor: 'green' }}
              onMouseEnter={() => setCoord(d.latitude, d.longitude)}
              onClick={() => {
                FlyTo();
              }}
            >
              <b>Bridge Name: </b>
              {d.bridge_name}
              <br />
              <b>Project Code: </b>
              {d.project_code}
              <br />
              <b>Pojedct Stage: </b>
              {d.project_stage}
              <br />
              <b>Latitude: </b>
              {d.latitude}
              <br />
              <b>Longitude: </b>
              {d.longitude}
            </div>
          );
        })}
        <div className="clearboth"></div>
      </div>
    </div>
  );
};

export default Search;
