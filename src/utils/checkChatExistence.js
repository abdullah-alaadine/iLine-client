export const groupChatExists = (arr, chatName) => {
  for (let i = 0; i < arr.length; i++) {
    const groupChats = [];
    if (arr[i].isGroup) {
      if (arr[i].name.includes(chatName)) {
        groupChats.push(arr[i]);
      }
    }
    return groupChats;
  }
};
