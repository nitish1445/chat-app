import React from "react";
import { MdOutlineChat } from "react-icons/md";
import { IoSettingsOutline, IoChatbubblesOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { useAuth } from "../../context/AuthContext";

const QuickNavigation = ({ setFetchMode, setReceiver }) => {
  const { user } = useAuth();
  const navBtn =
    "rounded-full p-2 text-base-content/70 hover:text-base-content hover:bg-base-300 transition-colors duration-200";

  return (
    <div className="bg-base-200 h-full flex flex-col justify-between p-2">
      {/* Top Section */}
      <div className="flex flex-col gap-4 items-center text-xl">
        <button
          title="Recent Chats"
          className={navBtn}
          onClick={() => setFetchMode("recentChat")}
        >
          <IoChatbubblesOutline />
        </button>

        <button
          title="All Chats"
          className={navBtn}
          onClick={() => setFetchMode("allChat")}
        >
          <MdOutlineChat />
        </button>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-3 items-center text-xl">
        <button
          title="Setting"
          className={navBtn}
          onClick={() => {
            setFetchMode("settings");
            setReceiver(null);
          }}
        >
          <IoSettingsOutline />
        </button>

        <button
          title="Profile"
          className={navBtn}
          onClick={() => {
            setFetchMode("profile");
            setReceiver(null);
          }}
        >
          {user ? (
            <div className="bg-primary text-primary-content rounded-full w-6">
              <span className="flex items-center justify-center text-sm font-semibold w-6 h-6">
                {user.fullName?.charAt(0) || ""}
              </span>
            </div>
          ) : (
            <CiUser />
          )}
        </button>
      </div>
    </div>
  );
};

export default QuickNavigation;
