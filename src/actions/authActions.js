export const authSuccess = (user, token) => ({
  type: "AUTH_SUCCESS",
  payload: {
    user,
    token
  },
});

export const logout = () => ({
  type: "LOGOUT",
});
