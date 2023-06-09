import axios from "axios";

const chatAPI = axios.create({ baseURL: import.meta.env.VITE_SERVER_URL + "/chat" });

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

export const updateChat = (chatId, data, token) =>
  chatAPI.put(`/${chatId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); // data : {members: [id], name: String}

export const getChat = (chatId, token) =>
  chatAPI.get(`/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const clearChat = (chatId, token) =>
  chatAPI.delete(`/clear/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const leaveGroup = (chatId, token) =>
  chatAPI.put(`/leave/${chatId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteGroup = (chatId, token) =>
  chatAPI.delete(`/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
