import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiDotsVertical } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import { FaMoon } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import ThemeModal from "./modals/ThemeModal";
import api from "../../config/Api";

const DummyRecentContact = [
  {
    id: 1,
    fullName: "Amit Sharma",
    email: "amit.sharma@example.com",
    phoneNumber: "9876543210",
  },
  {
    id: 2,
    fullName: "Priya Verma",
    email: "priya.verma@example.com",
    phoneNumber: "9876501234",
  },
  {
    id: 3,
    fullName: "Rahul Singh",
    email: "rahul.singh@example.com",
    phoneNumber: "9123456780",
  },
  {
    id: 4,
    fullName: "Sneha Gupta",
    email: "sneha.gupta@example.com",
    phoneNumber: "9988776655",
  },
  {
    id: 5,
    fullName: "Vikram Patel",
    email: "vikram.patel@example.com",
    phoneNumber: "9898989898",
  },
  {
    id: 6,
    fullName: "Neha Joshi",
    email: "neha.joshi@example.com",
    phoneNumber: "9812345678",
  },
  {
    id: 7,
    fullName: "Arjun Mehta",
    email: "arjun.mehta@example.com",
    phoneNumber: "9001122334",
  },
  {
    id: 8,
    fullName: "Kavita Nair",
    email: "kavita.nair@example.com",
    phoneNumber: "9012345678",
  },
  {
    id: 9,
    fullName: "Rohit Agarwal",
    email: "rohit.agarwal@example.com",
    phoneNumber: "9090909090",
  },
  {
    id: 10,
    fullName: "Pooja Kapoor",
    email: "pooja.kapoor@example.com",
    phoneNumber: "9887766554",
  },
];

const DummyAllContact = [
  {
    id: 11,
    fullName: "Ankit Tiwari",
    email: "ankit.tiwari@example.com",
    phoneNumber: "9876012345",
  },
  {
    id: 12,
    fullName: "Ritika Saxena",
    email: "ritika.saxena@example.com",
    phoneNumber: "9811122233",
  },
  {
    id: 13,
    fullName: "Manish Yadav",
    email: "manish.yadav@example.com",
    phoneNumber: "9822334455",
  },
  {
    id: 14,
    fullName: "Deepak Choudhary",
    email: "deepak.choudhary@example.com",
    phoneNumber: "9833445566",
  },
  {
    id: 15,
    fullName: "Shalini Mishra",
    email: "shalini.mishra@example.com",
    phoneNumber: "9844556677",
  },
  {
    id: 16,
    fullName: "Karan Malhotra",
    email: "karan.malhotra@example.com",
    phoneNumber: "9855667788",
  },
  {
    id: 17,
    fullName: "Nisha Arora",
    email: "nisha.arora@example.com",
    phoneNumber: "9866778899",
  },
  {
    id: 18,
    fullName: "Sandeep Kulkarni",
    email: "sandeep.kulkarni@example.com",
    phoneNumber: "9877889900",
  },
  {
    id: 19,
    fullName: "Pankaj Bansal",
    email: "pankaj.bansal@example.com",
    phoneNumber: "9888990011",
  },
  {
    id: 20,
    fullName: "Aarti Deshmukh",
    email: "aarti.deshmukh@example.com",
    phoneNumber: "9899001122",
  },
  {
    id: 21,
    fullName: "Varun Khanna",
    email: "varun.khanna@example.com",
    phoneNumber: "9900112233",
  },
  {
    id: 22,
    fullName: "Megha Sinha",
    email: "megha.sinha@example.com",
    phoneNumber: "9911223344",
  },
  {
    id: 23,
    fullName: "Tarun Bhatt",
    email: "tarun.bhatt@example.com",
    phoneNumber: "9922334455",
  },
  {
    id: 24,
    fullName: "Komal Jain",
    email: "komal.jain@example.com",
    phoneNumber: "9933445566",
  },
  {
    id: 25,
    fullName: "Rakesh Pawar",
    email: "rakesh.pawar@example.com",
    phoneNumber: "9944556677",
  },
  {
    id: 26,
    fullName: "Divya Nanda",
    email: "divya.nanda@example.com",
    phoneNumber: "9955667788",
  },
  {
    id: 27,
    fullName: "Saurabh Gupta",
    email: "saurabh.gupta@example.com",
    phoneNumber: "9966778899",
  },
  {
    id: 28,
    fullName: "Isha Kapoor",
    email: "isha.kapoor@example.com",
    phoneNumber: "9977889900",
  },
  {
    id: 29,
    fullName: "Aditya Srivastava",
    email: "aditya.srivastava@example.com",
    phoneNumber: "9988990011",
  },
  {
    id: 30,
    fullName: "Ritu Pandey",
    email: "ritu.pandey@example.com",
    phoneNumber: "9999001122",
  },
];

const titles = {
  recentChat: "Recent Chats",
  allChat: "All Chats",
  profile: "Profile",
  settings: "Settings",
};

const ContactBar = ({ fetchMode, receiver, setReceiver }) => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const { user, setUser, isLogin, setIsLogin } = useAuth();

  const fetchContacts = async () => {
    setLoading(true);
    try {
      let res;
      if (fetchMode === "recentChat") {
        console.log("Calling recents");

        setContacts(DummyRecentContact);
      } else if (fetchMode === "allChat") {
        console.log("Calling All");
        res = await api.get("/user/allUsers");
        setContacts(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load contacts. Please try again.");
    } finally {
      //setLoading(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Simulate fetching contacts from an API when the component mounts
    fetchContacts();
  }, [fetchMode]);

  const handleLogout = () => {
    try {
      setUser(null);
      setIsLogin(false);
      sessionStorage.removeItem("ConvoUser");
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
            {(user || isLogin) && (
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
                    receiver?.id === contact.id
                      ? "bg-base-300"
                      : "hover:bg-base-300"
                  }`}
                >
                  {/* Avatar */}
                  <div className="avatar">
                    <div className="bg-primary text-primary-content rounded-full w-10">
                      <span className="flex items-center justify-center text-sm font-semibold w-10 h-10">
                        {contact.fullName?.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base-content">
                      {contact.fullName}
                    </h3>

                    <p className="text-sm text-base-content/70 truncate">
                      Lorem ipsum dolor sit amet...
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
