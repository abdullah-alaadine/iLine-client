import Profile from "../assets/profileImg.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSuccess } from "../actions/authActions";
import { uploadImage } from "../utils/uploadToFirebaseStorage";
import { updateProfile } from "../api/authAPI";

const ProfileModal = ({ user, setProfileModal }) => {
  const [profileImage, setProfileImage] = useState(null);
  const imageRef = useRef(null);
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about ?? "");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authReducer);
  const { _id } = useSelector((state) => state.authReducer.user);
  const [loading, setLoading] = useState(false);

  const setImageHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      setProfileImage(image);
    }
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    let url;
    try {
      if (profileImage) {
        url = await uploadImage(_id, profileImage);
      }
      let userData = { firstName, lastName, about, profilePicture: url };
      const { data } = await updateProfile(userData, token);
      dispatch(updateSuccess(data));
      setLoading(false);
      setProfileModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute border-2 border-slate-300 bg-slate-500 rounded-lg w-[92%] md:w-[60%] gap-2 flex flex-col items-center p-2 mt-2"
    >
      <button
        onClick={handleLogout}
        className="disabled:hover:cursor-auto bg-slate-700 w-fit py-1 px-2 rounded-lg text-slate-100 hover:bg-slate-100 hover:text-slate-700"
      >
        Logout
      </button>
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
          className="rounded-full w-16 border-2 border-slate-800 sm:w-20"
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
          value={firstName}
          placeholder="name"
          onChange={(e) => setfirstName(e.target.value)}
        />
        <input
          type="text"
          className="w-full text-center focus:outline-none rounded-l-none rounded-md"
          value={lastName}
          placeholder="family"
          onChange={(e) => setlastName(e.target.value)}
        />
      </div>
      <p className="text-xs sm:text-sm text-slate-800">{user.email}</p>
      <textarea
        value={about}
        className="w-full text-center focus:outline-none rounded-md"
        onChange={(e) => setAbout(e.target.value)}
        placeholder="about"
      />

      <button
        className="disabled:hover:cursor-auto bg-slate-700 w-fit py-1 px-2 rounded-lg text-slate-100 hover:bg-slate-100 hover:text-slate-700"
        onClick={handleUpdateProfile}
        disabled={loading}
      >
        {loading ? "loading.." : "update profile"}
      </button>
    </div>
  );
};

export default ProfileModal;
