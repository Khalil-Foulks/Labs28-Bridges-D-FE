import React, { useContext, useState } from 'react';
import { Switch, Drawer, Button, Radio, Input } from 'antd';
import { Context, ContextStatus, ContextStyle } from '../Store';
import Search from 'antd/lib/input/Search';

import './LeftSideBar.css';

const LeftSideBar = () => {
  const [visible, setVisible] = useState(true);
  const [state, setState] = useContext(Context);
  const [status, setStatus] = useContext(ContextStatus);
  const [style, setStyle] = useContext(ContextStyle);
  console.log(status);

  const showDrawer = () => {
    setVisible(true);
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
    <div>
      <Button className="SideButton" type="primary" onClick={showDrawer}>
        Bridge Info
      </Button>
      <Drawer
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
        mask={false}
      >
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
        {/* <button
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
            setStatus('Prospecting');
          }}
        >
          Prospecting
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
            setStatus('Rejected');
          }}
        >
          Rejected
        </button> */}
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
          checkedChildren="Satellite View"
          unCheckedChildren="Regular View"
          defaultUnChecked
          onChange={mapStyle}
        />
        <br></br>
      </Drawer>
    </div>
  );
};

export default LeftSideBar;
