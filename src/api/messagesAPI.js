import axios from "axios";

const messageAPI = axios.create({ baseURL: "https://iline-server.onrender.com/message" });

export const getMessages = (chatId, token) =>
  messageAPI.get(`/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const postMessage = (chatId, messageText, token) =>
  messageAPI.post(
    "/",
    { chatId, messageText },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
