import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import SchduleReducer from "./SchduleReducer";

const RootReducer = combineReducers({
  auth: AuthReducer,
  schdule: SchduleReducer,
});

export default RootReducer;
