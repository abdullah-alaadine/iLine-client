import Profile from "../assets/profileImg.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const ProfileModal = ({ user }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute border-2 border-slate-300 bg-slate-500 rounded-lg w-[92%] md:w-[60%] gap-2 flex flex-col items-center p-2 mt-2"
    >
      <div className="relative">
          <FontAwesomeIcon icon={faImage} className="absolute bottom-0 left-2 cursor-pointer bg-slate-400 p-1 rounded-full" />
        <img
          src={user.profilePicture ?? Profile}
          className="rounded-full w-16 sm:w-20"
        />
      </div>
      <p className="text-xs sm:text-sm">
        {user.firstName + " " + user.lastName}
      </p>
      <p className="text-xs sm:text-sm text-slate-800">{user.email}</p>
      <button className=" bg-slate-700 w-fit py-1 px-2 rounded-lg text-slate-100 hover:bg-slate-100 hover:text-slate-700">update profile</button>
    </div>
  );
};

export default ProfileModal;
