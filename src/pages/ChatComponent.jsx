// import React, { useEffect, useState, useRef } from "react";
// import { ArrowLeft, User } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { io } from "socket.io-client";

// // Backend socket
// const socket = io("https://astro-talk-backend.onrender.com", { transports: ["websocket"] });

// const ChatComponent = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputMsg, setInputMsg] = useState("");
//   const messagesEndRef = useRef(null);

//   const userId = localStorage.getItem("userId");

//   // Scroll to bottom
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // 🔹 Socket listener for new messages
//   // useEffect(() => {
//   //   if (!userId) return;
//   //   // Register logged-in user
//   //   socket.emit("loggedInUsers", { userId });
//   //   // Define listener
//   //   const handleNewMessage = (msg) => {
//   //     if (
//   //       (msg.senderId === userId && msg.receiverId === selectedUser?.id) ||
//   //       (msg.receiverId === userId && msg.senderId === selectedUser?.id)
//   //     ) {
//   //       setMessages((prev) => [...prev, msg]);
//   //       setTimeout(scrollToBottom, 100);
//   //     }
//   //   };
//   //   // Attach listener
//   //   socket.on("newMessage", handleNewMessage);
//   //   // Cleanup to prevent duplicates
//   //   return () => {
//   //     socket.off("newMessage", handleNewMessage);
//   //   };
//   // }, [userId, selectedUser]);

//   // 🔹 Socket listener for new messages
//   useEffect(() => {
//     if (!userId) return;

//     socket.emit("loggedInUsers", { userId });

//     const handleNewMessage = (msg) => {
//       if (
//         (msg.senderId === userId && msg.receiverId === selectedUser?.id) ||
//         (msg.receiverId === userId && msg.senderId === selectedUser?.id)
//       ) {
//         setMessages((prev) => {
//           // If DB version arrives (has _id), replace optimistic one
//           if (msg._id) {
//             const withoutOptimistic = prev.filter(
//               (m) =>
//                 !(
//                   m.message === msg.message &&
//                   m.senderId === msg.senderId &&
//                   m.receiverId === msg.receiverId &&
//                   !m._id // remove the one without _id
//                 )
//             );
//             return [...withoutOptimistic, msg];
//           }

//           // If optimistic message already exists, skip
//           const exists = prev.some(
//             (m) =>
//               m.message === msg.message &&
//               m.senderId === msg.senderId &&
//               m.receiverId === msg.receiverId &&
//               !m._id // only skip if optimistic duplicate
//           );
//           if (exists) return prev;

//           return [...prev, msg];
//         });

//         setTimeout(scrollToBottom, 100);
//       }
//     };


//     socket.on("newMessage", handleNewMessage);

//     return () => {
//       socket.off("newMessage", handleNewMessage);
//     };
//   }, [userId, selectedUser]);


//   // 🔹 Fetch chat list
//   useEffect(() => {
//     const fetchChatList = async () => {
//       if (!userId) return;
//       try {
//         const res = await axios.post(`https://astro-talk-backend.onrender.com/listAstroChat/${userId}`);
//         if (res.data.status) {
//           setUsers(res.data.data);
//         }
//       } catch (err) {
//         console.error("Error fetching chat list:", err);
//       }
//     };
//     fetchChatList();
//   }, [userId]);

//   // 🔹 Fetch messages for selected user
//   const fetchMessages = async (astroId) => {
//     try {
//       const res = await axios.post(`https://astro-talk-backend.onrender.com/getMessage/${astroId}`, {
//         currentLogginId: userId,
//       });
//       if (res.data && Array.isArray(res.data.messages)) {
//         setMessages(res.data.messages);
//         setTimeout(scrollToBottom, 100);
//       }
//     } catch (err) {
//       console.error("Error fetching messages:", err);
//     }
//   };

//   // Auto-select user if coming from route
//   useEffect(() => {
//     if (location.state?.user) {
//       setSelectedUser(location.state.user);
//       fetchMessages(location.state.user.id);
//     }
//   }, [location.state]);

//   // Select user manually
//   const handleSelectUser = (user) => {
//     setSelectedUser(user);
//     fetchMessages(user.id);
//   };


