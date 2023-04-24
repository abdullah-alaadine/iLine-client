import GroupIcon from "../assets/groupIcon.jpg";

const GroupMembersCard = ({chat}) => {
    return (
      <div className="absolute flex flex-col items-center gap-2 bg-slate-300 p-4 m-auto" onClick={(e) => e.stopPropagation()}>
        <img src={chat.profilePic ?? GroupIcon} className="w-40 rounded-full" />
        <input type="text" value={chat.name}/>
      </div>
    );
};

export default GroupMembersCard;
