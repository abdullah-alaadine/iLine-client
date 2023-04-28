import React, { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import { getChats } from "../api/chatsAPI";
import ChatsList from "../components/ChatsList";
import { useSelector } from "react-redux";
import { reloadIfTokenIsNoLongerValid } from "../utils/checkToken";
import { socket } from "../utils/initializeSocketConnection";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const { _id } = useSelector((state) => state.authReducer.user);

  useEffect(() => {
    reloadIfTokenIsNoLongerValid();
    socket.emit("online", { userId: _id });
  }, []);

  window.addEventListener("click", () => {
    reloadIfTokenIsNoLongerValid();
  });

  const [isMobile, setIsMobile] = useState(false);
  const [chat, setChat] = useState(null);
  const [chats, setChats] = useState(null);
  const { token } = useSelector((state) => state.authReducer);
  const [counter, setCounter] = useState(0);

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
  }, [counter]);

  socket.on("fetchNewRooms", () => {
    setCounter(counter + 1);
  });
  
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

  const [notification, setNotification] = useState(null);
  useEffect(() => {
    socket.on("notification", ({ name, chatId }) => {
      toast.info(`you have a new message from ${name}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setNotification(chatId);
    });
  }, []);

  socket.on("receiveMessage", async ({ chatId, name }) => {
    try {
      setChats(
        chats
          ?.map((elem) =>
            elem._id === chatId
              ? {
                  ...elem,
                  updatedAt: new Date().getTime(),
                  lastMessage: new Date().getTime(),
                }
              : elem
          )
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
      <div
        onClick={
          chats
            ? () =>
                setChat(...chats.filter((elem) => elem._id === notification))
            : null
        }
      >
        {notification === chat?._id ? null : (
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        )}
      </div>
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
