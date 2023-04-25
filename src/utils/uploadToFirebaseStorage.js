import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

export const uploadImage = async (userId, img) => {
    try {
      const imgRef = ref(storage, `images/${userId}`);
      const snapShot = await uploadBytesResumable(imgRef, img);
      const url = await getDownloadURL(imgRef);
      return url;
    } catch (error) {
      throw new Error(error.message);
    }
  };
