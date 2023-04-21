import React from "react";
import { useSelector } from "react-redux";
import {format} from 'timeago.js'

const Message = ({ message }) => {
  const { _id } = useSelector((state) => state.authReducer.user);
  return (
    <div className="flex flex-col overflow-y-auto mx-3 ">
      <div
        className={
          " text-slate-200 p-1 rounded-lg flex flex-col gap-2 max-w-[70%] text-xs md:text-sm lg:text-base " +
          (message.senderId !== _id
            ? "self-end bg-slate-700"
            : "self-start bg-slate-400")
        }
      >
        <p>{message.messageText}</p>
        <p className="text-[8px] md:text-xs text-gray-400">{format(message.createdAt)}</p>
      </div>
    </div>
  );
};

export default Message;
