import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineChat } from "react-icons/md";
import {
  IoSettingsOutline,
  IoChatbubblesOutline,
} from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { useAuth } from "../../context/AuthContext";

const QuickNavigation = ({ setFetchMode, setReceiver }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const navBtn =
    "flex flex-col items-center justify-center gap-1 rounded-xl p-2 text-base-content/70 hover:text-base-content hover:bg-base-300 transition-all duration-200 w-full";

  const iconSize = "text-xl";

  return (
    <div
      className="
        bg-base-200 h-full w-full
        flex md:flex-col
        justify-around md:justify-between
        items-center
        px-2 py-1 md:p-2
      "
    >
      {/* Desktop Top / Mobile Full Row */}
      <div className="flex md:flex-col gap-2 md:gap-4 items-center w-full">
        {/* Recent Chats */}
        <button
          title="Recent Chats"
          className={navBtn}
          onClick={() => {
            setFetchMode("recentChat");
            setReceiver(null);
          }}
        >
          <IoChatbubblesOutline className={iconSize} />
          <span className="text-[10px] md:hidden">Recent</span>
        </button>

        {/* All Chats */}
        <button
          title="All Chats"
          className={navBtn}
          onClick={() => {
            setFetchMode("allChat");
            setReceiver(null);
          }}
        >
          <MdOutlineChat className={iconSize} />
          <span className="text-[10px] md:hidden">Chats</span>
        </button>

        {/* Settings */}
        <button
          title="Settings"
          className={navBtn}
          onClick={() => {
            setFetchMode("settings");
            setReceiver(null);
          }}
        >
          <IoSettingsOutline className={iconSize} />
          <span className="text-[10px] md:hidden">Settings</span>
        </button>

        {/* Profile */}
        <button
          title="Profile"
          className={navBtn}
          onClick={() => navigate("/user-dashboard")}
        >
          {user ? (
            <div className="bg-primary text-primary-content rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
              {user.fullName?.charAt(0) || ""}
            </div>
          ) : (
            <CiUser className={iconSize} />
          )}
          <span className="text-[10px] md:hidden">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default QuickNavigation;