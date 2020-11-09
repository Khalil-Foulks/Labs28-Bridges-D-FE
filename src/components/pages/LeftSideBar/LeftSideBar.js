import React, { useContext, useState } from 'react';
import { Drawer } from 'antd';
import Search from '../Search/Search';
import {
  ContextMargin,
  ContextActiveFilters,
  ContextCompleteFilter,
  ContextRejectedFilter,
  ContextUnderConstructionFilter,
  ContextConfirmedFilter,
  ContextProspectingFilter,
  ContextIdentifiedFilter,
} from '../Store';
import '../Map/map.css';
import './LeftSideBar.css';

const LeftSideBar = () => {
  const [visible, setVisible] = useState(true);

  const [activeFilters, setActiveFilters] = useContext(ContextActiveFilters);
  const [statusComplete, setStatusComplete] = useContext(ContextCompleteFilter);
  const [statusRejected, setStatusRejected] = useContext(ContextRejectedFilter);
  const [statusUnderConstruction, setStatusUnderConstruction] = useContext(
    ContextUnderConstructionFilter
  );
  const [statusConfirmed, setStatusConfirmed] = useContext(
    ContextConfirmedFilter
  );
  const [statusProspecting, setStatusProspecting] = useContext(
    ContextProspectingFilter
  );
  const [statusIdentified, setStatusIdentified] = useContext(
    ContextIdentifiedFilter
  );
  const [collapseMargin, setCollapseMargin] = useContext(ContextMargin);
  const [buttonImage, setButtonImage] = useState('back.png');

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

  const addFilter = filter => {
    let newState = [...activeFilters, filter];
    setActiveFilters(newState);
  };

  const removeFilter = filter => {
    if (activeFilters.includes(filter)) {
      let newState = [...activeFilters].filter(
        filterName => filterName !== filter
      );
      setActiveFilters(newState);
    }
  };

  const handleClick = (filterStatus, setFilterStatus, filter) => {
    setFilterStatus(!filterStatus);
    if (!filterStatus) {
      addFilter(filter);
    }
    removeFilter(filter);
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
        <img src={buttonImage} alt="Close drawer button" />
      </button>

      <Drawer
        drawerStyle={{ backgroundColor: 'white' }}
        placement="left"
        width={300}
        closable={false}
        onClose={onClose}
        visible={visible}
        mask={false}
        overflow={false}
      >
        <div className="b2pLogo">
          <img src="B2P_Symbol_Green.svg" alt="B2P Logo" />
        </div>

        {/* Render search component */}
        <Search />

        <div className="iconGroup">
          <div className="iconBox">
            <div className="icons" value={'Complete'}>
              <img
                src="bridge-icon.png"
                alt=""
                onClick={() => {
                  handleClick(statusComplete, setStatusComplete, 'Complete');
                }}
              />
              Completed
            </div>
            <div className="icons">
              <img
                src="construction-icon.png"
                alt=""
                onClick={() => {
                  handleClick(
                    statusUnderConstruction,
                    setStatusUnderConstruction,
                    'Under Construction'
                  );
                }}
              />
              Building
            </div>
            <div className="icons">
              <img
                src="checked-icon.png"
                alt=""
                onClick={() => {
                  handleClick(statusConfirmed, setStatusConfirmed, 'Confirmed');
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
                  handleClick(
                    statusProspecting,
                    setStatusProspecting,
                    'Prospecting'
                  );
                }}
              />
              Prospecting
            </div>
            <div className="icons">
              <img
                src="detective-icon.png"
                alt=""
                onClick={() => {
                  handleClick(
                    statusIdentified,
                    setStatusIdentified,
                    'Identified'
                  );
                }}
              />
              Identified
            </div>
            <div className="icons">
              <img
                src="rejected-icon.png"
                alt=""
                onClick={() => {
                  handleClick(statusRejected, setStatusRejected, 'Rejected');
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
