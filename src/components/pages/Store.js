import React, { useState } from 'react';

const initialState = {
  bridge: {
    geometry: { type: '', coordinates: Array(0) },
    properties: {
      bridgeId: null,
      ProjectCode: null,
      Province: '',
      District: '',
      Sector: '',
      Cell: '',
    },
  },
};
export const Context = React.createContext();

const Store = ({ children }) => {
  const [state, setState] = useState(initialState);

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};

export default Store;
