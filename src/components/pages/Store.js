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
const initialStyle =
  'mapbox://styles/bridgestoprosperity/ckh3x490s06uf1atng20ald51';

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

export const ContextRejectedFilter = React.createContext();
export const ContextCompleteFilter = React.createContext();
export const ContextUnderConstructionFilter = React.createContext();
export const ContextConfirmedFilter = React.createContext();
export const ContextProspectingFilter = React.createContext();
export const ContextIdentifiedFilter = React.createContext();
export const ContextActiveFilters = React.createContext();

const Store = ({ children }) => {
  const [viewport, setViewport] = useState(initialView);
  const [searchData, setSearchData] = useState([]);
  const [state, setState] = useState(initialState);
  const [status, setStatus] = useState(initialStatus);
  const [style, setStyle] = useState(initialStyle);
  const [collapseMargin, setCollapseMargin] = useState(initialMargin);
  const [long, setLong] = useState(initialLong);
  const [lat, setLat] = useState(initialLat);

  const [activeFilters, setActiveFilters] = useState(['Complete']);
  const [statusComplete, setStatusComplete] = useState(true);
  const [statusUnderConstruction, setStatusUnderConstruction] = useState(false);
  const [statusConfirmed, setStatusConfirmed] = useState(false);
  const [statusProspecting, setStatusProspecting] = useState(false);
  const [statusIdentified, setStatusIdentified] = useState(false);
  const [statusRejected, setStatusRejected] = useState(false);

  return (
    <ContextView.Provider value={[viewport, setViewport]}>
      <ContextLong.Provider value={[long, setLong]}>
        <ContextLat.Provider value={[lat, setLat]}>
          <ContextSearchData.Provider value={[searchData, setSearchData]}>
            <ContextMargin.Provider value={[collapseMargin, setCollapseMargin]}>
              <ContextStyle.Provider value={[style, setStyle]}>
                <ContextStatus.Provider value={[status, setStatus]}>
                  <ContextRejectedFilter.Provider
                    value={[statusRejected, setStatusRejected]}
                  >
                    <ContextCompleteFilter.Provider
                      value={[statusComplete, setStatusComplete]}
                    >
                      <ContextUnderConstructionFilter.Provider
                        value={[
                          statusUnderConstruction,
                          setStatusUnderConstruction,
                        ]}
                      >
                        <ContextConfirmedFilter.Provider
                          value={[statusConfirmed, setStatusConfirmed]}
                        >
                          <ContextProspectingFilter.Provider
                            value={[statusProspecting, setStatusProspecting]}
                          >
                            <ContextIdentifiedFilter.Provider
                              value={[statusIdentified, setStatusIdentified]}
                            >
                              <ContextActiveFilters.Provider
                                value={[activeFilters, setActiveFilters]}
                              >
                                <Context.Provider value={[state, setState]}>
                                  {children}
                                </Context.Provider>
                              </ContextActiveFilters.Provider>
                            </ContextIdentifiedFilter.Provider>
                          </ContextProspectingFilter.Provider>
                        </ContextConfirmedFilter.Provider>
                      </ContextUnderConstructionFilter.Provider>
                    </ContextCompleteFilter.Provider>
                  </ContextRejectedFilter.Provider>
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
