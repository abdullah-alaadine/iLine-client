import axios from "axios";

const chatAPI = axios.create({ baseURL: "http://localhost:4000/chat" });

export const getChats = (token) =>
  chatAPI.get("", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const createChat = (data, token) =>
  chatAPI.post("/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
