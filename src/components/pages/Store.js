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

const initialView = {
  latitude: -2.1602,
  longitude: 29.538,
  width: '100vw',
  height: '110vh',
  zoom: 8.2,
  pitch: 0,
  bearing: -22,
};

const initialStatus = 'Complete';
const initialStyle = 'mapbox://styles/jrhemann/ckfcmzx8d3s9y19qt9fuvfcn0';

const initialMargin = 300;
const initialLong = 29.538;
const initialLat = -2.1602;

export const Context = React.createContext();
export const ContextStatus = React.createContext();
export const ContextStyle = React.createContext();
export const ContextMargin = React.createContext();
export const ContextSearchData = React.createContext();
export const ContextLong = React.createContext();
export const ContextLat = React.createContext();
export const ContextView = React.createContext();

const Store = ({ children }) => {
  const [viewport, setViewport] = useState(initialView);
  const [searchData, setSearchData] = useState([]);
  const [state, setState] = useState(initialState);
  const [status, setStatus] = useState(initialStatus);
  const [style, setStyle] = useState(initialStyle);
  const [collapseMargin, setCollapseMargin] = useState(initialMargin);
  const [long, setLong] = useState(initialLong);
  const [lat, setLat] = useState(initialLat);

  return (
    <ContextView.Provider value={[viewport, setViewport]}>
      <ContextLong.Provider value={[long, setLong]}>
        <ContextLat.Provider value={[lat, setLat]}>
          <ContextSearchData.Provider value={[searchData, setSearchData]}>
            <ContextMargin.Provider value={[collapseMargin, setCollapseMargin]}>
              <ContextStyle.Provider value={[style, setStyle]}>
                <ContextStatus.Provider value={[status, setStatus]}>
                  <Context.Provider value={[state, setState]}>
                    {children}
                  </Context.Provider>
                </ContextStatus.Provider>
              </ContextStyle.Provider>
            </ContextMargin.Provider>
          </ContextSearchData.Provider>
        </ContextLat.Provider>
      </ContextLong.Provider>
    </ContextView.Provider>
  );
};

export default Store;
