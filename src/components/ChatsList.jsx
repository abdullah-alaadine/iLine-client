import { useRef, useState } from "react";
import iLineLogo from "../assets/iLine_logo-removebg-preview.png";
import { groupChatExists } from "../utils/checkChatExistence";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Chat from "../components/Chat";
import { useSelector } from "react-redux";
import { searchUsers } from "../api/authAPI";
import SearchResult from "../components/SearchResult";
import Pagination from "../components/Pagination";
import GroupList from "../components/GroupList";
import Profile from "../assets/profileImg.webp";
import ProfileModal from "./ProfileModal";

const ChatsList = ({ chat, isMobile, chats, setChat, setChats }) => {
  const [newGroup, setNewGroup] = useState(false);
  const searchRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { token } = useSelector((state) => state.authReducer);
  const [search, setSearch] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [groupSearchResults, setGroupSearchResults] = useState([]);
  const [profileModal, setProfileModal] = useState(false);

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

  const handleSearchChange = async () => {
    if (searchRef.current.value) {
      setSearch(true);
      setGroupSearchResults(groupChatExists(chats, searchRef.current.value));
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
  const { user } = useSelector((state) => state.authReducer);
  return (
    <div
      onClick={() => {
        setProfileModal(false);
        setDeleteOptionsModal(false);
      }}
      style={chat && isMobile ? { display: "none" } : {}}
      className="h-screen bg-slate-400 w-full md:w-1/3 rounded-lg gap-2 flex flex-col"
    >
      <div className="flex relative flex-col items-center justify-between bg-slate-800 rounded ">
        <div
          className="cursor-pointer absolute top-0 left-0 p-1 gap-3 rounded-lg mt-1 ml-1 bg-slate-500 justify-between flex items-center"
          onClick={(e) => {
            e.stopPropagation();
            setProfileModal(true);
          }}
        >
          <img
            src={user.profilePicture ?? Profile}
            className="rounded-full w-7 sm:w-9 md:w-10"
          />
          <p className="text-xs md:text-sm text-slate-200">{user.firstName}</p>
        </div>
        {profileModal && (
          <ProfileModal setProfileModal={setProfileModal} user={user} />
        )}
        <img src={iLineLogo} className="w-2/3 h-32 object-cover" />
        <div className="search-box flex items-center mr-4 mb-1">
          <input
            type="text"
            placeholder="Search Users"
            ref={searchRef}
            onChange={handleSearchChange}
            className="p-2 rounded-lg placeholder:text-sm  focus:bg-slate-600 w-full bg-slate-500 border-none outline-none text-white placeholder-white ml-1"
          />
        </div>
      </div>
      {!search && !newGroup && (
        <p
          className="ml-8 py-1 px-2 text-xs md:text-sm text-center cursor-pointer bg-slate-500 w-fit rounded-lg mt-2"
          onClick={() => setNewGroup(true)}
        >
          new group +
        </p>
      )}
      {search ? (
        <div className="bg-slate-400 mx-8 flex flex-col gap-1 p-2 overflow-y-scroll rounded-lg">
          {search && groupSearchResults[0] && <p>Group Chats</p>}
          {groupSearchResults.length
            ? groupSearchResults.map((groupSearchResult) => (
                <SearchResult
                  key={groupSearchResult._id}
                  groupChat={true}
                  groupSearchResult={groupSearchResult}
                  setChat={setChat}
                  setSearch={setSearch}
                  searchRef={searchRef}
                />
              ))
            : null}
          {searchResults?.length ? "Users" : null}
          {searchResults?.users.map((searchResult) => (
            <SearchResult
              setSearch={setSearch}
              key={searchResult._id}
              searchResult={searchResult}
              setChats={setChats}
              chats={chats}
              setChat={setChat}
              searchRef={searchRef}
              groupChat={false}
            />
          ))}
          {searchResults?.totalPages > 1 ? (
            <Pagination
              onPageChange={onPageChange}
              totalPages={searchResults?.totalPages}
              currentPage={currentPage}
            />
          ) : (
            ""
          )}
        </div>
      ) : newGroup ? (
        <div className="relative overflow-y-scroll">
          <button
            className="absolute mr-3 cursor-pointer right-0"
            onClick={() => setNewGroup(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <GroupList
            chats={chats}
            setChats={setChats}
            setChat={setChat}
            setNewGroup={setNewGroup}
          />
        </div>
      ) : (
        <div className="bg-slate-400 flex w-full flex-col gap-1 p-2 overflow-y-scroll rounded-lg">
          {chats?.map((elem) => {
            return (
              <Chat
                setChat={setChat}
                key={elem._id}
                chat={elem}
                thisChat={chat}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChatsList;
