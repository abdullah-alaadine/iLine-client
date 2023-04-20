import React, { useEffect, useRef, useState } from "react";
import Profile from "../assets/profileImg.webp";

// import profile from "../assets/logo-user-profile.png";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import Message from "./Message";
import EmojiPicker from "emoji-picker-react";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { getMessages } from "../api/messagesAPI";

const ChatBox = ({ chat, isMobile, setChat }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const {token} = useSelector((state) => state.authReducer);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id, token);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [chat]);

  const messageRef = useRef(null);
  const handleEmojiClick = (emojiObj) => {
    setShowEmoji(false);
    messageRef.current.value += emojiObj.emoji;
  };

  const { profilePicture, firstName, lastName } = useSelector(
    (state) => state.authReducer.user
  );

  return (
    <div
      onClick={() => setShowEmoji(false)}
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
        {isMobile && (
          <button
            onClick={() => setChat(null)}
            className="m-2 bg-slate-400 rounded-full text-center"
          >
            {"<--"}
          </button>
        )}

        <div className="mr-3 items-center rounded-lg flex gap-4 md:gap-8 p-2 border-slate-500 cursor-pointer hover:bg-slate-500">
          {chat && (
            <img
              src={profilePicture || Profile}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full"
            />
          )}

          <h1>
            {chat ? (
              chat.isGroup ? (
                `${chat.name}`
              ) : (
                `${chat.members[0].firstName + " " + chat.members[0].lastName}`
              )
            ) : (
              <span className=" text-lg md:text-3xl ml-2 font-[cursive]">
                <FontAwesomeIcon icon={faBolt} /> iLine
              </span>
            )}
          </h1>
        </div>
      </div>
      <div className=" border-solid py-1 overflow-y-scroll border-slate-500 bg-slate-400 flex flex-col justify-between rounded-xl border-2 m-2 h-5/6">
        {showEmoji && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute w-fit top-50"
          >
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        {messages.length ? messages.map( message => {
          return <Message message={message} key={message._id} />;
        }) : <p className=" relative text-slate-100 left-[35%] top-[35%] text-lg">your messages will go here</p>}
        <div className="w-full flex relative justify-between items-center px-3 py-1">
          <FontAwesomeIcon
            onClick={(e) => {
              e.stopPropagation();
              setShowEmoji(true);
            }}
            icon={faSmile}
            className="w-4 h-4 md:h-6 md:w-6 cursor-pointer"
            color="black"
          />
          <input
            ref={messageRef}
            type="text"
            className="bg-slate-300 w-10/12 p-2 rounded-lg focus:bg-slate-600 border-none outline-none text-white placeholder-white ml-2"
          />
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="w-4 h-4 md:h-6 md:w-6 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
