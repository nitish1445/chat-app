import React, { useState } from "react";
import QuickNavigation from "../components/chat/QuickNavigation";
import ContactBar from "../components/chat/ContactBar";
import ChatWindow from "../components/chat/chatWindow";
import { useAuth } from "../context/AuthContext";

const Chatting = () => {
  const [fetchMode, setFetchMode] = useState("recentChat");
  const [receiver, setReceiver] = useState(null);
  const { user, isLogin } = useAuth();

  return (
    <>
      <div
        className={`flex ${isLogin ? "h-screen" : "h-[91.5vh]"} overflow-hidden`}
      >
        <div className="w-16 border-r border-base-300 overflow-hidden">
          <QuickNavigation
            setFetchMode={setFetchMode}
            setReceiver={setReceiver}
          />
        </div>
        <div className="w-96 border-r border-base-300 overflow-hidden">
          <ContactBar fetchMode={fetchMode} receiver={receiver} setReceiver={setReceiver} />
        </div>
        <div className="flex-1 overflow-hidden">
          <ChatWindow receiver={receiver} />
        </div>
      </div>
    </>
  );
};

export default Chatting;
