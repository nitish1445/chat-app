import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QuickNavigation from "../components/chat/QuickNavigation";
import ContactBar from "../components/chat/ContactBar";
import ChatWindow from "../components/chat/ChatWindow";
import { useAuth } from "../context/AuthContext";
import socketApi from "../config/WebSocket";

const Chatting = () => {
  const [fetchMode, setFetchMode] = useState("allChat");
  const [receiver, setReceiver] = useState(null);
  const { user, isLogin } = useAuth();

  useEffect(() => {
    if (user) {
      socketApi.emit("createPath", user._id);
    }

    return () => {
      socketApi.emit("destroyPath", user._id);
    };
  }, []);

  return (
    <>
      {isLogin || user ? (
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
            <ContactBar
              fetchMode={fetchMode}
              receiver={receiver}
              setReceiver={setReceiver}
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatWindow receiver={receiver} />
          </div>
        </div>
      ) : (
        <div className="min-h-[91.5vh] bg-base-200 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-base-100 rounded-2xl shadow-xl border border-base-300 p-6 text-center">
            <h1 className="text-2xl font-bold text-base-content mb-2">
              Please login to access chatting
            </h1>
            <p className="text-base-content/70 mb-6">
              If you are new here, create an account and start chatting.
            </p>

            <div className="flex gap-3 justify-center">
              <Link to="/login" className="btn btn-primary px-6">
                Login
              </Link>
              <Link to="/signup" className="btn btn-outline px-6">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatting;
