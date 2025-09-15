import React, { useState } from "react";
import { ArrowLeft } from "lucide-react"; // back arrow icon
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const ChatComponent = () => {
    const navigate = useNavigate()
    const users = [
        {
            id: 1,
            name: "Alice",
            img: "https://i.pravatar.cc/50?img=1",
            messages: [
                { sender: "Alice", text: "Hi there!" },
                { sender: "me", text: "Hello Alice 👋" },
                { sender: "Alice", text: "How are you doing?" },
                { sender: "me", text: "I'm good, thanks! What about you?" },
            ],
        },
        {
            id: 2,
            name: "Bob",
            img: "https://i.pravatar.cc/50?img=2",
            messages: [
                { sender: "Bob", text: "Hey!" },
                { sender: "me", text: "Hi Bob, ready for the meeting?" },
                { sender: "Bob", text: "Yes, just give me 5 mins." },
            ],
        },
        {
            id: 3,
            name: "Charlie",
            img: "https://i.pravatar.cc/50?img=3",
            messages: [
                { sender: "Charlie", text: "Hello!" },
                { sender: "me", text: "Hey Charlie, long time!" },
                { sender: "Charlie", text: "Yeah, let's catch up soon." },
            ],
        },
    ];

    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-rose-100 ">
            <motion.div
                className="container md:mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="h-screen w-full bg-transparent">
                    {/* Sidebar - shown only if no user is selected */}
                    {selectedUser === null && (
                        <div className="h-full flex items-center justify-center">
                            <div className="md:w-[50%] w-full bg-white shadow-lg h-full rounded-xl">
                                <div className="p-4 border-b-4 flex justify-between">
                                    <button
                                        onClick={() => navigate("/user-dashboard")}
                                        className="p-2 rounded-full hover:bg-gray-200"
                                    >
                                        <ArrowLeft size={20} />
                                    </button>
                                    <h2 className="text-lg font-bold ">Chat History</h2>
                                    <div> </div>
                                </div>
                                <ul>
                                    {users.map((user) => (
                                        <li
                                            key={user.id}
                                            onClick={() => setSelectedUser(user)}
                                            className="flex items-center gap-3 p-3 hover:bg-gray-200 cursor-pointer border-b-4"
                                        >
                                            <img
                                                src={user.img}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <span className="font-medium">{user.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Chat Area - shown only if a user is selected */}
                    {selectedUser && (
                        <div className="flex flex-col h-full w-full bg-white shadow-lg">
                            {/* Chat Header */}
                            <div className="p-4 border-b flex items-center gap-3 bg-white shadow">
                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="p-2 rounded-full hover:bg-gray-200"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                                <img
                                    src={selectedUser.img}
                                    alt={selectedUser.name}
                                    className="w-10 h-10 rounded-full"
                                />
                                <h2 className="font-bold text-lg">{selectedUser.name}</h2>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 p-4 overflow-y-auto flex flex-col">
                                {selectedUser.messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`p-2 my-2 rounded-lg max-w-xs ${msg.sender === "me"
                                            ? "bg-blue-500 text-white self-end"
                                            : "bg-gray-300 text-black self-start"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                ))}
                            </div>

                            {/* Input Area */}
                            <div className="p-3 border-t flex gap-2 bg-white">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="flex-1 border rounded-lg px-3 py-2"
                                />
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                                    Send
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default ChatComponent;
