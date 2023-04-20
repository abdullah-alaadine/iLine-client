import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import iLineLogo from "../assets/iLine_logo-removebg-preview.png";
import Chat from "../components/Chat";
import ChatBox from "../components/ChatBox";
import { getChats } from "../api/chatsAPI";
import { useSelector } from "react-redux";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [chat, setChat] = useState(null);
  const {token} = useSelector(state => state.authReducer);
  const [chats, setChats] = useState(null)

  useEffect(() => {
     const fetchChats = async () => {
       try {
         const {data} = await getChats(token); 
         setChats(data);
       } catch (error) {
         console.log(error);
       }
     }
     fetchChats()
  }, [])

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
      <div
        style={chat && isMobile ? { display: "none" } : {}}
        className="h-screen bg-slate-400 w-full md:w-1/3 rounded-lg gap-2 flex flex-col"
      >
        <div className="flex relative flex-col items-center xl:flex-row justify-between bg-slate-700 rounded">
          <img src={iLineLogo} className="w-2/3 h-32" />
          <div className="search-box flex items-center mr-4">
            <input
              type="text"
              placeholder="Search"
              className="p-2 rounded-lg focus:bg-slate-600 w-full bg-slate-900 bg-transparent border-none outline-none text-white placeholder-white ml-1"
            />
            <FontAwesomeIcon icon={faSearch} className="text-white ml-2" />
          </div>
        </div>
        <p className="ml-8 py-1 px-2 cursor-pointer bg-slate-500 w-fit rounded-lg mt-2">
          new group +
        </p>
        <div className="bg-slate-400 mx-8 flex flex-col gap-4 p-2 overflow-y-scroll rounded-lg">
          {chats?.map( elem => {
            return (
              <Chat setChat={setChat} key={elem._id} chat={elem}/>
            );
          })}
        </div>
      </div>
      <ChatBox chat={chat} setChat={setChat} isMobile={isMobile}/>
    </div>
  );
};

export default Home;
