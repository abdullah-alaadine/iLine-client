import axios from "axios";

const authAPI = axios.create({ baseURL: "https://iline-server.onrender.com/user" });

export const logIn = (formData) => authAPI.post("/login", formData);
export const signUp = (formData) => authAPI.post("/signup", formData);
export const searchUsers = (data, token) =>
  authAPI.get("/search", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...data,
    },
  });
export const updateProfile = (data, token) =>
  authAPI.put("/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
