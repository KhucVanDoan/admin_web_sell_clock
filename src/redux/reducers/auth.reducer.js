import * as types from "../constants";

const initialState = {
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        token: action.token,
        refreshToken: action.refreshToken,
      };
    case types.GET_PROFILE:
      return {
        ...state,
        user: action.user,
      };
    case types.LOGOUT:
      return [];
    default:
      return state;
  }
};

export default authReducer;
