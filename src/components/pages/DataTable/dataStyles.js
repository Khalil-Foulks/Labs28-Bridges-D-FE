export const root = {
  display: 'flex',
  flexWrap: 'wrap',
  backgroundColor: '#372d4a',
};
export const container = {
  maxHeight: 400,
  backgroundColor: '#372d4a',

  overflowY: 'auto',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  height: '100%',
  '&::-webkit-scrollbar': {
    width: '0.4em',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,.1)',
    outline: '10px solid slategrey',
  },
};

export const infoCard = {
  backgroundColor: 'red',
};
export const chartCard = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  background:
    'linear-gradient(93deg, rgba(41,66,122,1) 0%, rgba(91,69,133,1) 81%)',
  maxHeight: '200px',
};
export const tableCard = {
  minWidth: '100%',
};
export const green = {
  backgroundColor: 'green',
};
export const gold = {
  backgroundColor: 'white',
};
export const table = {
  minWidth: 750,
};
export const mapOpen = {};
export const mapClosed = {
  display: 'none',
};

export const mapContainer = {
  maxHeight: 400,
};
export const tableRow0 = {
  backgroundColor: 'blue',
};
export const tableRow1 = {
  backgroundColor: 'green',
};
