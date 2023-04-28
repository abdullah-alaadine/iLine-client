import { useState } from "react";
import { socket } from "../utils/initializeSocketConnection";
import { useSelector } from "react-redux";

function DeleteGroupModal({ onDeleteGroup, onCloseModal, chat }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { firstName, lastName } = useSelector(
    (state) => state.authReducer.user
  );
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    await onDeleteGroup();
    setIsDeleting(false);
    onCloseModal();
    socket.emit("deleteGroup", {
      chatId: chat._id,
      chatName: chat.name,
      adminName: firstName + " " + lastName,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-slate-800 bg-opacity-75 text-xs">
      <div className="bg-slate-100 rounded-lg p-4">
        <div className="text-sm md:text-base font-medium text-slate-800 mb-2">
          Are you sure you want to delete this group?
        </div>
        <div className="text-xs md:text-sm text-slate-600 mb-4">
          This action cannot be undone.
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 text-sm md:text-base font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            onClick={onCloseModal}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className="bg-slate-700 w-fit md:py-1 px-1 md:px-2 text-sm md:text-base rounded-lg text-slate-100 hover:bg-slate-100 hover:text-slate-700 focus:outline-slate-700 outline"
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteGroupModal;
