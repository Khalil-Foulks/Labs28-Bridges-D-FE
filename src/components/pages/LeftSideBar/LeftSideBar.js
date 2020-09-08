import React, { useContext } from 'react';
import { Switch } from 'antd';
import { Context, ContextStatus, ContextStyle } from '../Store';
import Search from 'antd/lib/input/Search';

import './LeftSideBar.css';

const LeftSideBar = () => {
  const [state, setState] = useContext(Context);
  const [status, setStatus] = useContext(ContextStatus);
  const [style, setStyle] = useContext(ContextStyle);

  // Function to toggle map style state with toggle switch
  function onChange(checked) {
    console.log(`switch to ${checked}`);
    if (checked == true) {
      setStyle('mapbox://styles/jrhemann/ckeu55hbw0qcy19l999jtufn9');
    }
    if (checked == false) {
      setStyle('mapbox://styles/jrhemann/cked1kdcz2s261aql8jg3trbw');
    }
  }

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
      </button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Switch
        checkedChildren="Satellite View"
        unCheckedChildren="Regular View"
        defaultUnChecked
        onChange={onChange}
      />
      <br></br>
    </div>
  );
};

export default LeftSideBar;
