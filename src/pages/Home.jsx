import React, { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import { getChats } from "../api/chatsAPI";
import ChatsList from "../components/ChatsList";
import { useSelector } from "react-redux";

const Home = () => {
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
