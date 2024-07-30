export const SELECT_FLEET = (data) => {
  return {
    type: "SELECT_FLEET",
    payload: data,
  };
};

export const SELECT_DEVICE = (data) => {
  return {
    type: "SELECT_DEVICE",
    payload: data,
  };
};

export const RESET = () => {
  return {
    type: "RESET",
  };
};
