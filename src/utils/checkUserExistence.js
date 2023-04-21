export const userExists = (arr, userObj) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]._id === userObj._id) {
      return true;
    }
  }
  return false;
};
