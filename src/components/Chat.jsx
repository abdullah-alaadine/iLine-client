import Profile from "../assets/profileImg.webp";
import GroupIcon from "../assets/groupIcon.jpg";
import { format } from "timeago.js";

const Chat = ({ chat, setChat }) => {
  if (!chat.isGroup) {
    return (
      <div
        onClick={() => setChat(chat)}
        className="flex gap-8 p-2 w-full items-center border-b border-slate-500 rounded-lg hover:bg-slate-500 hover:cursor-pointer"
      >
        <img
          className="w-10 sm:w-12 md:w-10  lg:w-12 rounded-full"
          src={chat.members[0].profilePicture ?? Profile}
          alt=""
        />
        <p className="text-xs md:text-sm text-center w-full self-center">
          {chat.members[0].firstName} {chat.members[0].lastName}
        </p>
        <div>
          <p className="text-[8px] w-8 md:text-[9px] lg:text-[10px] text-slate-700">
            {format(chat.updatedAt).slice(0, format(chat.updatedAt).length - 4)}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div
        onClick={() => setChat(chat)}
        className="flex gap-8 p-2 border-slate-500 items-center border-b rounded-lg hover:bg-slate-500 hover:cursor-pointer"
      >
        <img
          className="w-10 sm:w-12 md:w-11 lg:w-12 rounded-full"
          src={chat.groupPicture ?? GroupIcon}
          alt=""
        />
        <p className="text-xs md:text-sm text-center w-full self-center">{chat.name}</p>
        <div>
          <p className="text-[8px] w-8 md:text-[9px] lg:text-[10px] text-slate-700">
            {format(chat.updatedAt).slice(0, format(chat.updatedAt).length - 4)}
          </p>
        </div>
      </div>
    );
  }
};

export default Chat;
