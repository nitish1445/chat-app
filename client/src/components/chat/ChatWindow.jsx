import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { HiDotsVertical } from "react-icons/hi";
import { BiSolidSend } from "react-icons/bi";
import { LuSticker } from "react-icons/lu";
import { ImAttachment } from "react-icons/im";
import { FaCircleNotch } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import api from "../../config/Api";
import { useAuth } from "../../context/AuthContext";
import socketApi from "../../config/WebSocket";

const ChatWindow = ({ receiver, setReceiver, onlineUsers }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  const senderId = user?._id;
  const receiverId = receiver?._id;

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const scrolltoBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    const messagePacket = {
      senderId,
      receiverId,
      message: inputMessage,
    };

    const timestamp = new Date().toISOString();

    try {
      if (socketApi.connected) {
        socketApi.emit("send", messagePacket);
        setInputMessage("");
        setMessages((prev) => [
          ...prev,
          { ...messagePacket, createdAt: timestamp, updatedAt: timestamp },
        ]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Message Sending Failed");
    }
  };

  const fetchAllOldMessage = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/user/fetchMessages/${receiverId}`);
      setMessages(res.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching messages");
    } finally {
      setLoading(false);
    }
  };

  const handleReceiveMessage = (newMessagePack) => {
    setMessages((prev) => [...prev, newMessagePack]);
  };

  useEffect(() => {
    setMessages([]);
    if (receiver) fetchAllOldMessage();
  }, [receiver]);

  useEffect(() => {
    scrolltoBottom();

    socketApi.on("recieve", handleReceiveMessage);

    return () => {
      socketApi.off("recieve", handleReceiveMessage);
    };
  }, [receiverId, handleReceiveMessage]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  if (!receiver) {
    return (
      <div className="p-2 h-full flex items-center justify-center">
        <span className="text-sm text-primary">
          Select a contact to start chatting...
        </span>
      </div>
    );
  }

  return (
    <div className="bg-base-200 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-base-300">
        <div className="flex items-center gap-2">
          {/* Back Arrow (Mobile Only) */}
          <button
            onClick={() => setReceiver(null)}
            className="md:hidden p-2 rounded-full hover:bg-base-300"
          >
            <IoArrowBack className="text-lg" />
          </button>

          {/* Avatar */}
          <div className="avatar">
            <div className="bg-primary text-primary-content rounded-full w-10">
              <span className="flex items-center justify-center text-sm font-semibold w-10 h-10">
                {receiver.fullName?.charAt(0)}
              </span>
            </div>
          </div>

          {/* Tap on user to access their profile */}
          <button>
            <h2 className="text-lg font-semibold text-base-content capitalize leading-tight">
              {receiver.fullName}
            </h2>
            {onlineUsers?.[receiverId] ? (
              <p className="text-xs text-green-500 font-medium">Active Now</p>
            ) : (
              <p className="text-xs text-gray-500 font-medium">
                Last seen recently
              </p>
            )}
          </button>
        </div>

        <button className="p-2 rounded-lg hover:bg-base-300 transition">
          <HiDotsVertical className="text-base-content text-lg" />
        </button>
      </div>

      {/* Chat Section */}
      <div className="flex-1 overflow-y-auto px-4 space-y-1 bg-accent/30 md:pb-4">
        {messages.length > 0 ? (
          messages.map((chat, idx) => (
            <div
              key={idx}
              className={`chat ${
                chat.senderId === receiverId ? "chat-receiver" : "chat-sender"
              }`}
            >
              <div className="chat-header text-base-content">
                {chat.senderId === receiverId
                  ? receiver.fullName
                  : user.fullName}
              </div>
              <div className="chat-bubble">{chat.message}</div>
            </div>
          ))
        ) : loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col gap-3 items-center">
              <div className="animate-spin">
                <FaCircleNotch />
              </div>
              <div>Loading messages...</div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-1">Converse</h2>
              <p className="text-sm">Your messages will appear here.</p>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="py-4 px-2 bg-base-200 border-t border-base-300 pb-5 md:pb-4">
        <div className="flex items-center gap-3 px-4">
          <button className="text-xl text-primary">
            <ImAttachment />
          </button>

          <button className="text-xl text-primary">
            <LuSticker />
          </button>

          <input
            type="text"
            value={inputMessage}
            placeholder="Type your message..."
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent outline-none pl-2"
          />

          <button
            onClick={handleSend}
            disabled={inputMessage === ""}
            className="text-2xl text-primary disabled:text-secondary disabled:cursor-not-allowed"
          >
            <BiSolidSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
