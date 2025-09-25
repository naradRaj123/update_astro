import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import {io} from 'socket.io-client';

// connet socket io from backend
const socket = io("http://localhost:8000", {
  autoConnect: false,  
});

const ChatPage = () => {
  useEffect(() => {
    // listen message from backend

    // list of astrologer
    socket.on("onlineAstrologers", (data) => {
        console.log("✅ Online astrologer:", data);
        // console.log(data.onlineAstrolist[0].astro_id)
    });

    // list of users
    socket.on('onlineUsers',(users)=>{
      console.log("✅ Online Users:",users)
    })

    return () => {
      socket.off("receivedMsg");
    };
  }, []);

  const sendMessage = (e) => {   
    e.preventDefault();
    socket.emit("registerUser", {user_id: "rajivsir2001"});
  };

  // disconnect user
  const disconnectUser = () => {
    socket.disconnect();
    console.log("User disconnected manually");
  };

  return (
    <>
      {/* <Navbar /> */}
      <section className="py-16 bg-gray-50 flex justify-content-end">
            <button type="button" onClick={sendMessage}  className="bg-red-500 p-5 mt-[150px]  "  >Chatting</button>
      </section>
      
    </>
  );
};



export default ChatPage