import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import branchReducer from "./branch.reducer";
import categoryReducer from "./category.reducer";
import colorReducer from "./color.reducer";
import couponReducer from "./coupon.reducer";
import productReducer from "./product.reducer";
import settingReducer from "./setting.reducer";
import specificationReducer from "./specification.reducer";
import storageReducer from "./storage.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  branch: branchReducer,
  category: categoryReducer,
  color: colorReducer,
  coupon: couponReducer,
  storage: storageReducer,
  specification: specificationReducer,
  setting: settingReducer,
  product: productReducer,
});

export default rootReducer;
