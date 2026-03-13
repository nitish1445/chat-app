import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiDotsVertical } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import { FaMoon } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import ThemeModal from "./modals/ThemeModal";
import api from "../../config/Api";
import socketApi from "../../config/WebSocket";

const titles = {
  recentChat: "Recent Chats",
  allChat: "All Chats",
  profile: "Profile",
  settings: "Settings",
};

const ContactBar = ({ fetchMode, receiver, setReceiver }) => {
  const { user, setUser, setIsLogin } = useAuth();

  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState();

  const fetchContacts = async () => {
    setLoading(true);
    try {
      let res;
      if (fetchMode === "recentChat") {
        console.log("Calling recents");
        // setContacts(DummyRecentContact);
      } else if (fetchMode === "allChat") {
        console.log("Calling All");
        res = await api.get("/user/allUsers");
        setContacts(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [fetchMode]);

  const handleOnlineUsers = (onlineList) => {
    setOnlineUsers(onlineList);
  };

  useEffect(() => {
    socketApi.on("OnlineUsers", handleOnlineUsers);

    return () => {
      socketApi.off("OnlineUsers", handleOnlineUsers);
    };
  }, [contacts, handleOnlineUsers]);

  const handleLogout = () => {
    try {
      setUser(null);
      setIsLogin(false);
      sessionStorage.removeItem("ConverseUser");
      navigate("/login");
      toast.success("Logout Successfull !");
    } catch (error) {
      console.log("Logout Error:", error);
      toast.error("Error in Logout. ");
    }
  };

  return (
    <>
      <div className="bg-base-200 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-lg font-semibold text-base-content capitalize">
            {titles[fetchMode]}
          </h2>

          <button className="p-2 rounded-lg hover:bg-base-300 transition">
            <HiDotsVertical className="text-base-content text-lg" />
          </button>
        </div>

        {/* SETTINGS PAGE */}
        {fetchMode === "settings" && (
          <div className="flex-1 p-4 overflow-y-auto space-y-1">
            {user && (
              <div className="">
                <div className="border-b py-2 border-accent">
                  <div className="flex items-center gap-5 p-3 rounded-xl cursor-pointer hover:bg-base-300 transition">
                    {/* Avatar */}
                    <div className="avatar">
                      <div className="bg-primary text-primary-content rounded-full w-10">
                        <span className="flex items-center justify-center text-sm font-semibold w-10 h-10">
                          {user.fullName?.charAt(0) || ""}
                        </span>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base-content">
                        {user.fullName}
                      </h3>
                      <p className="text-sm text-base-content">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div
                  className="p-3 rounded-xl cursor-pointer hover:bg-base-300 transition mt-2"
                  onClick={() => setThemeModalOpen(true)}
                >
                  <button className="flex items-center gap-5">
                    <div className="text-xl text-primary">
                      <FaMoon />
                    </div>

                    <h3 className="font-semibold text-base-content">Theme</h3>
                  </button>
                </div>

                <div
                  className="p-3 rounded-xl cursor-pointer hover:bg-red-50 transition mt-2"
                  onClick={handleLogout}
                >
                  <button className="flex items-center gap-5 ">
                    <div className="text-xl text-red-500">
                      <LuLogOut />
                    </div>
                    <h3 className="font-semibold text-red-500">Logout</h3>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROFILE PAGE */}
        {fetchMode === "profile" && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-base-content">Profile Page</p>
          </div>
        )}

        {/* Contact List */}
        {(fetchMode === "recentChat" || fetchMode === "allChat") && (
          <div className="flex-1 p-2 overflow-y-auto space-y-1">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <span className="text-sm text-primary">
                  Loading Contacts...
                </span>
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setReceiver(contact)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-base-300 transition ${
                    receiver?._id === contact._id
                      ? "bg-base-300"
                      : "hover:bg-base-300"
                  }`}
                >
                  {/* Avatar */}
                  <div className="avatar relative">
                    <div className=" bg-primary text-primary-content rounded-full w-10">
                      <span className="flex items-center justify-center text-sm font-semibold w-10 h-10">
                        {contact.fullName?.charAt(0)}
                         {onlineUsers && onlineUsers[contact._id] && (<GoDotFill className="absolute bottom-0 -right-1 z-10 text-green-400 text-lg" />)}
                        
                      </span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 justify-between">
                      <h3 className="font-semibold text-base-content">
                        {contact.fullName}
                      </h3>
                     
                    </div>
                    <p className="text-sm text-base-content/70 truncate">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolores, ea doloremque consectetur illo ex saepe fugit
                      quisquam fugiat, iste recusandae alias, facere similique
                      hic maxime quae! Sequi animi consectetur ullam!
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {themeModalOpen && (
        <ThemeModal onClose={() => setThemeModalOpen(false)} />
      )}
    </>
  );
};

export default ContactBar;
