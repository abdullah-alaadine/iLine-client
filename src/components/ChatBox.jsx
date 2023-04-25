import React, { useEffect, useRef, useState } from "react";
import Profile from "../assets/profileImg.webp";
import GroupIcon from "../assets/groupIcon.jpg";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import Message from "./Message";
import EmojiPicker from "emoji-picker-react";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { getMessages, postMessage } from "../api/messagesAPI";
import GroupMembersCard from "./GroupMembersCard";

const ChatBox = ({ chat, isMobile, setChat, chats, setChats }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const { token } = useSelector((state) => state.authReducer);
  const [messages, setMessages] = useState([]);
  const [groupCard, setGroupCard] = useState(false);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id, token);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat) fetchMessages();
  }, [chat]);

  const messageRef = useRef(null);
  const handleEmojiClick = (emojiObj) => {
    setShowEmoji(false);
    messageRef.current.value += emojiObj.emoji;
  };
  const { profilePicture, firstName, lastName } = useSelector(
    (state) => state.authReducer.user
  );

  const handleSubmit = async () => {
    try {
      const { data } = await postMessage(
        chat._id,
        messageRef.current.value,
        token
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    messageRef.current.value = "";
  };
  return (
    <div
      onClick={() => {
        setShowEmoji(false);
        setGroupCard(false);
      }}
      style={
        chat && isMobile
          ? { display: "block" }
          : isMobile && !chat
          ? { display: "none" }
          : {}
      }
      className="h-screen relative` bg-slate-200 w-full md:w-2/3 rounded-lg overflow-y-scroll "
    >
      <div className=" border-slate-500 border-2 flex justify-between mx-2 items-center rounded-lg bg-slate-400 h-[10%]">
        {isMobile && (
          <button
            onClick={() => setChat(null)}
            className="m-2 bg-slate-400 rounded-full text-center"
          >
            {"<--"}
          </button>
        )}

        <div
          className="mr-3 items-center rounded-lg flex gap-4 md:gap-8 p-2 border-slate-500 cursor-pointer hover:bg-slate-500"
          onClick={e => {
            e.stopPropagation()
            setGroupCard(true)
          }}
        >
          {chat && (
            <img
              src={(chat.isGroup? chat.groupPicture : chat.profilePicture) || (chat.isGroup ? GroupIcon : Profile)}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full"
            />
          )}

          <h1 className="text-xs sm:text-sm lg:text-base">
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
      <div className="relative border-solid py-1 overflow-y-hidden border-slate-500 bg-slate-400 grid grid-rows-1 rounded-xl border-2 m-2 h-5/6">
        {groupCard && chat?.isGroup && <div
            className="absolute inset-0 z-10 overflow-y-auto w-full md:w-[60%] rounded-lg"
            style={{ height: "90%" }}
          >
            <GroupMembersCard chat={chat} setChat={setChat} chats={chats} setChats={setChats} setGroupCard={setGroupCard} />
          </div>}
        {showEmoji && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute w-fit top-50"
          >
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        <div className=" overflow-x-hidden">
          {messages.length ? (
            messages.map((message) => {
              return <Message message={message} key={message._id} />;
            })
          ) : (
            <p className=" relative text-slate-100 left-[35%] top-[35%] text-lg">
              your messages will go here
            </p>
          )}
        </div>
        <div className="w-full bottom-0 flex justify-between items-center px-3 py-1">
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
            placeholder="type here ..."
            className="bg-slate-300 text-white w-10/12 p-2 rounded-lg focus:bg-slate-600 border-none outline-none placeholder-slate-600 ml-2 bottom-0"
          />
          <FontAwesomeIcon
            icon={faPaperPlane}
            onClick={handleSubmit}
            className="w-4 h-4 md:h-6 md:w-6 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
