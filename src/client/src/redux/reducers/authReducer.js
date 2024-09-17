const istate = {
  id: "",
  name: "",
  email: "",
  role: "",
  image: "",
  phone: "",
  jwt: "",
  islogin: false,
  google_secret: "",
};

const authReducer = (state = istate, action) => {
  switch (action.type) {
    case "LOGIN": {
      state = {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
        role: action.payload.role,
        image: action.payload.image,
        islogin: true,
        jwt: action.payload.jwt,
        google_secret: action.payload.google_secret,
      };
      return state;
    }
    case "LOGOUT": {
      state = {
        ...state,
        id: "",
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
        image: action.payload.photo || state.image,
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

export default authReducer;
