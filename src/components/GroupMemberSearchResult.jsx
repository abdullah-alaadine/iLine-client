import Profile from "../assets/profileImg.webp";
import { memberExists } from "../utils/checkUserExistence";

const GroupMemberSearchResult = ({ searchResult, onClickHandler, group }) => {
  const user = memberExists(group, searchResult);

  return (
    <div
      onClick={user ? null : () => onClickHandler(searchResult)}
      className={
        "flex gap-8 p-2 items-center border-b border-slate-500 overflow-y-scroll rounded-lg " +
        (user ? " bg-gray-300" : " hover:bg-slate-500 hover:cursor-pointer")
      }
    >
      <img
        className="w-12 sm:w-14 border-2 border-slate-800 md:w-15 rounded-full"
        src={searchResult.profilePic ?? Profile}
        alt=""
      />
      <p className="text-base text-center w-full self-center">
        {searchResult.firstName} {searchResult.lastName}{" "}<br/>
        {user ? <span className="text-xs "> (already added) </span> : ""}
      </p>
    </div>
  );
};

export default GroupMemberSearchResult;
