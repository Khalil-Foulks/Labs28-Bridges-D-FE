import React, { useContext, useState } from 'react';
import { Drawer } from 'antd';
import Search from '../Search/Search';
import {
  ContextStatus,
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

  const [status, setStatus] = useContext(ContextStatus);

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
  const handleClickComplete = () => {
    setStatusComplete(!statusComplete);

    if (statusComplete) {
      let newState = [...activeFilters, 'Complete'];
      setActiveFilters(newState);
    } else {
      if (activeFilters.includes('Complete')) {
        let newState = [...activeFilters].filter(
          filterName => filterName !== 'Complete'
        );
        setActiveFilters(newState);
      }
    }
  };

  const handleClickUnderConstruction = () => {
    setStatusUnderConstruction(!statusUnderConstruction);

    if (statusUnderConstruction) {
      let newState = [...activeFilters, 'Under Construction'];
      setActiveFilters(newState);
    } else {
      if (activeFilters.includes('Under Construction')) {
        let newState = [...activeFilters].filter(
          filterName => filterName !== 'Under Construction'
        );
        setActiveFilters(newState);
      }
    }
  };

  const handleClickConfirmed = () => {
    setStatusConfirmed(!statusConfirmed);

    if (statusConfirmed) {
      let newState = [...activeFilters, 'Confirmed'];
      setActiveFilters(newState);
    } else {
      if (activeFilters.includes('Confirmed')) {
        let newState = [...activeFilters].filter(
          filterName => filterName !== 'Confirmed'
        );
        setActiveFilters(newState);
      }
    }
  };

  const handleClickProspecting = () => {
    setStatusProspecting(!statusProspecting);

    if (statusProspecting) {
      let newState = [...activeFilters, 'Prospecting'];
      setActiveFilters(newState);
    } else {
      if (activeFilters.includes('Prospecting')) {
        let newState = [...activeFilters].filter(
          filterName => filterName !== 'Prospecting'
        );
        setActiveFilters(newState);
      }
    }
  };

  const handleClickIdentified = () => {
    setStatusIdentified(!statusIdentified);

    if (statusIdentified) {
      let newState = [...activeFilters, 'Identified'];
      setActiveFilters(newState);
    } else {
      if (activeFilters.includes('Identified')) {
        let newState = [...activeFilters].filter(
          filterName => filterName !== 'Identified'
        );
        setActiveFilters(newState);
      }
    }
  };

  const handleClickRejected = () => {
    setStatusRejected(!statusRejected);

    if (statusRejected) {
      let newState = [...activeFilters, 'Rejected'];
      setActiveFilters(newState);
    } else {
      if (activeFilters.includes('Rejected')) {
        let newState = [...activeFilters].filter(
          filterName => filterName !== 'Rejected'
        );
        setActiveFilters(newState);
      }
    }
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
                  handleClickComplete();
                }}
              />
              Completed
            </div>
            <div className="icons">
              <img
                src="construction-icon.png"
                alt=""
                onClick={() => {
                  handleClickUnderConstruction();
                }}
              />
              Building
            </div>
            <div className="icons">
              <img
                src="checked-icon.png"
                alt=""
                onClick={() => {
                  handleClickConfirmed();
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
                  handleClickProspecting();
                }}
              />
              Prospecting
            </div>
            <div className="icons">
              <img
                src="detective-icon.png"
                alt=""
                onClick={() => {
                  handleClickIdentified();
                }}
              />
              Identified
            </div>
            <div className="icons">
              <img
                src="rejected-icon.png"
                alt=""
                onClick={() => {
                  handleClickRejected();
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
