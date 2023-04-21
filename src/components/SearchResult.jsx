import { useSelector } from "react-redux";
import { createChat } from "../api/chatsAPI";
import Profile from "../assets/profileImg.webp";

const SearchResult = ({ searchResult, setSearch, setChats, chats }) => {
  const { token } = useSelector((state) => state.authReducer);
  const handleNewChat = async () => {
    setSearch(false);
    try {
      const {data} = await createChat({ members: [searchResult._id] }, token);
      setChats([...chats, data].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div
      onClick={handleNewChat}
      className="flex gap-8 p-2 items-center border-b border-slate-500 rounded-lg hover:bg-slate-500 hover:cursor-pointer"
    >
      <img
        className="w-12 sm:w-14 md:w-15 rounded-full"
        src={searchResult.profilePic ?? Profile}
        alt=""
      />
      <p className="text-base text-center w-full self-center">
        {searchResult.firstName} {searchResult.lastName}
      </p>
    </div>
  );
};

export default SearchResult;
