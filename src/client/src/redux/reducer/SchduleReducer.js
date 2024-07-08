const istate = {
  fleetId: "",
  fleet: "",
  devices: [],
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
      };
      return state;
    }
    default:
      return state;
  }
};

export default SchduleReducer;
