export const userExists = (arr, userObj) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]._id === userObj._id) {
      return userObj;
    }
  }
};

export const getUserChat = (arr, userObj) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]._id === userObj._id) {
      return arr[i];
    }
  }
};
