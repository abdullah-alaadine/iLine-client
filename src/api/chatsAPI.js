import axios from 'axios'

const authAPI = axios.create({ baseURL: 'http://localhost:4000/chat' });

export const getChats = token => authAPI.get('', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});