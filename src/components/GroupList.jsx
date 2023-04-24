import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { createChat, updateChat } from "../api/chatsAPI";
import { useSelector } from "react-redux";
import { searchUsers } from "../api/authAPI";
import GroupMemberSearchResult from "./GroupMemberSearchResult";
import Pagination from "./Pagination";
import { memberExists } from "../utils/checkUserExistence";

const GroupList = ({ chat, chats, setChats, setNewGroup }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { token } = useSelector((state) => state.authReducer);
  const [searchResults, setSearchResults] = useState([]);
  const nameRef = useRef(null);
  const [group, setGroup] = useState(chat?.members ?? []);
  const searchRef = useRef(null);
  const handleCreateGroupChat = async () => {
    try {
      const members = group.map((user) => user._id);
      const { data } = await createChat(
        { members, name: nameRef.current.value, isGroup: true },
        token
      );
      setChats(
        [...chats, data].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        )
      );
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
  };
  const onGroupMemberSearchResultClick = (newMember) => {
    if (!memberExists(group, newMember)) {
      setGroup([...group, newMember]);
      setSearch(false);
    }
    searchRef.current.value = "";
  };

  const handleEditGroupChat = async () => {
    const members = group.map((user) => user._id);
    try {
      const { data } = await updateChat(
        chat._id,
        {
          name: nameRef.current.value,
          members,
        },
        token
      );
      setChats(chats.map((obj) => (data._id === obj._id ? { ...data } : obj)));
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
      } catch (error) {
        console.log(error);
      }
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center overflow-y-scroll">
      <input
        ref={nameRef}
        type="text"
        placeholder="Group Name"
        className="bg-slate-100 rounded-lg py-1 px-3 focus:outline-none focus:bg-slate-600 focus:text-slate-100"
      />
      <div className="flex flex-wrap">
        {group.map((member) => (
          <div
            key={member._id}
            className="flex gap-8 p-2 items-center border-b border-r border-slate-500 rounded-lg hover:bg-slate-500"
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
        className="bg-slate-100 rounded-lg py-1 px-3 focus:outline-none focus:bg-slate-600 focus:text-slate-100"
        onChange={handleSearchChange}
      />
      <div className="overflow-y-scroll">
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
        className=" bg-slate-700 w-fit py-1 px-2 rounded-lg text-slate-100 hover:bg-slate-100 hover:text-slate-700"
      >
        Create Group
      </button>
    </div>
  );
};

export default GroupList;
