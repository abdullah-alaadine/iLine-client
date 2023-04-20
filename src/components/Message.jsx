import React from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { _id } = useSelector((state) => state.authReducer.user);
  return (
    <div className="flex flex-col overflow-y-auto mx-3">
      <p
        className={
          "text-xs md:text-sm lg:text-base " +
          (message.senderId !== _id
            ? "self-end max-w-[70%]"
            : "self-start max-w-[70%]")
        }
      >
        {message.messageText}
      </p>
    </div>
  );
};

export default Message;
