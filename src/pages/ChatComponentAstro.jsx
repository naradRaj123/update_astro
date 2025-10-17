// import React, { useEffect, useState, useRef } from "react";
// import { ArrowLeft, User } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { io } from "socket.io-client";



// const socket = io("https://astro-talk-backend.onrender.com"); // backend ka url


// const ChatComponentAstro = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputMsg, setInputMsg] = useState("");
//   const messagesEndRef = useRef(null);

//   const astroUser = JSON.parse(localStorage.getItem("astroUser") || "{}");
//   const astroId = astroUser?._id;

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // 🔹 On Mount: Connect Astro to Socket
//   useEffect(() => {
//     if (astroId) {
//       socket.emit("loggedInAstro", { astroId });
//     }

//     // listen for new incoming messages
//     socket.on("newMessage", (msg) => {
//       if (
//         selectedUser &&
//         (msg.senderId === selectedUser.id || msg.receiverId === selectedUser.id)
//       ) {
//         setMessages((prev) => [...prev, msg]);
//         setTimeout(scrollToBottom, 100);
//       }
//     });
//     return () => {
//       socket.off("newMessage");
//     };
//   }, [astroId, selectedUser]);

//   // 🔹 Fetch chat list
//   useEffect(() => {
//     const fetchChatList = async () => {
//       if (!astroId) return;
//       try {
//         const res = await axios.post(`https://astro-talk-backend.onrender.com/listUserChat/${astroId}`);
//         if (res.data.status) {
//           setUsers(res.data.data);
//         }
//       } catch (err) {
//         console.error("Error fetching chat list:", err);
//       }
//     };
//     fetchChatList();
//   }, [astroId]);

//   // 🔹 Fetch messages with selected user
//   const fetchMessages = async (userId) => {
//     try {
//       const res = await axios.post(`https://astro-talk-backend.onrender.com/getMessage/${userId}`, {
//         currentLogginId: astroId,
//       });
//       if (res.data && Array.isArray(res.data.messages)) {
//         setMessages(res.data.messages || []);
//         setTimeout(scrollToBottom, 100);
//       }
//     } catch (err) {
//       console.error("Error fetching messages:", err);
//     }
//   };

//   // 🔹 Auto-select user from route state
//   useEffect(() => {
//     if (location.state) {
//       setSelectedUser(location.state.user);
//       fetchMessages(location.state.user.id);
//     }
//   }, [location.state]);

//   // 🔹 Select user manually
//   const handleSelectUser = (user) => {
//     setSelectedUser(user);
//     fetchMessages(user.id);
//   };

//   // 🔹 Send message
//   const handleSendMessage = async () => {
//     if (!inputMsg.trim()) return;

//     const newMsg = {
//       senderId: astroId,
//       receiverId: selectedUser.id,
//       message: inputMsg,
//       createdAt: new Date(),
//     };

//     // setMessages((prev) => [...prev, newMsg]);
//     // Emit socket event to server
//     setInputMsg("");
//     scrollToBottom();

//     socket.emit("sendMessage", newMsg);

//     try {

//       await axios.post(

//         `https://astro-talk-backend.onrender.com/sendMessage/${selectedUser.id}`,
//         {
//           message: inputMsg,
//           currentLoginId: astroId,
//         }
//       );
//     } catch (err) {
//       console.error("Error sending message:", err);
//     }
//   };


//   console.log("this is the chat data,", messages);


//   // 🔹 Sidebar
//   if (!selectedUser) {
//     return (
//       <div className="h-full flex items-center justify-center ">
//         <div className="md:w-[98%] w-[99%] bg-white shadow-lg h-full rounded-xl">
//           <div className="p-4 border-b-4 flex justify-between">
//             <button
//               onClick={() => navigate("/astro-dashboard")}
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
//                   {user.img ? (
//                             <img
//                               src={user.img}
//                               alt={user.name}
//                               className="w-10 h-10 rounded-full ml-3"
//                             />
//                           ) : (
//                             <div className="w-10 h-10 ml-3 rounded-full bg-gray-200 flex items-center justify-center">
//                               <User size={24} className="text-gray-600" />
//                             </div>
//                           )}
//                   {/* <img
//                     src={user.img || "/placeholder.png"}
//                     alt={user.name}
//                     className="w-10 h-10 rounded-full"
//                   /> */}
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

