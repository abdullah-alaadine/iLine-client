import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const DeleteOptionsModal = ({ chat, setDeleteOptionsModal }) => {
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
        <div className="hover:bg-slate-600 hover:text-slate-200 p-2">
          {chat.isGroup ? "clear messages" : "delete chat"}
        </div>
      </div>
        <FontAwesomeIcon icon={faTimes} onClick={() => setDeleteOptionsModal(false)} className="p-1 rounded-full hover:bg-slate-600" />
    </div>
  );
};

export default DeleteOptionsModal;
