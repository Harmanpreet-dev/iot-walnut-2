export const LOGIN = (data) => {
  return {
    type: "LOGIN",
    payload: data,
  };
};

export const LOGOUT = (data) => {
  return {
    type: "LOGOUT",
    payload: data,
  };
};

export const UPDATE_PROFILE = (data) => {
  return {
    type: "UPDATE_PROFILE",
    payload: data,
  };
};

export const UPDATE_GOOGLE_SECRET = (data) => {
  return {
    type: "UPDATE_GOOGLE_SECRET",
    payload: data,
  };
};
