import { useSelector } from "react-redux";
import GroupIcon from "../assets/groupIcon.jpg";
import GroupList from "./GroupList";
import GroupDetails from "./GroupDetails";

const GroupMembersCard = ({ chat, chats, setChat, setChats, setGroupCard }) => {
  const { _id } = useSelector((state) => state.authReducer.user);

  return (
    <div
      className="absolute overflow-y-scroll w-full flex flex-col items-center gap-2 bg-slate-600 p-4 m-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={chat.profilePic ?? GroupIcon} className="w-40 rounded-full" />
      {_id === chat.groupAdmin ? (
        <GroupList
          chat={chat}
          chats={chats}
          setChats={setChats}
          setGroupCard={setGroupCard}
        />
      ) : (
        <GroupDetails chats={chats} setChat={setChat} chat={chat} setChats={setChats}/>
      )}
    </div>
  );
};

export default GroupMembersCard;
