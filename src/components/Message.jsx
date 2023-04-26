import React from "react";
import { useSelector } from "react-redux";
import {format} from 'timeago.js'

const Message = ({ message }) => {
  const { _id } = useSelector((state) => state.authReducer.user);
  return (
    <div className="flex flex-col mx-3 ">
      <div
        className={
          "p-1 rounded-lg flex flex-col gap-2 max-w-[70%] text-xs md:text-sm lg:text-base " +
          (message.senderId !== _id
            ? "self-end text-slate-200 bg-slate-800"
            : "self-start text-slate-800 bg-slate-300")
        }
      >
        <p>{message.messageText}</p>
        <p className="text-[8px] md:text-xs text-gray-500">{format(message.createdAt)}</p>
      </div>
    </div>
  );
};

export default Message;
