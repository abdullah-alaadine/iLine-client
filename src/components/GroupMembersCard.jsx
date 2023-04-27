import { useSelector } from "react-redux";
import GroupIcon from "../assets/groupIcon.jpg";
import GroupList from "./GroupList";
import GroupDetails from "./GroupDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

const GroupMembersCard = ({ chat, chats, setChat, setChats, setGroupCard }) => {
  const { _id } = useSelector((state) => state.authReducer.user);
  const imageRef = useRef(null);
  const [groupImage, setGroupImage] = useState(null);
  const setImageHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      setGroupImage(image);
    }
  };
  return (
    <div
      className="absolute overflow-y-scroll w-full flex flex-col items-center gap-2 bg-slate-600 p-4 m-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative">
        <input
          className="hidden"
          type="file"
          ref={imageRef}
          onChange={setImageHandler}
          accept="image/*"
        />
        <FontAwesomeIcon
          onClick={() => imageRef.current.click()}
          icon={faImage}
          className="absolute bottom-0 left-4 h-6 cursor-pointer bg-slate-400 p-1 rounded-full"
        />
        <img
          src={
            groupImage
              ? URL.createObjectURL(groupImage)
              : chat.groupPicture ?? GroupIcon
          }
          className="w-40 border-2 border-slate-800 rounded-full"
        />
      </div>
      {_id === chat.groupAdmin ? (
        <GroupList
          groupPicture={groupImage}
          chat={chat}
          chats={chats}
          setChat={setChat}
          setChats={setChats}
          setGroupCard={setGroupCard}
        />
      ) : (
        <GroupDetails
          chats={chats}
          setChat={setChat}
          chat={chat}
          setChats={setChats}
        />
      )}
    </div>
  );
};

export default GroupMembersCard;
