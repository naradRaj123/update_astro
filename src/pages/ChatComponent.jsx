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
  Camera,
  Star,
  Shield
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import EmojiPicker from 'emoji-picker-react';
import VideoCall from "./VideoCall/VideoCall";
import VoiceCall from "./VoiceCall/VoiceCall";

// Backend socket
const socket = io("https://astro-talk-backend.onrender.com", { transports: ["websocket"] });

const ChatComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const [timer, setTimer] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const [astroData, setAstroData] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [discountUsed, setDiscountUsed] = useState(false);

  const timerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

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
        setTimeout(scrollToBottom, 100);
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
        setTimeout(scrollToBottom, 100);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch astrologer data
  const fetchAstroData = async (astroId) => {
    try {
      const res = await axios.post(`https://astro-talk-backend.onrender.com/web/astro/astrolinfo`, {
        astrologerId: astroId,
      });
      if (res.data) {
        console.log("astro data", res.data.data)
        setAstroData(res.data.data);
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
    fetchAstroData(user.id);
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
      type: 'text'
    };

    setInputMsg("");
    setShowEmojiPicker(false);
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

  // Handle emoji click
  const handleEmojiClick = (emojiData) => {
    setInputMsg(prev => prev + emojiData.emoji);
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageMsg = {
            senderId: userId,
            receiverId: selectedUser.id,
            message: e.target.result,
            createdAt: new Date(),
            type: 'image'
          };
          
          socket.emit("sendMessage", imageMsg);
          setMessages(prev => [...prev, imageMsg]);
          scrollToBottom();
          
          console.log("Image uploaded:", file.name);
        };
        reader.readAsDataURL(file);
      }
    }
    setShowAttachmentMenu(false);
  };

  // Request discount
  const handleRequestDiscount = () => {
    const discountMsg = {
      senderId: userId,
      receiverId: selectedUser.id,
      message: "🔔 Hi! I'm interested in any available discounts for consultations.",
      createdAt: new Date(),
      type: 'discount'
    };

    socket.emit("sendMessage", discountMsg);
    setMessages(prev => [...prev, discountMsg]);
    setDiscountUsed(true);
    scrollToBottom();
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

  // Format message time
  const formatMessageTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    let interval;

    if (selectedUser) {
      setTimer(0);
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [selectedUser]);

  // Message component
  const MessageBubble = ({ msg }) => {
    const isSent = msg.senderId === userId;

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
        <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-3`}>
          <div className={`max-w-xs rounded-2xl p-3 ${isSent ? 'bg-yellow-500 text-white rounded-br-none' : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-bl-none'}`}>
            <div className="text-sm break-words">{msg.message}</div>
            <div className={`text-xs mt-1 ${isSent ? 'text-yellow-100' : 'text-green-100'} text-right`}>
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

  // Sidebar - Chat List
  if (!selectedUser) {
    return (
      <div className=" h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex">
        <div className="w-full max-w-md md:max-w-7xl mx-auto bg-white shadow-lg h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b bg-white sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate("/user-dashboard")}
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
            {users.length > 0 ? (
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
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-600">{user.rating || "4.8"}</span>
                      </div>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-600 truncate">Last message preview...</span>
                    </div>
                  </div>
                </div>
              ))
            ) : users.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-4"></div>
                <p className="text-lg font-medium mb-2">Loading Chats...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <User size={48} className="mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No chats available</p>
                <p className="text-sm text-center px-4">Start a new conversation with an astrologer</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Chat Window
  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-20">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleEndChat}
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
                <div className="flex items-center space-x-2">
                  <h2 className="font-bold text-gray-800">{selectedUser.name}</h2>
                  {selectedUser.isVerified && (
                    <Shield className="h-4 w-4 text-blue-500" />
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Online</span>
                  <Clock size={12} className="text-gray-400" />
                  <span className="text-xs text-gray-600">Time: {formatTime(timer)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Call Buttons */}
              <VoiceCall
                channel={astroData.agoraChannel}
                token={astroData.agoraToken}
                uid={astroData.agoraUID}
                iconOnly={true}
              />

              <VideoCall
                channel={astroData.agoraChannel}
                token={astroData.agoraToken}
                uid={astroData.agoraUID}
                iconOnly={true}
              />
              
              {/* Discount Button */}
              {!discountUsed && (
                <button 
                  onClick={handleRequestDiscount}
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
              Chat started with {selectedUser.name} • {formatMessageTime(new Date())}
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

export default ChatComponent;