//   const handleSendMessage = async () => {
//     if (!inputMsg.trim() || !selectedUser) return;

//     const newMsg = {
//       senderId: userId,
//       receiverId: selectedUser.id,
//       message: inputMsg,
//       createdAt: new Date(),
//     };

//     // Local update
//     // setMessages((prev) => [...prev, newMsg]);
//     setInputMsg("");
//     scrollToBottom();

//     // Emit socket
//     socket.emit("sendMessage", newMsg);

//     try {
//       await axios.post(`https://astro-talk-backend.onrender.com/sendMessage/${selectedUser.id}`, {
//         message: inputMsg,
//         currentLoginId: userId,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };


//   console.log("this is the chat data,", messages);

//   // Sidebar view
//   if (!selectedUser) {
//     return (
//       <div className="h-full flex items-center justify-center">
//         <div className=" w-[99%] bg-white shadow-lg h-full rounded-xl">
//           <div className="p-4 border-b-4 flex justify-between">
//             <button
//               onClick={() => navigate("/user-dashboard")}
//               className="p-2 rounded-full hover:bg-gray-200"
//             >
//               <ArrowLeft size={20} />
//             </button>
//             <h2 className="text-lg font-bold">Chat History</h2>
//             <div></div>
//           </div>
//           <ul>
//             {users.length ? (
//               users.map((user) => (
//                 <li
//                   key={user.id}
//                   onClick={() => handleSelectUser(user)}
//                   className="flex items-center gap-3 p-3 hover:bg-gray-200 cursor-pointer border-b-4"
//                 >
//                   <img
//                     src={user.img || "/placeholder.png"}
//                     alt={user.name}
//                     className="w-10 h-10 rounded-full"
//                   />
//                   <span className="font-medium">{user.name}</span>
//                 </li>
//               ))
//             ) : (
//               <li className="p-4 text-center text-gray-500">No chats yet.</li>
//             )}
//           </ul>
//         </div>
//       </div>
//     );
//   }

//   // Chat window
//   return (
//     <div className="flex flex-col h-screen w-full md:w-[98%] mx-auto bg-white shadow-lg">
//       {/* Header */}

//       <div className="flex items-center p-4 border-b bg-white shadow sticky top-0 z-10">
//         <button
//           onClick={() => setSelectedUser(null)}
//           className="p-2 rounded-full hover:bg-gray-200"
//         >
//           <ArrowLeft size={20} />
//         </button>

//         {selectedUser.img ? (
//           <img
//             src={selectedUser.img}
//             alt={selectedUser.name}
//             className="w-10 h-10 rounded-full ml-3"
//           />
//         ) : (
//           <div className="w-10 h-10 ml-3 rounded-full bg-gray-200 flex items-center justify-center">
//             <User size={24} className="text-gray-600" />
//           </div>
//         )}

//         <h2 className="font-bold text-lg ml-3">{selectedUser.name}</h2>
//       </div>


//       {/* Messages */}
//       <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2 bg-gray-50">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-2 rounded-lg max-w-xs ${msg.senderId === userId
//               ? "bg-blue-500 text-white self-end"
//               : "bg-gray-300 text-black self-start"
//               }`}
//           >
//             {msg.message}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="flex p-3 border-t bg-white sticky bottom-0 z-10">
//         <input
//           type="text"
//           value={inputMsg}
//           onChange={(e) => setInputMsg(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <button
//           onClick={handleSendMessage}
//           className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
//         >
//           Send
//         </button>
//       </div>
//     </div>

//   );
// };

// export default ChatComponent;














































