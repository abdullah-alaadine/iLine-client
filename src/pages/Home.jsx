import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import iLineLogo from "../assets/iLine_logo-removebg-preview.png";
import Chat from "../components/Chat";
import ChatBox from "../components/ChatBox";
import { getChats } from "../api/chatsAPI";
import { useSelector } from "react-redux";
import { searchUsers } from "../api/authAPI";
import SearchResult from "../components/SearchResult";
import { groupChatExists } from "../utils/checkChatExistence";
import Pagination from "../components/Pagination";
import GroupList from "../components/GroupList";

const Home = () => {
  const [newGroup, setNewGroup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [chat, setChat] = useState(null);
  const { token } = useSelector((state) => state.authReducer);
  const [chats, setChats] = useState(null);
  const [search, setSearch] = useState(false);
  const searchRef = useRef(null);
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await getChats(token);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChats();
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    window.addEventListener("resize", handleResize);
  }, []);
  const [searchResults, setSearchResults] = useState(null);
  const [groupSearchResults, setGroupSearchResults] = useState([]);

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
    <div className="flex gap-1">
      <div
        style={chat && isMobile ? { display: "none" } : {}}
        className="h-screen bg-slate-400 w-full md:w-1/3 rounded-lg gap-2 flex flex-col"
      >
        <div className="flex relative flex-col items-center xl:flex-row justify-between bg-slate-800 rounded">
          <img src={iLineLogo} className="w-2/3 h-32 object-cover" />
          <div className="search-box flex items-center mr-4 mb-1">
            <input
              type="text"
              placeholder="Search"
              ref={searchRef}
              onChange={handleSearchChange}
              className="p-2 rounded-lg placeholder:text-sm  focus:bg-slate-500 w-full bg-slate-700 bg-transparent border-none outline-none text-white placeholder-white ml-1"
            />
            <FontAwesomeIcon icon={faSearch} className="text-white ml-2" />
          </div>
        </div>
        {!search && !newGroup && (
          <p
            className="ml-8 py-1 px-2 cursor-pointer bg-slate-500 w-fit rounded-lg mt-2"
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
          <div className="relative">
          <button className="absolute mr-3 cursor-pointer right-0" onClick={() => setNewGroup(false)}><FontAwesomeIcon icon={faTimes}/></button>
          <GroupList chats={chats} setChats={setChats} setNewGroup={setNewGroup} />
          </div>
        ) : (
          <div className="bg-slate-400 mx-8 flex flex-col gap-1 p-2 overflow-y-scroll rounded-lg">
            {chats?.map((elem) => {
              return <Chat setChat={setChat} key={elem._id} chat={elem} />;
            })}
          </div>
        )}
      </div>
      <ChatBox chat={chat} setChat={setChat} isMobile={isMobile} />
    </div>
  );
};

export default Home;
