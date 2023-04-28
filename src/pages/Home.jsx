import React, { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import { getChat, getChats } from "../api/chatsAPI";
import ChatsList from "../components/ChatsList";
import { useSelector } from "react-redux";
import { reloadIfTokenIsNoLongerValid } from "../utils/checkToken";
import { socket } from "../utils/initializeSocketConnection";
import { ToastContainer, toast } from "react-toastify";
import { chatExists } from "../utils/checkUserExistence";

const Home = () => {
  const { _id } = useSelector((state) => state.authReducer.user);

  window.addEventListener("click", () => {
    reloadIfTokenIsNoLongerValid();
  });

  const [isMobile, setIsMobile] = useState(false);
  const [chat, setChat] = useState(null);
  const [chats, setChats] = useState(null);
  const { token } = useSelector((state) => state.authReducer);
  const [counter, setCounter] = useState(0);
  const [clearedChats, setClearedChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await getChats(token);
        setChats(data.updatedChats);
        setClearedChats(data.clearedChats);
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
        setChats(data.updatedChats);
        setClearedChats(data.clearedChats);
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
    const chatExist = chatExists(chats, { _id: chatId });
    if (!chatExist) {
      try {
        const { data } = await getChat(chatId, token);
        setChats(
          [...chats, data].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          )
        );
      } catch (error) {}
    } else {
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
      } catch (error) {}
    }
  });

  useEffect(() => {
    reloadIfTokenIsNoLongerValid();
    socket.emit("online", { userId: _id });
    socket.on("groupDeleted", ({ adminName, chatName, chatId }) => {
      toast.info(`${chatName} was deleted by ${adminName}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setChats(chats?.filter((elem) => elem._id != chatId));
      if (chat?._id == chatId) setChat(null);
    });
  }, []);

  useEffect(() => {
    socket.on("groupUpdated", async ({ groupId }) => {
      try {
        const { data } = await getChat(groupId, token);
        if (chats) {
          setChats(
            chats
              .map((elem) => (elem._id == groupId ? data : elem))
              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          );
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, [chats]);

  useEffect(() => {
    clearedChats.forEach((elem) => socket.emit("joinRoom", { chatId: elem }));
  }, [clearedChats]);

  return (
    <div className="flex">
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
