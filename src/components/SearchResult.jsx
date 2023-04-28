import { useSelector } from "react-redux";
import { createChat } from "../api/chatsAPI";
import Profile from "../assets/profileImg.webp";
import "react-toastify/dist/ReactToastify.css";
import { format } from "timeago.js";
import GroupIcon from "../assets/groupIcon.jpg";
import { userExists, getUserChat } from "../utils/checkUserExistence";

const SearchResult = ({
  searchResult,
  setSearch,
  setChats,
  chats,
  groupChat,
  setChat,
  searchRef,
  groupSearchResult,
}) => {
  const { token } = useSelector((state) => state.authReducer);

  const hanldlePrevChat = () => {
    setSearch(false);
    setChat(groupSearchResult);
    searchRef.current.value = "";
  };

  const handleNewChat = async () => {
    setSearch(false);
    const user = userExists(chats, searchResult);
    searchRef.current.value = "";
    if (user) {
      const userChat = getUserChat(chats, user);
      setChat(userChat);
    } else {
      try {
        const { data } = await createChat(
          { members: [searchResult._id] },
          token
        );
        setChats(
          [...chats, data].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          )
        );
        setChat(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (groupChat) {
    return (
      <div
        onClick={hanldlePrevChat}
        className="flex gap-8 p-2 border-slate-500 items-center border-b rounded-lg hover:bg-slate-500 hover:cursor-pointer"
      >
        <img
          className="w-12 sm:w-14 md:w-15 border-2 border-slate-800 rounded-full"
          src={groupSearchResult.groupPicture ?? GroupIcon}
          alt=""
        />
        <p className="text-base text-center w-full self-center">
          {groupSearchResult.name}
        </p>
        <div>
          <p className="text-[8px] w-8 md:text-[10px] text-slate-700">
            {format(groupSearchResult.updatedAt).slice(
              0,
              format(groupSearchResult.updatedAt).length - 4
            )}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div
        onClick={handleNewChat}
        className="flex gap-8 p-2 items-center border-b border-slate-500 rounded-lg hover:bg-slate-500 hover:cursor-pointer"
      >
        <img
          className="w-12 sm:w-14 md:w-15 border-2 border-slate-800 rounded-full"
          src={searchResult.profilePicture ?? Profile}
          alt=""
        />
        <p className="text-base text-center w-full self-center">
          {searchResult.firstName} {searchResult.lastName}
        </p>
      </div>
    );
  }
};

export default SearchResult;
