export const groupChatExists = (arr, chatName) => {
  const groupChats = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].isGroup) {
      if (arr[i].name.includes(chatName)) {
        groupChats.push(arr[i]);
      }
    }
  }
  return groupChats;
};
