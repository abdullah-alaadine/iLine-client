export const isValid = () => {
  const expiryDate = window.localStorage.getItem("expiryDate");
  const currentTime = new Date().getTime();
  if (expiryDate) {
    if (currentTime >= expiryDate) return false;
    return true;
  }
  return false;
};

export const reloadIfTokenIsNoLongerValid = (fn, message, delay) => {
  if (!isValid()) {
    fn(message ?? "The session was ended! please login again!");
    localStorage.removeItem("store");
    localStorage.removeItem("expiryDate");
    if(isNaN(delay)) throw new Error("invalid delay. Delay is of type Number! Delay ex: 3000");
    setTimeout(() => {
      location.reload();
    }, delay);
  }
};
