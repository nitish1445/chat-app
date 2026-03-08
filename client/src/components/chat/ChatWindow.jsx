import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { HiDotsVertical } from "react-icons/hi";
import { BiSolidSend } from "react-icons/bi";
import { LuSticker } from "react-icons/lu";
import { ImAttachment } from "react-icons/im";
import { FaCircleNotch } from "react-icons/fa";
import api from "../../config/Api";
import { useAuth } from "../../context/AuthContext";
import socketApi from "../../config/WebSocket";

const ChatWindow = ({ receiver }) => {
  const { user } = useAuth();
  const bottomRef = useRef(null);

  const senderId = user?._id || 1; // Replace with actual logged-in user ID
  const receiverId = receiver?._id || 2; // Replace with actual receiver ID

  const timestamp = new Date().toISOString();

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

    try {
      // const res = await api.post(`/user/sendMessage/${receiverId}`, {
      //   inputMessage,
      // });
      // socketApi.emit("send", messagePacket);
      setInputMessage("");
      setMessages((prev) => [
        ...prev,
        { ...messagePacket, createdAt: timestamp, updatedAt: timestamp },
      ]);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Message Sending Failed");
    }
  };

  const fetchAllOldMessage = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/user/fetchMessages/${receiverId}`);
      setMessages(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error fetching messages");
    } finally {
      setLoading(false);
    }
  };

  //on component Load
  useEffect(() => {
    setMessages([]);
    if (receiver) {
      fetchAllOldMessage();
    }
  }, [receiver]);

  //On Every New Message
  useEffect(() => {
    scrolltoBottom();
  }, [messages]);

  const handleKeyDown = (e) => {
    e.key === "Enter" && handleSend();
  };

  // search for reciever
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
    <>
      <div className="bg-base-200 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            {/* Avatar */}
            <div className="avatar">
              <div className="bg-primary text-primary-content rounded-full w-10">
                <span className="flex items-center justify-center text-sm font-semibold w-10 h-10">
                  {receiver.fullName?.charAt(0)}
                </span>
              </div>
            </div>
            <h2 className="text-lg font-semibold text-base-content capitalize">
              {receiver.fullName}
            </h2>
          </div>

          <button className="p-2 rounded-lg hover:bg-base-300 transition">
            <HiDotsVertical className="text-base-content text-lg" />
          </button>
        </div>

        {/* Chat Section */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-accent/30">
          {messages.length > 0 ? (
            messages.map((chat, idx) => (
              <div
                key={idx}
                className={`chat ${chat.senderId === receiverId ? "chat-receiver" : "chat-sender"}`}
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
            <div className=" flex items-center justify-center">
              <div className="flex flex-col items-center mt-50">
                <h2 className="text-xl font-semibold mb-1">Converse </h2>
                <p className="text-sm text-center max-w-md">
                  Your messages will appear here.
                </p>
              </div>
            </div>
          )}

          {/* Dummy div to scroll to bottom */}
          <div ref={bottomRef} />
        </div>

        {/* Input Box */}
        <div className="py-4 px-2 bg-base-200 border-t border-base-300">
          <div className="flex items-center gap-3 px-4">
            <button className=" text-xl text-primary" title="Attach">
              <ImAttachment />
            </button>
            <button className=" text-xl text-primary" title="Emojis, Stickers">
              <LuSticker />
            </button>
            <input
              type="text"
              value={inputMessage}
              placeholder="Type your message..."
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none text-base-content pl-2"
            />

            <button
              className=" text-2xl text-primary disabled:text-secondary disabled:cursor-not-allowed"
              title="Send"
              onClick={handleSend}
              disabled={inputMessage === ""}
            >
              <BiSolidSend />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
