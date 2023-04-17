export const sendAuthReq = () => ({
  type: "AUTH_START",
});

export const authSuccess = data => ({
  type: "AUTH_SUCCESS",
  payload: {
    data,
  },
});

export const authFail = () => ({
  type: "AUTH_FAIL",
});

export const logout = () => ({
  type: "LOGOUT",
});
