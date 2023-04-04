export const sagaActionTypes = {
  LOGIN: "LOGIN",
  lOGOUT: "LOGOUT",
  GET_USER_PROFILE: "GET_USER_PROFILE",
};

//dispatch LOGIN(data)
export const LOGIN = (data) => ({
  type: sagaActionTypes.LOGIN,
  payload: data,
});

export const LOGOUT = (data) => ({
  type: sagaActionTypes.lOGOUT,
  payload: data,
});

export const GET_USER_PROFILE = (data) => ({
  type: sagaActionTypes.GET_USER_PROFILE,
  payload: data,
});
