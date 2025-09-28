import React, { useEffect, useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("https://astro-talk-backend.onrender.com",{
  autoConnect: false,
}); // backend ka url

const ChatComponentAstro = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const messagesEndRef = useRef(null);

  const astroUser = JSON.parse(localStorage.getItem("astroUser") || "{}");
  const astroId = astroUser?._id;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 🔹 On Mount: Connect Astro to Socket
  useEffect(() => {
    if (astroId) {
      socket.emit("loggedInAstro", { astroId });
    }

    // listen for new incoming messages
    socket.on("newMessage", (msg) => {
      if (
        selectedUser &&
        (msg.senderId === selectedUser.id || msg.receiverId === selectedUser.id)
      ) {
        setMessages((prev) => [...prev, msg]);
        setTimeout(scrollToBottom, 100);
      }
    });
    return () => {
      socket.off("newMessage");
    };
  }, [astroId, selectedUser]);

  // 🔹 Fetch chat list
  useEffect(() => {
    const fetchChatList = async () => {
      if (!astroId) return;
      try {
        const res = await axios.post(`https://astro-talk-backend.onrender.com/listUserChat/${astroId}`);
        if (res.data.status) {
          setUsers(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching chat list:", err);
      }
    };
    fetchChatList();
  }, [astroId]);

  // 🔹 Fetch messages with selected user
  const fetchMessages = async (userId) => {
    try {
      const res = await axios.post(`https://astro-talk-backend.onrender.com/getMessage/${userId}`, {
        currentLogginId: astroId,
      });
      if (res.data && Array.isArray(res.data.messages)) {
        setMessages(res.data.messages || []);
        setTimeout(scrollToBottom, 100);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  // 🔹 Auto-select user from route state
  useEffect(() => {
    if (location.state) {
      setSelectedUser(location.state.user);
      fetchMessages(location.state.user.id);
    }
  }, [location.state]);

  // 🔹 Select user manually
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    fetchMessages(user.id);
  };

  // 🔹 Send message
  const handleSendMessage = async () => {
    if (!inputMsg.trim()) return;

    try {
      const res = await axios.post(
        `https://astro-talk-backend.onrender.com/sendMessage/${selectedUser.id}`,
        {
          message: inputMsg,
          currentLoginId: astroId,
        }
      );

      const newMsg =
        res.data.data || {
          senderId: astroId,
          receiverId: selectedUser.id,
          message: inputMsg,
          createdAt: new Date(),
        };

      // setMessages((prev) => [...prev, newMsg]);
      setInputMsg("");
      // Emit socket event to server
      socket.emit("sendMessage", newMsg);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };


  // 🔹 Sidebar
  if (!selectedUser) {
    return (
      <div className="h-full flex items-center justify-center mt-[120px] my-10 ">
        <div className="md:w-[50%] w-[50%] bg-white shadow-lg h-full rounded-xl">
          <div className="p-4 border-b-4 flex justify-between">
            <button
              onClick={() => navigate("/astro-dashboard")}
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
                  <img
                    src={user.img || "/placeholder.png"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
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

  // 🔹 Chat window
  return (
    <div className="flex flex-col h-screen w-full md:w-1/2 mx-auto my-[8rem]  bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-white shadow sticky top-0 z-10">
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <ArrowLeft size={20} />
        </button>
        <img
          src={selectedUser.img || "/placeholder.png"}
          alt={selectedUser.name}
          className="w-10 h-10 rounded-full ml-3"
        />
        <h2 className="font-bold text-lg ml-3">{selectedUser.name}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-xs ${msg.senderId === astroId
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-300 text-black self-start"
              }`}
          >
            {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
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

export default ChatComponentAstro;
