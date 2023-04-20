import axios from 'axios'

const authAPI = axios.create({ baseURL: 'http://localhost:4000/message' });

export const getMessages = (chatId, token) => authAPI.get(`/${chatId}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});