import React, { useContext } from 'react';
import { Context } from '../Store';

const Sidebox = () => {
  const [state] = useContext(Context);
  console.log('SideBox', state);

  return (
    <div class="Info">
      <p className="Section">
        Bridge Site:{' '}
        <span className="S"> {state.bridge.properties.BridgeSiteName} </span>{' '}
      </p>
      <p className="Section">
        Bridge ID:{' '}
        <span className="S"> {state.bridge.properties.ProjectCode} </span>{' '}
      </p>
      <p className="Section">
        Province:{' '}
        <span className="S"> {state.bridge.properties.Province} </span>{' '}
      </p>
      <p className="Section">
        District:{' '}
        <span className="S"> {state.bridge.properties.District} </span>{' '}
      </p>
      <p className="Section">
        Sector: <span className="S"> {state.bridge.properties.Sector} </span>{' '}
      </p>
      <br></br>
    </div>
  );
};

export default Sidebox;
