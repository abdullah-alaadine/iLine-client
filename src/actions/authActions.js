export const authSuccess = payload => ({
  type: "AUTH_SUCCESS",
  payload
});

export const updateSuccess = payload => ({
  type: "UPDATE_SUCCESS",
  payload
});

export const logout = () => ({
  type: "LOGOUT",
});
