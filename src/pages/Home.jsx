import React, { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import { getChat, getChats } from "../api/chatsAPI";
import ChatsList from "../components/ChatsList";
import { useSelector } from "react-redux";
import { reloadIfTokenIsNoLongerValid } from "../utils/checkToken";
import { socket } from "../utils/initializeSocketConnection";

const Home = () => {
  useEffect(() => reloadIfTokenIsNoLongerValid(), []);
  window.addEventListener("click", () => {
    reloadIfTokenIsNoLongerValid();
  });
  const [isMobile, setIsMobile] = useState(false);
  const [chat, setChat] = useState(null);
  const [chats, setChats] = useState(null);
  const { token } = useSelector((state) => state.authReducer);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await getChats(token);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChats();
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  socket.on("receiveMessage", async ({chatId}) => {
    try {
      setChats(
        chats
          ?.map((elem) => (elem._id === chatId ? {...elem, updatedAt: new Date().getTime(), lastMessage: new Date().getTime()} : elem))
          ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      );
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="flex gap-1">
      <ChatsList
        chat={chat}
        setChat={setChat}
        isMobile={isMobile}
        chats={chats}
        setChats={setChats}
      />
      <ChatBox
        chat={chat}
        setChat={setChat}
        isMobile={isMobile}
        setChats={setChats}
        chats={chats}
      />
    </div>
  );
};

export default Home;
