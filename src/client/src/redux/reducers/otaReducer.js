const istate = {
  fleetId: null,
  fleet: null,
  devices: [],
  totalDeviceNo: 0,
};

const otaReducerReducer = (state = istate, action) => {
  const { fleetId, fleet, devices } = action.payload || {};
  switch (action.type) {
    case "SELECT_FLEET": {
      state = {
        ...state,
        fleetId,
        fleet,
      };
      return state;
    }
    case "SELECT_DEVICE": {
      state = {
        ...state,
        devices,
        totalDeviceNo: devices.length,
      };
      return state;
    }
    case "RESET": {
      return {
        ...state,
        ...istate,
      };
    }
    default:
      return state;
  }
};

export default otaReducerReducer;
