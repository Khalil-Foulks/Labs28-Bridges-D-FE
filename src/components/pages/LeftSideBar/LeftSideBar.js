import React, { useContext, useState } from 'react';

import { Context } from '../Store';
import Search from 'antd/lib/input/Search';

import './LeftSideBar.css';

// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

const LeftSideBar = () => {
  const [state, setState] = useContext(Context);
  console.log('SideBox', state);

  return (
    <div class="Info">
      <h2>Search by bridge name</h2>
      <Search></Search>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p className="Section">
        Bridge Site:{' '}
        <span className="S"> {state.bridge.properties.BridgeSiteName} </span>{' '}
      </p>
      <p className="Section">
        District:{' '}
        <span className="S"> {state.bridge.properties.District} </span>{' '}
      </p>
      <p className="Section">
        Project Stage:{' '}
        <span className="S"> {state.bridge.properties.ProjectStage} </span>{' '}
      </p>
      <p className="Section">
        Individuals Served:{' '}
        <span className="S"> {state.bridge.properties.District} </span>{' '}
      </p>

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
