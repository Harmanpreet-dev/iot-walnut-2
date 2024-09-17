const istate = {
  loading: false,
};

const loaderReducer = (state = istate, action) => {
  switch (action.type) {
    case "LOADING": {
      state = {
        ...state,
        loading: action.payload,
      };
      return state;
    }
    default:
      return state;
  }
};

export default loaderReducer;
