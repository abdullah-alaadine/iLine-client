import React, { useRef, useState } from "react";
import profile from "../assets/logo-user-profile.png";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import Message from "./Message";
import EmojiPicker from "emoji-picker-react";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ChatBox = ({ chat, isMobile, setChat }) => {
  const [showEmoji, setShowEmoji] = useState(false);

  const messages = [
    {
      message: "Hey, how's it going?",
      chatId: 1,
      senderId: 1,
      messageContent: "text",
    },
    {
      message: "Not bad, thanks. How about you?",
      chatId: 1,
      senderId: 2,
      messageContent: "text",
    },
    {
      message: "I'm doing well, thanks for asking.",
      chatId: 1,
      senderId: 1,
      messageContent: "text",
    },
    {
      message: "What have you been up to?",
      chatId: 1,
      senderId: 2,
      messageContent: "text",
    },
    {
      message: "Just working on some projects. How about you?",
      chatId: 1,
      senderId: 1,
      messageContent: "text",
    },
    {
      message: "Same here, just trying to stay busy.",
      chatId: 1,
      senderId: 2,
      messageContent: "text",
    },
    {
      message: "Hey, did you see that new movie that just came out?",
      chatId: 2,
      senderId: 1,
      messageContent: "text",
    },
    {
      message: "No, I haven't. What's it about?",
      chatId: 2,
      senderId: 2,
      messageContent: "text",
    },
    {
      message:
        "It's a sci-fi movie about time travel. I heard it's really good.",
      chatId: 2,
      senderId: 1,
      messageContent: "text",
    },
    {
      message: "Interesting, I might have to check it out.",
      chatId: 2,
      senderId: 2,
      messageContent: "text",
    },
  ];
  const messageRef = useRef(null)
  const handleEmojiClick = (emojiObj) => {
    console.log(emojiObj.emoji);
    setShowEmoji(false)
    messageRef.current.value += emojiObj.emoji 
  };

  const { profilePicture, firstName, lastName } = useSelector(
    (state) => state.authReducer.authData.user
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
        <div>
          {isMobile && (
            <button
              onClick={() => setChat(null)}
              className="m-2 bg-slate-400 rounded-full text-center"
            >
              {"<--"}
            </button>
          )}
        </div>
        <span className=" text-lg md:text-3xl ml-2 font-[cursive]">
          <FontAwesomeIcon icon={faBolt} /> iLine
        </span>
        <div className="mr-3 items-center flex gap-4 md:gap-8 p-2 border-slate-500 rounded-lg cursor-pointer hover:bg-slate-500">
          <img
            src={profilePicture || profile}
            className="w-6 h-6 m:w-8 m:h-8"
          />
          <h1>
            {firstName} {lastName}
          </h1>
        </div>
      </div>
      <div className=" border-solid border-slate-500 bg-slate-400 flex flex-col justify-between rounded-xl border-2 m-2 h-5/6">
      {showEmoji && (
            <div onClick={e => e.stopPropagation()} className="absolute w-fit top-50">
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                />
              </div>
          )}
        {messages.map((messageData, index) => {
          return <Message messageData={messageData} key={index} />;
        })}
        <div className="w-full flex relative justify-between items-center px-3 py-1">
          
          <FontAwesomeIcon
            onClick={e => {
                console.log('fontawesomeicon')
                e.stopPropagation()
                setShowEmoji(true)
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
