const istate = {
  fleetId: "",
  fleet: "",
  devices: [],
  totalDeviceNo: 0,
};

const SchduleReducer = (state = istate, action) => {
  switch (action.type) {
    case "SELECT_FLEET": {
      state = {
        ...state,
        fleetId: action.payload.fleetId,
        fleet: action.payload.fleet,
      };
      return state;
    }
    case "SELECT_DEVICE": {
      state = {
        ...state,
        devices: action.payload.devices,
        totalDeviceNo: action.payload.devices.length,
      };
      return state;
    }
    default:
      return state;
  }
};

export default SchduleReducer;
