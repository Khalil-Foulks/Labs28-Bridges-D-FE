import React, { useContext, useState } from 'react';
import { Drawer } from 'antd';
import Search from '../Search/Search';
import { ContextStatus, ContextMargin } from '../Store';
import '../Map/map.css';
import './LeftSideBar.css';

const LeftSideBar = () => {
  const [visible, setVisible] = useState(true);

  const [status, setStatus] = useContext(ContextStatus);
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
