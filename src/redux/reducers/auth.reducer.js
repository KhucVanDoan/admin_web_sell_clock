import * as types from "../constants";

// const initialState = {};

const authReducer = (state, { type }) => {
  switch (type) {
    case types.LOGIN:
      return [];
    case types.REGISTER:
      return [];
    case types.LOGOUT:
      return [];
    default:
      return [];
  }
};

export default authReducer;
