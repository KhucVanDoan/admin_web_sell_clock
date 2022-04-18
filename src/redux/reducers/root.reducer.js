import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import branchReducer from "./branch.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  branch: branchReducer,
});

export default rootReducer;
