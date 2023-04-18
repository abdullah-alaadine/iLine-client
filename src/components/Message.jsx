import React from "react";
import { useSelector } from "react-redux";

const Message = ({ messageData }) => {
  const { _id } = useSelector((state) => state.authReducer.authData.user);
  return (
    <div className="flex flex-col overflow-y-auto mx-3">
      <p
        className={
          "" +
          (messageData.senderId !== _id
            ? "self-end max-w-[70%]"
            : "self-start max-w-[70%]")
        }
      >
        {messageData.message}
      </p>
    </div>
  );
};

export default Message;
