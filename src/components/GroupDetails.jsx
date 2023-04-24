import Profile from "../assets/profileImg.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const GroupDetails = ({chat}) => {
  return (
    <div className="w-full flex flex-col items-center gap-2">
        <p>{chat.name}</p>
        <div className="w-full">{chat.members.map(elem => {
            return (<div key={elem._id} className="flex bg-slate-400 px-4 py-1 items-center rounded-lg justify-between w-full">
                <img src={elem.profilePicture ?? Profile} className="w-10 sm:w-12 md:w-10  lg:w-12 rounded-full" />
                <p className="">{elem.firstName} {elem.lastName}</p>
                <FontAwesomeIcon icon={faComment} className=" cursor-pointer"/>
            </div>)
        })}</div>
    </div>
  )
}

export default GroupDetails