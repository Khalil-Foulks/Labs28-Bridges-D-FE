import React, { useContext, useState } from 'react';
import { Drawer } from 'antd';
import {
  Context,
  ContextStatus,
  ContextMargin,
  ContextSearchData,
} from '../Store';
import '../Map/map.css';
import './LeftSideBar.css';

const LeftSideBar = () => {
  const [visible, setVisible] = useState(true);
  const [state, setState] = useContext(Context);
  const [status, setStatus] = useContext(ContextStatus);
  const [collapseMargin, setCollapseMargin] = useContext(ContextMargin);
  const [searchData, setSearchData] = useContext(ContextSearchData);
  const [filterDataList, setFilterDataList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [buttonImage, setButtonImage] = useState('back.png');

  console.log('test', searchData);
  const showDrawer = () => {
    if (visible === true) setVisible(false);
    if (visible === false) setVisible(true);
    if (visible === false) setButtonImage('back.png');
    if (visible === true) setButtonImage('next.png');
  };

  const moveButton = () => {
    if (visible === true) setCollapseMargin(0);
    if (visible === false) setCollapseMargin(300);
  };

  const onClose = () => {
    setVisible(false);
  };

  const dataList = searchData;
  console.log('search', searchData);
  console.log('list', dataList);

  //List everything to exclude with filtering
  const exclude = ['id', 'bridge_type'];

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
      console.log('test2', searchData);
    }
  };

  //Handle change for search box
  const handleChange = value => {
    setSearchText(value);
    filterData(value);
  };

  return (
    <div id="sidebar">
      {/* button that toggles sidebar in and out */}
      <button
        className="SideButton"
        style={{ marginLeft: collapseMargin }}
        type="primary"
        onClick={() => {
          moveButton();
          showDrawer();
        }}
      >
        <img src={buttonImage} />
      </button>

      <Drawer
        drawerStyle={{ backgroundColor: 'white' }}
        placement="left"
        width={300}
        closable={false}
        onClose={onClose}
        visible={visible}
        mask={false}
      >
        <img src="B2P_Symbol_Green.svg" alt="B2P Logo" />
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
              <div key={i} className="box" style={{ backgroundColor: 'green' }}>
                <b>Bridge Name: </b>
                {d.bridge_name}
                <br />
                <b>Project Code: </b>
                {d.project_code}
                <br />
                <b>District: </b>
                {d.district_name}
                <br />
              </div>
            );
          })}
          <div className="clearboth"></div>
        </div>
        <p className="Section">
          Bridge Site: <span> {state.bridge.properties.bridge_name} </span>{' '}
        </p>
        <p>
          District: <span> {state.bridge.properties.district_name} </span>{' '}
        </p>
        <div className="iconGroup">
          <div className="iconBox">
            <div className="icons" value={'Complete'}>
              <img
                src="bridge-icon.png"
                alt=""
                onClick={() => {
                  setStatus('Complete');
                }}
              />
              Completed
            </div>
            <div className="icons">
              <img
                src="construction-icon.png"
                alt=""
                onClick={() => {
                  setStatus('Under Construction');
                }}
              />
              Building
            </div>
            <div className="icons">
              <img
                src="checked-icon.png"
                alt=""
                onClick={() => {
                  setStatus('Confirmed');
                }}
              />
              Confirmed
            </div>
          </div>
          <div className="iconBox">
            <div className="icons">
              <img
                src="binoculars-icon.png"
                alt=""
                onClick={() => {
                  setStatus('Prospecting');
                }}
              />
              Prospecting
            </div>
            <div className="icons">
              <img
                src="detective-icon.png"
                alt=""
                onClick={() => {
                  setStatus('Identified');
                }}
              />
              Identified
            </div>
            <div className="icons">
              <img
                src="rejected-icon.png"
                alt=""
                onClick={() => {
                  setStatus('Rejected');
                }}
              />
              Rejected
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default LeftSideBar;
