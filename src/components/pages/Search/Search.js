import React, { useState, useContext } from 'react';
import {
  ContextSearchData,
  ContextView,
  ContextStatus,
  ContextActiveFilters,
} from '../Store';
import * as d3 from 'd3';
import { FlyToInterpolator } from 'react-map-gl';
import './Search.css';

const Search = () => {
  const [searchData, setSearchData] = useContext(ContextSearchData);
  const [filterDataList, setFilterDataList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [long, setLong] = useState();
  const [lat, setLat] = useState();
  const [status, setStatus] = useContext(ContextStatus);
  const [viewport, setViewport] = useContext(ContextView);
  const [activeFilters, setActiveFilters] = useContext(ContextActiveFilters);

  const newData = data => {
    const newCurrentData = searchData.map(obj =>
      Object.keys(obj)
        .filter(x => obj[x] !== null)
        .reduce((o, e) => {
          o[e] = obj[e];
          return o;
        }, {})
    );
    const noUnderfined = newCurrentData.map(obj =>
      Object.keys(obj)
        .filter(x => obj[x] !== undefined)
        .reduce((o, e) => {
          o[e] = obj[e];
          return o;
        }, {})
    );
    return noUnderfined;
  };

  const dataList = newData();

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
      latitude: lat,
      longitude: long,
      zoom: 14,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: d3.easeCubic,
    };
    setViewport(flyViewport);
  };

  const setCoord = (lat, long) => {
    setLat(lat);
    setLong(long);
  };

  const addFilter = filter => {
    let newState = [...activeFilters, filter];
    setActiveFilters(newState);
  };

  return (
    <div>
      {/* search bar */}
      <div className="searchbar">
        <input
          style={{ margin: 15 }}
          type="text"
          placeholder="Type to search..."
          value={searchText}
          onChange={e => handleChange(e.target.value)}
        />
      </div>

      {/* Container for rendering search data */}
      <div className="bridgeCard-container">
        {filterDataList.map((d, i) => {
          return (
            <div
              className="bridgeCard"
              key={i}
              // style={{ margin: 0 }}
              onMouseEnter={() =>
                setCoord(
                  d.bridge_opportunity_gps_latitude,
                  d.bridge_opportunity_gps_longitude
                )
              }
              onClick={() => {
                FlyTo();
                addFilter(d.bridge_opportunity_stage);
              }}
            >
              <b>Bridge Name: </b>
              {d.bridge_name}
              <br />
              <b>Project Code: </b>
              {d.bridge_opportunity_project_code}
              <br />
              <b>Poject Stage: </b>
              {d.bridge_opportunity_stage}
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
