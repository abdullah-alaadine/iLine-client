import React from "react";
import profile from "../assets/logo-user-profile.png";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

const ChatBox = ({ chat, isMobile }) => {
  const { profilePicture, firstName, lastName } = useSelector(
    (state) => state.authReducer.authData.user
  );
  return (
    <div
      style={
        chat && isMobile
          ? { display: "block" }
          : isMobile && !chat
          ? { display: "none" }
          : {}
      }
      className="h-screen bg-slate-200 w-full md:w-2/3 rounded-lg "
    >
      <div className="w-full flex justify-between mx-2 items-center rounded-lg bg-slate-400 h-[10%]">
        <div>
          {isMobile && (
            <button
              onClick={() => setChat(null)}
              className="m-2 bg-slate-400 rounded-full text-center"
            >
              banana 2 {"<--"}
            </button>
          )}
        </div>
        <span className=" text-lg md:text-3xl ml-2 font-[cursive]">
          <FontAwesomeIcon icon={faBolt} /> iLine
        </span>
        <div className="mr-3 items-center flex gap-8 p-2 border-slate-500 rounded-lg cursor-pointer hover:bg-slate-500">
          <img
            src={profilePicture || profile}
            className="w-6 h-6 m:w-8 m:h-8"
          />
          <h1>
            {firstName} {lastName}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