//   // 🔹 Chat window
//   return (
//     <div className="flex flex-col h-screen w-full md:w-[98%] mx-auto  bg-white shadow-lg">
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
//             className={`p-2 rounded-lg max-w-xs ${msg.senderId === astroId
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

// export default ChatComponentAstro;


// import React, { useEffect, useState, useRef } from "react";
// import { ArrowLeft, User } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { io } from "socket.io-client";

// // Socket backend
// const socket = io("https://astro-talk-backend.onrender.com");

// const ChatComponentAstro = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputMsg, setInputMsg] = useState("");
//   const [timer, setTimer] = useState(0); // seconds
//   const messagesEndRef = useRef(null);
//   const timerRef = useRef(null);

//   const astroUser = JSON.parse(localStorage.getItem("astroUser") || "{}");
//   const astroId = astroUser?._id;

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // 🔹 Connect Astro and listen messages & chat events
//   useEffect(() => {
//     if (astroId) {
//       socket.emit("loggedInAstro", { astroId });
//     }

//     socket.on("newMessage", (msg) => {
//       if (
//         selectedUser &&
//         (msg.senderId === selectedUser.id || msg.receiverId === selectedUser.id)
//       ) {
//         setMessages((prev) => [...prev, msg]);
//         setTimeout(scrollToBottom, 100);
//       }
//     });

//     // Chat start timer
//     socket.on("chatStarted", ({ userId }) => {
//       console.log("chat started on.")
//       // if (selectedUser && selectedUser.id === userId) {
//       //   setTimer(0);
//       //   clearInterval(timerRef.current);
//       //   timerRef.current = setInterval(() => {
//       //     setTimer((prev) => prev + 1);
//       //   }, 1000);
//       // }
//     });

//     // Chat ended
//     socket.on("chatEnded", ({ userId }) => {
//       if (selectedUser && selectedUser.id === userId) {
//         clearInterval(timerRef.current);
//         setTimer(0);
//         alert("Chat ended by user");
//         setSelectedUser(null);
//       }
//     });

//     return () => {
//       socket.off("newMessage");
//       socket.off("chatStarted");
//       socket.off("chatEnded");
//       clearInterval(timerRef.current);
//     };
//   }, [astroId, selectedUser]);

//   // 🔹 Fetch chat list
//   useEffect(() => {
//     const fetchChatList = async () => {
//       if (!astroId) return;
//       try {
//         const res = await axios.post(
//           `https://astro-talk-backend.onrender.com/listUserChat/${astroId}`
//         );
//         if (res.data.status) setUsers(res.data.data);
//       } catch (err) {
//         console.error("Error fetching chat list:", err);
//       }
//     };
//     fetchChatList();
//   }, [astroId]);

//   // 🔹 Fetch messages with selected user
//   const fetchMessages = async (userId) => {
//     try {
//       const res = await axios.post(
//         `https://astro-talk-backend.onrender.com/getMessage/${userId}`,
//         { currentLogginId: astroId }
//       );
//       if (res.data && Array.isArray(res.data.messages)) {
//         setMessages(res.data.messages || []);
//         setTimeout(scrollToBottom, 100);
//       }
//     } catch (err) {
//       console.error("Error fetching messages:", err);
//     }
//   };

//   // 🔹 Auto select user from route
//   useEffect(() => {
//     if (location.state) {
//       const user = location.state.user;
//       setSelectedUser(user);
//       fetchMessages(user.id);
//       socket.emit("startChat", { userId: user.id, astroId });
//     }
//   }, [location.state, astroId]);

//   // 🔹 Select user manually
//   const handleSelectUser = (user) => {
//     setSelectedUser(user);
//     fetchMessages(user.id);
//     socket.emit("startChat", { userId: user.id, astroId });
//   };

//   // 🔹 Send message
//   const handleSendMessage = async () => {
//     if (!inputMsg.trim()) return;

