import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { createChat, updateChat } from "../api/chatsAPI";
import { useSelector } from "react-redux";

const GroupList = ({ chat, chats, setChats, setNewGroup }) => {
  const { token } = useSelector((state) => state.authReducer);
  const nameRef = useRef(null);
  const [group, setGroup] = useState(chat?.members ?? []);

  const handleCreateGroupChat = async () => {
    try {
      const { data } = await createChat(group, token);
      setChats(
        [...chats, data].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        )
      );
      setNewGroup(false)
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditGroupChat = async () => {
    try {
      const { data } = await updateChat(chat._id, {
        name: nameRef.current.value,
        members: group,
      }, token);
      setChats(chats.map(obj => data._id === obj._id ? {...data} : obj))
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <input
        ref={nameRef}
        type="text"
        placeholder="Group Name"
        className="bg-slate-100 rounded-lg py-1 px-3 focus:outline-none focus:bg-slate-600 focus:text-slate-100"
      />
      <div className="flex flex-wrap">
        {group.map((member) => (
          <div key={member.id} className="flex gap-8 p-2 items-center border-b border-r border-slate-500 rounded-lg hover:bg-slate-500">
            <p className="text-center text-xs md:text-sm w-full self-center">
              {member.firstName} {member.lastName}
            </p>
            <FontAwesomeIcon
              icon={faTimes}
              className="hover:cursor-pointer"
              onClick={() => setGroup(group.filter((elem) => elem !== member))}
            />
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Add User"
        className="bg-slate-100 rounded-lg py-1 px-3 focus:outline-none focus:bg-slate-600 focus:text-slate-100"
      />
      <button
        onClick={
          chat?.members.length ? handleEditGroupChat : handleCreateGroupChat
        }
        className=" bg-slate-700 w-fit py-1 px-2 rounded-lg text-slate-100 hover:bg-slate-100 hover:text-slate-700"
      >
        Create Group
      </button>
    </div>
  );
};

export default GroupList;
