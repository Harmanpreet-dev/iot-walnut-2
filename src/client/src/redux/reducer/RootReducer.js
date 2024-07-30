import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import SchduleReducer from "./SchduleReducer";
import CommonReducer from "./CommonReducer";
import OTAReducerReducer from "./OTAReducer";

const RootReducer = combineReducers({
  auth: AuthReducer,
  schdule: SchduleReducer,
  OTA: OTAReducerReducer,
  Common: CommonReducer,
});

export default RootReducer;