//     const newMsg = {
//       senderId: astroId,
//       receiverId: selectedUser.id,
//       message: inputMsg,
//       createdAt: new Date(),
//     };

//     setInputMsg("");
//     scrollToBottom();
//     socket.emit("sendMessage", newMsg);

//     try {
//       await axios.post(
//         `https://astro-talk-backend.onrender.com/sendMessage/${selectedUser.id}` ,
//         { message: inputMsg, currentLoginId: astroId }
//       );
//     } catch (err) {
//       console.error("Error sending message:", err);
//     }
//   };

//   // 🔹 End chat
//   const handleEndChat = () => {
//     if (!selectedUser) return;
//     socket.emit("endChat", { userId: selectedUser.id, astroId });
//     clearInterval(timerRef.current);
//     setTimer(0);
//     setSelectedUser(null);
//   };

//   // 🔹 Format timer mm:ss
//   const formatTime = (sec) => {
//     const m = Math.floor(sec / 60).toString().padStart(2, "0");
//     const s = (sec % 60).toString().padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   // 🔹 Sidebar
//   if (!selectedUser) {
//     return (
//       <div className="h-full flex items-center justify-center">
//         <div className="md:w-[98%] w-[99%] bg-white shadow-lg h-full rounded-xl">
//           <div className="p-4 border-b-4 flex justify-between">
//             <button
//               onClick={() => navigate("/astro-dashboard")}
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
//                   {user.img ? (
//                     <img
//                       src={user.img}
//                       alt={user.name}
//                       className="w-10 h-10 rounded-full ml-3"
//                     />
//                   ) : (
//                     <div className="w-10 h-10 ml-3 rounded-full bg-gray-200 flex items-center justify-center">
//                       <User size={24} className="text-gray-600" />
//                     </div>
//                   )}
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

//   // 🔹 Chat window
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
//         {/* <span className="ml-4 font-medium text-gray-600">
//           Time: {formatTime(timer)}
//         </span> */}
//         <button
//           onClick={handleEndChat}
//           className="ml-auto bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
//         >
//           End Chat
//         </button>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2 bg-gray-50">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-2 rounded-lg max-w-xs ${
//               msg.senderId === astroId
//                 ? "bg-blue-500 text-white self-end"
//                 : "bg-gray-300 text-black self-start"
//             }`}
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

// export default ChatComponentAstro;





//////////////////////////////////////////////////////////////

import React, { useEffect, useState, useRef } from "react";
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Video, 
  Image, 
  Smile, 
  Send, 
  Paperclip,
  MoreVertical,
  Tag,
  Clock,
  Mic,
  Camera
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import EmojiPicker from 'emoji-picker-react';

const socket = io("https://astro-talk-backend.onrender.com");

