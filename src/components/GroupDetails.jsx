import Profile from "../assets/profileImg.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { getUserChat } from "../utils/checkUserExistence";
import { useSelector } from "react-redux";
import { createChat } from "../api/chatsAPI";

const GroupDetails = ({ chat, setChat, chats, setChats }) => {
  const {token} = useSelector(state => state.authReducer);
  const messageGroupMemberHandler = async (_id) => {
    const prevChat = getUserChat(chats, { _id });
    if (prevChat) {
      setChat(prevChat);
    } else {
      try {
        const { data } = await createChat(
          { members: [_id] },
          token
        );
        setChat(data);
        setChats(
          [...chats, data].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          )
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <p className="text-slate-200">{chat.name}</p>
      <p className="text-xs md:text-sm self-start text-slate-200">group members</p>
      <div className="w-full flex flex-col gap-1">
        {chat.members.map((elem) => {
          return (
            <div
              key={elem._id}
              className="flex bg-slate-400 px-4 py-1 items-center rounded-lg justify-between w-full"
            >
              <img
                src={elem.profilePicture ?? Profile}
                className="w-10 sm:w-12 md:w-10 border-2 border-slate-800 lg:w-12 rounded-full"
              />
              <p className="text-slate-800">
                {elem.firstName} {elem.lastName}
              </p>
              <FontAwesomeIcon
                icon={faComment}
                onClick={() => messageGroupMemberHandler(elem._id)}
                className=" cursor-pointer"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupDetails;
