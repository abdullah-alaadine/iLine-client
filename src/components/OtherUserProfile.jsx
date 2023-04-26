import Profile from "../assets/profileImg.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const OtherUserProfile = ({chat, setOtherUserProfile}) => {
  return (
    <div className="absolute overflow-y-scroll w-full flex flex-col z-10 items-center gap-2 bg-slate-600 p-4" onClick={e => e.stopPropagation()}>
        <FontAwesomeIcon icon={faTimes} className="absolute right-4 cursor-pointer rounded-full hover:bg-slate-400 p-2" onClick={() => setOtherUserProfile(false)}/>
        <img src={chat.members[0].profilePicture || Profile} className="w-40 border-2 border-slate-800 rounded-full"/>
        <p className='text-slate-900'>{chat.members[0].firstName} {chat.members[0].lastName}</p>
        <p className='text-slate-900 text-sm'>{chat.members[0].email}</p>
        <p className=' mt-2'>{chat.members[0].about}</p>
    </div>
  )
}

export default OtherUserProfile