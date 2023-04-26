import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

export const uploadImage = async (userOrChatId, img) => {
    try {
      const imgRef = ref(storage, `images/${userOrChatId}`);
      const snapShot = await uploadBytesResumable(imgRef, img);
      const url = await getDownloadURL(imgRef);
      console.log(url)
      return url;
    } catch (error) {
      throw new Error(error.message);
    }
  };