import React, { useEffect, useState, useRef } from "react";
import { ArrowLeft, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

// Backend socket
const socket = io("https://astro-talk-backend.onrender.com", { transports: ["websocket"] });

const ChatComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const [timer, setTimer] = useState(0); // in seconds
  const [sessionId, setSessionId] = useState(null);
  const timerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const userId = localStorage.getItem("userId");

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Socket listener for new messages and chat events
  useEffect(() => {
    if (!userId) return;

    socket.emit("loggedInUsers", { userId });

    socket.on("newMessage", (msg) => {
      if (
        (msg.senderId === userId && msg.receiverId === selectedUser?.id) ||
        (msg.receiverId === userId && msg.senderId === selectedUser?.id)
      ) {
        setMessages((prev) => [...prev, msg]);
        scrollToBottom();
      }
    });

    socket.on("chatEnded", ({ msg }) => {
      alert(msg);
      handleEndChat();
    });

    return () => {
      socket.off("newMessage");
      socket.off("chatStarted");
      socket.off("chatEnded");
    };
  }, [userId, selectedUser]);

  // Fetch chat list
  useEffect(() => {
    const fetchChatList = async () => {
      if (!userId) return;
      try {
        const res = await axios.post(`https://astro-talk-backend.onrender.com/listAstroChat/${userId}`);
        if (res.data.status) setUsers(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchChatList();
  }, [userId]);

  // Fetch messages for selected astro
  const fetchMessages = async (astroId) => {
    try {
      const res = await axios.post(`https://astro-talk-backend.onrender.com/getMessage/${astroId}`, {
        currentLogginId: userId,
      });
      if (res.data && Array.isArray(res.data.messages)) {
        setMessages(res.data.messages);
        scrollToBottom();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Auto select user from route
  useEffect(() => {
    if (location.state?.user) {
      handleSelectUser(location.state.user);
    }
  }, [location.state]);

  // Select user & start chat
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    fetchMessages(user.id);
    setTimer(0);

    // Start session with backend
    socket.emit("startChat", { userId, astroId: user.id });
  };

  // Send message
  const handleSendMessage = async () => {
    if (!inputMsg.trim() || !selectedUser) return;

    const newMsg = {
      senderId: userId,
      receiverId: selectedUser.id,
      message: inputMsg,
      createdAt: new Date(),
    };

    setInputMsg("");
    scrollToBottom();
    socket.emit("sendMessage", newMsg);

    try {
      await axios.post(`https://astro-talk-backend.onrender.com/sendMessage/${selectedUser.id}`, {
        message: inputMsg,
        currentLoginId: userId,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // End chat
  const handleEndChat = () => {
    if (sessionId) {
      socket.emit("endChat", { sessionId });
      setSessionId(null);
    }
    setSelectedUser(null);
    setMessages([]);
    setTimer(0);
    clearInterval(timerRef.current);
  };

  // Format timer mm:ss
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    let interval;

    if (selectedUser) {
      setTimer(0); // reset when user changes
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval); // cleanup on unmount or when selectedUser changes
  }, [selectedUser]);


  // Sidebar
  if (!selectedUser) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className=" w-[99%] bg-white shadow-lg h-full rounded-xl">
          <div className="p-4 border-b-4 flex justify-between">
            <button
              onClick={() => navigate("/user-dashboard") }
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-lg font-bold">Chat History</h2>
            <div></div>
          </div>
          <ul>
            {users.length ? (
              users.map((user) => (
                <li
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-200 cursor-pointer border-b-4"
                >
                  <User className="w-10 h-10 rounded-full bg-gray-300 p-3"/>
                  <span className="font-medium">{user.name}</span>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-gray-500">No chats yet.</li>
            )}
          </ul>
        </div>
      </div>
    );
  }

  // Chat window
  return (
    <div className="flex flex-col h-screen w-full md:w-[98%] mx-auto bg-white shadow-lg">
      <div className="flex items-center p-4 border-b bg-white shadow sticky top-0 z-10">
        <button
          onClick={handleEndChat}
          className="p-2 rounded-full hover:bg-gray-200 bg-red-500 "
        >
          <ArrowLeft size={20} />
        </button>

        {selectedUser.img ? (
          <img
            src={selectedUser.img}
            alt={selectedUser.name}
            className="w-10 h-10 rounded-full ml-3"
          />
        ) : (
          <div className="w-10 h-10 ml-3 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={24} className="text-gray-600" />
          </div>
        )}

        <h2 className="font-bold text-lg ml-3">{selectedUser.name}</h2>
        <span className="ml-4 font-medium text-gray-600">Time: {formatTime(timer)}</span>
      </div>

      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-xs ${
              msg.senderId === userId
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-300 text-black self-start"
            }`}
          >
            {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex p-3 border-t bg-white sticky bottom-0 z-10">
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;