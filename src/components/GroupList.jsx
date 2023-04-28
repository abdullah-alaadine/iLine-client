import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { createChat, deleteGroup, updateChat } from "../api/chatsAPI";
import { useSelector } from "react-redux";
import { searchUsers } from "../api/authAPI";
import GroupMemberSearchResult from "./GroupMemberSearchResult";
import Pagination from "./Pagination";
import { memberExists } from "../utils/checkUserExistence";
import { uploadImage } from "../utils/uploadToFirebaseStorage";
import { socket } from "../utils/initializeSocketConnection";
import DeleteGroupModal from "./DeleteGroupModal";

const GroupList = ({
  chat,
  chats,
  setChat,
  setChats,
  newGroup,
  setNewGroup,
  setGroupCard,
  groupPicture,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { token } = useSelector((state) => state.authReducer);
  const [searchResults, setSearchResults] = useState([]);
  const [group, setGroup] = useState(chat?.members ?? []);
  const searchRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(chat?.name ?? "");
  const [deleteGroupModal, setDeleteGroupModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const handleCreateGroupChat = async () => {
    setCreateLoading(true);
    try {
      const members = group.map((user) => user._id);
      const { data } = await createChat(
        { members, name: name, isGroup: true },
        token
      );
      setChats(
        [...chats, data].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        )
      );
      socket.emit("newRoom", { members: data.members.map((user) => user._id) });
      setChat(data);
      setNewGroup(false);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
    setCreateLoading(false);
  };
  const onGroupMemberSearchResultClick = (newMember) => {
    if (!memberExists(group, newMember)) {
      setGroup([...group, newMember]);
      setSearch(false);
      setSearchResults([]);
    }
    searchRef.current.value = "";
  };

  const handleEditGroupChat = async () => {
    const members = group.map((user) => user._id);
    let url;
    setLoading(true);
    try {
      if (groupPicture) {
        url = await uploadImage(chat._id, groupPicture);
      }
      const { data } = await updateChat(
        chat._id,
        {
          groupPicture: url,
          name,
          members,
        },
        token
      );
      setChats(chats.map((elem) => (elem._id == data._id ? data : elem)));
      setChat(data);
      setGroupCard(false);
      setLoading(false);
      toast("Group updated successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      setLoading(false);
      if (error.response) {
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const [search, setSearch] = useState(false);
  const handleSearchChange = async () => {
    if (searchRef.current.value) {
      setSearch(true);
      try {
        const { data } = await searchUsers(
          { name: searchRef.current.value },
          token
        );
        setSearchResults(data);
      } catch (error) {}
    } else {
      setSearch(false);
    }
  };

  const onPageChange = async (idx) => {
    setCurrentPage(idx);
    try {
      const { data } = await searchUsers(
        { name: searchRef.current.value, page: idx },
        token
      );
      setSearchResults(data);
    } catch (error) {}
  };

  const handleDeleteGroup = async () => {
    try {
      const { data } = await deleteGroup(chat._id, token);
      setChats(chats.filter((elem) => elem._id != data._id));
      setChat(null);
    } catch (error) {}
  };

  return (
    <div className="flex flex-col gap-2 items-center overflow-y-scroll">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Group Name"
        className="bg-slate-100 text-sm md:text-base rounded-lg py-1 px-3 focus:outline-none focus:bg-slate-600 focus:text-slate-100"
      />
      {deleteGroupModal && (
        <DeleteGroupModal
          onCloseModal={() => setDeleteGroupModal(false)}
          onDeleteGroup={handleDeleteGroup}
        />
      )}
      <div className="flex flex-wrap">
        {group.map((member) => (
          <div
            key={member._id}
            className="flex gap-8 p-2 items-center text-sm md:text-base border-b border-r border-slate-500 rounded-lg hover:bg-slate-500"
          >
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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <input
        type="text"
        ref={searchRef}
        placeholder="Add User"
        className="bg-slate-100 rounded-lg py-1 px-3 text-sm md:text-base focus:outline-none focus:bg-slate-600 focus:text-slate-100"
        onChange={handleSearchChange}
      />
      <div className="overflow-y-scroll flex flex-col gap-2">
        {search &&
          searchResults?.users?.map((searchResult) => (
            <GroupMemberSearchResult
              onClickHandler={onGroupMemberSearchResultClick}
              key={searchResult._id}
              searchResult={searchResult}
              group={group}
            />
          ))}
      </div>
      {searchResults?.totalPages > 1 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={searchResults.totalPages}
          onPageChange={(newMember) => onPageChange(newMember)}
        />
      ) : (
        ""
      )}
      <button
        onClick={
          chat?.members?.length ? handleEditGroupChat : handleCreateGroupChat
        }
        className=" bg-slate-700 w-fit py-1 px-2 rounded-lg text-slate-100 text-sm md:text-base hover:bg-slate-100 hover:text-slate-700"
      >
        {chat
          ? loading
            ? "updating.."
            : "Update Group"
          : createLoading
          ? "creating.."
          : "Create Group"}
      </button>
      {!newGroup && (
        <button
          className=" bg-slate-700 w-fit py-1 px-2 text-sm md:text-base rounded-lg text-slate-100 hover:bg-slate-100 hover:text-slate-700"
          onClick={() => setDeleteGroupModal(true)}
        >
          Delete Group
        </button>
      )}
    </div>
  );
};

export default GroupList;
