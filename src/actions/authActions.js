export const authSuccess = payload => ({
  type: "AUTH_SUCCESS",
  payload
});

export const logout = () => ({
  type: "LOGOUT",
});
