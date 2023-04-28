export const userExists = (arr, userObj) => {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].isGroup && arr[i].members[0]._id === userObj._id) {
        return userObj;
    }
  }
};

export const getUserChat = (arr, userObj) => {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].isGroup && arr[i].members[0]._id === userObj._id) {
      return arr[i];
    }
  }
};

export const memberExists = (arr, userObj) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]._id === userObj._id) {
        return userObj;
    }
  }
};

export const chatExists = (arr, chat) => {
  for (let i = 0; i < arr?.length; i++) {
    if (arr[i]._id === chat._id) {
        return chat;
    }
  }
};