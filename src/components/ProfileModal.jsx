import Profile from "../assets/profileImg.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import {storage} from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const ProfileModal = ({ user }) => {
  const [profileImage, setProfileImage] = useState(null);
  const imageRef = useRef(null);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const setImageHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      setProfileImage(image);
    }
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute border-2 border-slate-300 bg-slate-500 rounded-lg w-[92%] md:w-[60%] gap-2 flex flex-col items-center p-2 mt-2"
    >
      <div className="relative">
        <FontAwesomeIcon
          onClick={() => imageRef.current.click()}
          icon={faImage}
          className="absolute bottom-0 left-2 cursor-pointer bg-slate-400 p-1 rounded-full"
        />
        <img
          src={
            profileImage
              ? URL.createObjectURL(profileImage)
              : user.profilePicture ?? Profile
          }
          className="rounded-full w-16 sm:w-20"
        />
        <input
          className="hidden"
          type="file"
          ref={imageRef}
          onChange={setImageHandler}
          accept="image/*"
        />
      </div>
      <p className="text-xs sm:text-sm">
        {user.firstName + " " + user.lastName}
      </p>
      <div className="flex w-[80%]">
        <input
          type="text"
          className="w-full text-center focus:outline-none rounded-r-none rounded-md"
          value={fName || user.firstName}
          onChange={(e) => setFName(e.target.value)}
        />
        <input
          type="text"
          className="w-full text-center focus:outline-none rounded-l-none rounded-md"
          value={lName || user.lastName}
          onChange={(e) => setLName(e.target.value)}
        />
      </div>
      <p className="text-xs sm:text-sm text-slate-800">{user.email}</p>
      <button
        className=" bg-slate-700 w-fit py-1 px-2 rounded-lg text-slate-100 hover:bg-slate-100 hover:text-slate-700"
        onClick={() => {}}
      >
        update profile
      </button>
    </div>
  );
};

export default ProfileModal;
