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

  const showDrawer = () => {
    if (visible === true) setVisible(false);
    if (visible === false) setVisible(true);
  };

  const moveButton = () => {
    if (visible === true) setCollapseMargin(0);
    if (visible === false) setCollapseMargin(260);
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
    console.log('radio checked', e.target.value);
    setStatus(e.target.value);
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
        {`${'<'}`}
      </button>

      <Drawer
        drawerStyle={{ backgroundColor: 'white' }}
        placement="left"
        width={260}
        closable={false}
        onClose={onClose}
        visible={visible}
        mask={false}
      >
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

        <Radio.Group onChange={onChange} setStatus={value}>
          <Radio style={radioStyle} value="Complete">
            Complete
          </Radio>
          <Radio style={radioStyle} value={'Confirmed'}>
            Confirmed
          </Radio>
          <Radio style={radioStyle} value={'Under Construction'}>
            Under Construction
          </Radio>
          <Radio style={radioStyle} value={'Prospecting'}>
            Prospecting
          </Radio>
          <Radio style={radioStyle} value={'Identified'}>
            Identified
          </Radio>
          <Radio style={radioStyle} value={'Rejected'}>
            Rejected
          </Radio>
        </Radio.Group>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Switch
          className="switch"
          checkedChildren="Satellite Off"
          unCheckedChildren="Satellite On"
          defaultUnChecked
          onChange={mapStyle}
        />
        <br></br>
      </Drawer>
    </div>
  );
};

export default LeftSideBar;
