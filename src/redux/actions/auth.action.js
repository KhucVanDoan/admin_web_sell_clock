import * as types from "../constants";

export const login = () => async (dispatch) =>
  dispatch({
    type: types.LOGIN,
    payload: { token: "xxxx" },
  });
