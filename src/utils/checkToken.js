export const isValid = () => {
  const expiryDate = window.localStorage.getItem("expiryDate");
  const currentTime = new Date().getTime();
  if (expiryDate) {
    if (currentTime >= expiryDate) return false;
    return true;
  }
  return false;
};

export const reloadIfTokenIsNoLongerValid = () => {
  if (!isValid()) {
    alert("The session was ended! please login again!");
    localStorage.removeItem("store");
    localStorage.removeItem("expiryDate");
    location.reload();
  }
};
