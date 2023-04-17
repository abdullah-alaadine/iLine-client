import React from "react";

const Chat = ({chat}) => {
  return (
    <div
      className="flex gap-8 p-2 border-slate-500 rounded-lg hover:bg-slate-500"
    >
      <img className="w-16 rounded-full" src={chat.profilePic} alt="" />
      <h1 className=" self-center">
        {chat.firstName} {chat.lastName}
      </h1>
    </div>
  );
};

export default Chat;
