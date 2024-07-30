import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import SchduleReducer from "./SchduleReducer";
import CommonReducer from "./CommonReducer";

const RootReducer = combineReducers({
  auth: AuthReducer,
  schdule: SchduleReducer,
  Common: CommonReducer,
});

export default RootReducer;
