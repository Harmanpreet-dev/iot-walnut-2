const istate = {
  name: "",
  email: "",
  role: "",
  image: "",
  phone: "",
  jwt: "",
  islogin: false,
  google_secret: "",
};

const AuthReducer = (state = istate, action) => {
  switch (action.type) {
    case "LOGIN": {
      state = {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
        role: action.payload.role,
        image: action.payload.image,
        islogin: action.payload.status,
        jwt: action.payload.jwt,
        google_secret: action.payload.google_secret,
      };
      return state;
    }
    case "LOGOUT": {
      state = {
        ...state,
        name: "",
        email: "",
        role: "",
        image: "",
        phone: "",
        islogin: false,
        jwt: "",
        google_secret: "",
      };
      return state;
    }
    case "UPDATE_PROFILE": {
      state = {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
      };
      return state;
    }
    case "UPDATE_GOOGLE_SECRET": {
      state = {
        ...state,
        google_secret: action.payload.google_secret,
      };
      return state;
    }
    default:
      return state;
  }
};

export default AuthReducer;
