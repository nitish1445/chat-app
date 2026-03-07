import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { HiDotsVertical } from "react-icons/hi";
import { BiSolidSend } from "react-icons/bi";
import { LuSticker } from "react-icons/lu";
import { ImAttachment } from "react-icons/im";

const DummyChatData = [
  {
    senderId: 1,
    receiverId: 2,
    message: "Hi, how are you?",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "I am good! How about you?",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Doing well. Are you free today?",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Yes, mostly in the evening.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Great, we should catch up.",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Sure, what time works for you?",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Maybe around 6 PM?",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "6 PM sounds good.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Let's meet at the cafe near the office.",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Perfect, I like that place.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Did you finish the project work?",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Almost done, just a few things left.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Nice! Let me know if you need help.",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Thanks, I will.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Also, did you check the new tech article I shared?",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Yes, it was really interesting.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "The part about real-time apps was great.",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "True, especially the Socket.IO example.",
  },
  {
    senderId: 1,
    receiverId: 2,
    message: "Exactly! I want to try building one.",
  },
  {
    senderId: 2,
    receiverId: 1,
    message: "Let's discuss it in the evening then.",
  },
];

const ChatWindow = ({ receiver  }) => {
  const bottomRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const scrolltoBottom = () => {
    console.log(bottomRef);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //On Every New Message
  useEffect(() => {
    scrolltoBottom();
  }, [messages]);

  const handleKeyDown = (e) => {
    e.key === "Enter" && handleSend();
  };

  const handleSend = () => {
    //call Backend

    const messagePacket = {
      senderId: 1,
      receiverId: 2,
      message: inputMessage,
    };
    setMessages((prev) => [...prev, messagePacket]);
    setInputMessage("");
  };

  const fetchAllOldMessage = () => {
    try {
      setTimeout(() => {
        setMessages(DummyChatData);
      }, 5000);
    } catch (error) {
      toast.error("Some Error");
    }
  };

  //on component Load
  useEffect(() => {
    setMessages([]);
    fetchAllOldMessage();
  }, [receiver]);

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
                className={`chat ${
                  chat.senderId === 2 ? "chat-receiver" : "chat-sender"
                }`}
              >
                <div className="chat-header text-base-content">
                  {chat.senderId === 2 ? receiver.fullName : "Nitish Kumar"}
                </div>
                <div className="chat-bubble">{chat.message}</div>
              </div>
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              Loading Chats ...
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
              className=" text-2xl text-primary"
              title="Send"
              onClick={handleSend}
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
