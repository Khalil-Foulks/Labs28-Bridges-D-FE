import React, { useContext, useState } from 'react';
import { Switch, Drawer, Button, Radio, Input } from 'antd';
import { Context, ContextStatus, ContextStyle, ContextMargin } from '../Store';
import Search from 'antd/lib/input/Search';
import '../Map/map.css';
import './LeftSideBar.css';
import Sider from 'antd/lib/layout/Sider';

const LeftSideBar = () => {
  const [visible, setVisible] = useState(true);
  const [state, setState] = useContext(Context);
  const [status, setStatus] = useContext(ContextStatus);
  const [style, setStyle] = useContext(ContextStyle);
  const [collapseMargin, setCollapseMargin] = useContext(ContextMargin);
  const [buttonImage, setButtonImage] = useState('back.png');

  console.log('test', status);

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

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  const { value } = status;

  // Function to toggle map style state with toggle switch
  function mapStyle(checked) {
    console.log(`switch to ${checked}`);
    if (checked == true) {
      setStyle('mapbox://styles/jrhemann/ckeu55hbw0qcy19l999jtufn9');
    }
    if (checked == false) {
      setStyle('mapbox://styles/jrhemann/cked1kdcz2s261aql8jg3trbw');
    }
  }

  function onChange(e) {
    setStatus(value);
  }

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
        <img src="B2P_Symbol_Green.svg" />
        <br></br>
        <br></br>
        <br></br>
        <br></br>

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

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

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
