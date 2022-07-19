import { combineReducers } from "redux";
import parkingReducer from "./parkingReducer";

const reducers = combineReducers({
  parking: parkingReducer,
});

export default reducers;