const ChatComponentAstro = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const [timer, setTimer] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [discountOffered, setDiscountOffered] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const timerRef = useRef(null);

  const astroUser = JSON.parse(localStorage.getItem("astroUser") || "{}");
  const astroId = astroUser?._id;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 🔹 Connect Astro and listen messages & chat events
  useEffect(() => {
    if (astroId) {
      socket.emit("loggedInAstro", { astroId });
    }

    socket.on("newMessage", (msg) => {
      if (
        selectedUser &&
        (msg.senderId === selectedUser.id || msg.receiverId === selectedUser.id)
      ) {
        setMessages((prev) => [...prev, msg]);
        setTimeout(scrollToBottom, 100);
      }
    });

    socket.on("chatStarted", ({ userId }) => {
      console.log("chat started on.")
    });

    socket.on("chatEnded", ({ userId }) => {
      if (selectedUser && selectedUser.id === userId) {
        clearInterval(timerRef.current);
        setTimer(0);
        alert("Chat ended by user");
        setSelectedUser(null);
      }
    });

    return () => {
      socket.off("newMessage");
      socket.off("chatStarted");
      socket.off("chatEnded");
      clearInterval(timerRef.current);
    };
  }, [astroId, selectedUser]);

  // 🔹 Fetch chat list
  useEffect(() => {
    const fetchChatList = async () => {
      if (!astroId) return;
      try {
        const res = await axios.post(
          `https://astro-talk-backend.onrender.com/listUserChat/${astroId}`
        );
        if (res.data.status) setUsers(res.data.data);
      } catch (err) {
        console.error("Error fetching chat list:", err);
      }
    };
    fetchChatList();
  }, [astroId]);

  // 🔹 Fetch messages with selected user
  const fetchMessages = async (userId) => {
    try {
      const res = await axios.post(
        `https://astro-talk-backend.onrender.com/getMessage/${userId}`,
        { currentLogginId: astroId }
      );
      if (res.data && Array.isArray(res.data.messages)) {
        setMessages(res.data.messages || []);
        setTimeout(scrollToBottom, 100);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  // 🔹 Auto select user from route
  useEffect(() => {
    if (location.state) {
      const user = location.state.user;
      setSelectedUser(user);
      fetchMessages(user.id);
      socket.emit("startChat", { userId: user.id, astroId });
    }
  }, [location.state, astroId]);

  // 🔹 Select user manually
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    fetchMessages(user.id);
    socket.emit("startChat", { userId: user.id, astroId });
  };

  // 🔹 Send message
  const handleSendMessage = async () => {
    if (!inputMsg.trim()) return;

    const newMsg = {
      senderId: astroId,
      receiverId: selectedUser.id,
      message: inputMsg,
      createdAt: new Date(),
      type: 'text'
    };

    setInputMsg("");
    setShowEmojiPicker(false);
    scrollToBottom();
    socket.emit("sendMessage", newMsg);

    try {
      await axios.post(
        `https://astro-talk-backend.onrender.com/sendMessage/${selectedUser.id}`,
        { message: inputMsg, currentLoginId: astroId }
      );
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // 🔹 Handle emoji click
  const handleEmojiClick = (emojiData) => {
    setInputMsg(prev => prev + emojiData.emoji);
  };

  // 🔹 Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageMsg = {
            senderId: astroId,
            receiverId: selectedUser.id,
            message: e.target.result,
            createdAt: new Date(),
            type: 'image'
          };
          
          socket.emit("sendMessage", imageMsg);
          setMessages(prev => [...prev, imageMsg]);
          scrollToBottom();
          
          // Simulate API call for image upload
          console.log("Image uploaded:", file.name);
        };
        reader.readAsDataURL(file);
      }
    }
    setShowAttachmentMenu(false);
  };

  // 🔹 Offer discount
  const handleOfferDiscount = () => {
    const discountMsg = {
      senderId: astroId,
      receiverId: selectedUser.id,
      message: "🎉 Special Offer! Get 20% off on your next consultation! Use code: ASTRO20",
      createdAt: new Date(),
      type: 'discount'
    };

    socket.emit("sendMessage", discountMsg);
    setMessages(prev => [...prev, discountMsg]);
    setDiscountOffered(true);
    scrollToBottom();
  };

  // 🔹 End chat
  const handleEndChat = () => {
    if (!selectedUser) return;
    socket.emit("endChat", { userId: selectedUser.id, astroId });
    clearInterval(timerRef.current);
    setTimer(0);
    setSelectedUser(null);
  };

  // 🔹 Format time
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 🔹 Format message time
  const formatMessageTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 🔹 Message component
  const MessageBubble = ({ msg }) => {
    const isSent = msg.senderId === astroId;

    if (msg.type === 'image') {
      return (
        <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-3`}>
          <div className={`max-w-xs ${isSent ? 'bg-blue-500' : 'bg-gray-200'} rounded-2xl p-2`}>
            <img 
              src={msg.message} 
              alt="Shared content" 
              className="rounded-lg max-w-full h-auto"
            />
            <div className={`text-xs mt-1 ${isSent ? 'text-blue-100' : 'text-gray-500'} text-right`}>
              {formatMessageTime(msg.createdAt)}
            </div>
          </div>
        </div>
      );
    }

    if (msg.type === 'discount') {
      return (
        <div className="flex justify-center mb-3">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-4 max-w-xs text-center">
            <div className="font-bold mb-1">Special Offer! 🎉</div>
            <div className="text-sm">{msg.message}</div>
            <div className="text-xs opacity-80 mt-1">
              {formatMessageTime(msg.createdAt)}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-3`}>
        <div className={`max-w-xs rounded-2xl p-3 ${isSent ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
          <div className="text-sm break-words">{msg.message}</div>
          <div className={`text-xs mt-1 ${isSent ? 'text-blue-100' : 'text-gray-500'} text-right`}>
            {formatMessageTime(msg.createdAt)}
          </div>
        </div>
      </div>
    );
  };

  // 🔹 Sidebar - Chat List
  if (!selectedUser) {
    return (
      <div className="h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex">
        <div className="w-full max-w-md md:max-w-7xl mx-auto bg-white shadow-lg h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b bg-white sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate("/astro-dashboard")}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-lg font-bold text-gray-800">Chat History</h2>
              <div className="w-8"></div>
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {users.length ? (
              users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
                >
                  <div className="relative">
                    {user.img ? (
                      <img
                        src={user.img}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                        <User size={20} className="text-white" />
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-gray-800 truncate">{user.name}</h3>
                      <span className="text-xs text-gray-500">12:30 PM</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">Last message preview...</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <User size={48} className="mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No chats yet</p>
                <p className="text-sm">Your chat history will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 🔹 Chat Window
  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-20">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="relative">
                {selectedUser.img ? (
                  <img
                    src={selectedUser.img}
                    alt={selectedUser.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
                )}
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h2 className="font-bold text-gray-800">{selectedUser.name}</h2>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Online</span>
                  <Clock size={12} className="text-gray-400" />
                  <span className="text-xs text-gray-600">Active now</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Call Buttons */}
              <button className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                <Phone size={18} />
              </button>
              <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                <Video size={18} />
              </button>
              
              {/* Discount Button */}
              {!discountOffered && (
                <button 
                  onClick={handleOfferDiscount}
                  className="p-2 rounded-full bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors"
                >
                  <Tag size={18} />
                </button>
              )}
              
              {/* More Options */}
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {/* Welcome Message */}
        <div className="text-center mb-6">
          <div className="inline-block bg-white rounded-2xl px-4 py-2 shadow-sm">
            <p className="text-sm text-gray-600">
              Chat started with {selectedUser.name} • {formatTime(new Date())}
            </p>
          </div>
        </div>

        {/* Messages */}
        {messages.map((msg, index) => (
          <MessageBubble key={index} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-4 z-30">
          <EmojiPicker 
            onEmojiClick={handleEmojiClick}
            height={350}
            width={300}
          />
        </div>
      )}

      {/* Attachment Menu */}
      {showAttachmentMenu && (
        <div className="absolute bottom-16 left-4 bg-white rounded-2xl shadow-lg border p-3 z-30">
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Image size={20} className="text-blue-500 mb-1" />
              <span className="text-xs">Photo</span>
            </button>
            <button className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <Camera size={20} className="text-purple-500 mb-1" />
              <span className="text-xs">Camera</span>
            </button>
            <button className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <Paperclip size={20} className="text-green-500 mb-1" />
              <span className="text-xs">Document</span>
            </button>
            <button className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <Mic size={20} className="text-red-500 mb-1" />
              <span className="text-xs">Audio</span>
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t p-4 sticky bottom-0 z-10">
        <div className="flex items-center space-x-2">
          {/* Attachment Button */}
          <button 
            onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Paperclip size={20} />
          </button>

          {/* Emoji Button */}
          <button 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Smile size={20} />
          </button>

          {/* Message Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Type a message..."
              className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!inputMsg.trim()}
            className={`p-3 rounded-full transition-all duration-200 ${
              inputMsg.trim() 
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md' 
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send size={18} />
          </button>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />
      </div>

      {/* End Chat Button */}
      <div className="bg-white border-t p-3">
        <button
          onClick={handleEndChat}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition-colors shadow-sm"
        >
          End Chat Session
        </button>
      </div>
    </div>
  );
};

export default ChatComponentAstro;