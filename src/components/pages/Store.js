import React, { useState } from 'react';

const initialState = {
  bridge: {
    geometry: { type: '', coordinates: Array(0) },
    properties: {
      id: null,
      project_code: null,
      bridge_type: null,
      project_stage: null,
      bridge_name: '',
      district_name: '',
    },
  },
};

const initialStatus = 'Complete';
const initialStyle = 'mapbox://styles/jrhemann/cked1kdcz2s261aql8jg3trbw';

export const Context = React.createContext();
export const ContextStatus = React.createContext();
export const ContextStyle = React.createContext();

const Store = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [status, setStatus] = useState(initialStatus);
  const [style, setStyle] = useState(initialStyle);

  return (
    <ContextStyle.Provider value={[style, setStyle]}>
      <ContextStatus.Provider value={[status, setStatus]}>
        <Context.Provider value={[state, setState]}>
          {children}
        </Context.Provider>{' '}
      </ContextStatus.Provider>
    </ContextStyle.Provider>
  );
};

export default Store;
