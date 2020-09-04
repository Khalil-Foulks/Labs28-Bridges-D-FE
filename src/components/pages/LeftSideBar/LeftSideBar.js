import React, { useContext } from 'react';

import { Context, ContextStatus } from '../Store';
import Search from 'antd/lib/input/Search';

import './LeftSideBar.css';

// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

const LeftSideBar = () => {
  const [state, setState] = useContext(Context);
  const [status, setStatus] = useContext(ContextStatus);

  return (
    <div className="Info">
      <h2>Search by bridge name</h2>
      <Search></Search>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p className="Section">
        Bridge Site:{' '}
        <span className="S"> {state.bridge.properties.bridge_name} </span>{' '}
      </p>
      <p className="Section">
        District:{' '}
        <span className="S"> {state.bridge.properties.district_name} </span>{' '}
      </p>

      <button
        onClick={e => {
          setStatus('Complete');
        }}
      >
        Completed
      </button>
      <button
        onClick={e => {
          setStatus('Confirmed');
        }}
      >
        Confirmed
      </button>
      <button
        onClick={e => {
          setStatus('Under Construction');
        }}
      >
        Under Construction
      </button>
      <button
        onClick={e => {
          setStatus('Identified');
        }}
      >
        Identified
      </button>
      <button
        onClick={e => {
          setStatus('Prospecting');
        }}
      >
        Prospecting
      </button>

      <button
        onClick={e => {
          setStatus('Rejected');
        }}
      >
        Rejected
      </button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <img className="bridgeImg" src="sampleBridgePic.jpg" alt="test"></img>
      <br></br>
    </div>
  );
};

export default LeftSideBar;
