import { combineReducers } from "redux";
import authReducer from "./authReducer";
import schduleReducer from "./schduleReducer";
import fleetReducer from "./fleetReducer";
import otaReducerReducer from "./otaReducer";
import loaderReducer from "./loaderReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  schdule: schduleReducer,
  OTA: otaReducerReducer,
  common: fleetReducer,
  loader: loaderReducer,
});

export default rootReducer;
