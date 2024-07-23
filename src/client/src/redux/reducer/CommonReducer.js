const istate = {
  fleet: "",
};

const CommonReducer = (state = istate, action) => {
  switch (action.type) {
    case "ADD_FLEET": {
      state = {
        ...state,
        fleet: action.payload.fleet,
      };
      return state;
    }
    default:
      return state;
  }
};

export default CommonReducer;
