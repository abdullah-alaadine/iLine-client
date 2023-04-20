import Profile from '../assets/profileImg.webp'
import GroupIcon from '../assets/groupIcon.jpg'

const Chat = ({chat, setChat}) => {

  if(!chat.isGroup){
    return (
      <div
        onClick={() => setChat(chat)}
        className="flex gap-8 p-2 border-slate-500 rounded-lg hover:bg-slate-500 hover:cursor-pointer"
      >
        <img className="w-12 sm:w-14 md:w-15 rounded-full" src={chat.members[0].profilePic ?? Profile} alt="" />
        <p className="text-base text-center w-full self-center">
          {chat.members[0].firstName} {chat.members[0].lastName}
        </p>
      </div>
    );
  }else{
    return (
      <div
        onClick={() => setChat(chat)}
        className="flex gap-8 p-2 border-slate-500 rounded-lg hover:bg-slate-500 hover:cursor-pointer"
      >
        <img className="w-12 sm:w-14 md:w-15 rounded-full" src={chat.profilePic ?? GroupIcon} alt="" />
        <p className="text-base text-center w-full self-center">
          {chat.name}
        </p>
      </div>
    )
  }
};

export default Chat;
