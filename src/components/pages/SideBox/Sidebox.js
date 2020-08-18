import React, { useContext, useEffect } from 'react';
import { Context } from '../Store';
import { BorderRightOutlined } from '@ant-design/icons';

const Sidebox = () => {
  const [state, setState] = useContext(Context);
  console.log('SideBox', state);

  return (
    <div>
      <p>Bridge Site: {state.bridge.properties.BridgeSiteName}</p>
      <p>{state.bridge.properties.ProjectCode}</p>
      <p>{state.bridge.properties.Province}</p>
      <p>{state.bridge.properties.District}</p>
      <p>{state.bridge.properties.Sector}</p>
    </div>
  );
};

export default Sidebox;
