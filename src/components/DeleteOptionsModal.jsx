import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { clearChat } from "../api/chatsAPI";
import { useSelector } from "react-redux";

const DeleteOptionsModal = ({
  chat,
  setDeleteOptionsModal,
  setChats,
  chats,
  setChat,
}) => {
  const { token } = useSelector((state) => state.authReducer);
  const handleClearChat = async () => {
    try {
      const { data } = await clearChat(chat._id, token);
      if (!chat.isGroup) {
        setChats(chats.filter((elem) => elem._id !== data._id));
        setChat(null);
      } else {
        setChats(chats.map((elem) => (elem._id === data._id ? data : elem)));
        setChat(null);
      }
      setDeleteOptionsModal(false);
    } catch (error) {}
  };

  return (
    <div
      className="absolute flex justify-between p-2 rounded-lg right-[10%] z-10 text-slate-700 bg-slate-200"
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        {chat.isGroup && (
          <div className="border-b border-slate-800 hover:bg-slate-600 p-2 hover:text-slate-200">
            leave group
          </div>
        )}
        <div
          className="hover:bg-slate-600 hover:text-slate-200 p-2"
          onClick={handleClearChat}
        >
          {chat.isGroup ? "clear messages" : "delete chat"}
        </div>
      </div>
      <FontAwesomeIcon
        icon={faTimes}
        onClick={() => setDeleteOptionsModal(false)}
        className="p-1 rounded-full hover:bg-slate-600"
      />
    </div>
  );
};

export default DeleteOptionsModal;
