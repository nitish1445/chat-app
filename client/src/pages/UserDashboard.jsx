import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import api from "../config/Api";

// simple function for form default values
const userDetail = (currentUserData) => {
  return {
    fullName: currentUserData?.fullName || "",
    email: currentUserData?.email || "",
    phone: currentUserData?.phone || "",
    about: currentUserData?.about || "Hey there!! I am using Converse.",
  };
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, setUser, setIsLogin } = useAuth();

  // get current user detail
  const currentUser =
    user || JSON.parse(sessionStorage.getItem("ConverseUser")) || null;

  const [editProfile, setEditProfile] = useState(userDetail(currentUser));
  const [mobilePanel, setMobilePanel] = useState("summary");

  // update form when user changes
  useEffect(() => {
    setEditProfile(userDetail(currentUser));
  }, [user]);

  // show on profile page
  const userName = currentUser?.fullName;
  const userEmail = currentUser?.email;
  const userPhone = currentUser?.phone;
  const userAbout = currentUser?.about || "Hey there!! I am using Converse.";

  // Name initials
  const initials = userName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // logout
  const handleLogout = () => {
    sessionStorage.removeItem("ConverseUser");
    setUser(null);
    setIsLogin(false);
    navigate("/login");
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditProfile({
      ...editProfile,
      [name]: value,
    });
  };

  const handleResetProfile = () => {
    setEditProfile(userDetail(currentUser));
  };

  // updated user detail
  const updatedUser = {
    ...currentUser,
    fullName: editProfile.fullName.trim(),
    email: editProfile.email.trim(),
    phone: editProfile.phone.trim(),
    about: editProfile.about.trim(),
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/update", updatedUser);
      sessionStorage.setItem("ConverseUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error.message);
      toast.error(res?.error?.data?.message || "Internal Error");
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-base-200 px-3 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-2xl">
        <div className="h-28 bg-primary" />

        <div className="-mt-16 px-4 pb-6 md:px-6">
          <div className="mb-4 rounded-xl bg-base-200 p-1 lg:hidden">
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => setMobilePanel("summary")}
                className={`btn btn-sm border-none ${
                  mobilePanel === "summary"
                    ? "btn-primary text-primary-content"
                    : "bg-transparent text-base-content"
                }`}
              >
                Profile
              </button>
              <button
                type="button"
                onClick={() => setMobilePanel("edit")}
                className={`btn btn-sm border-none ${
                  mobilePanel === "edit"
                    ? "btn-primary text-primary-content"
                    : "bg-transparent text-base-content"
                }`}
              >
                Edit
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              className={`flex gap-6 transition-transform duration-300 ease-out lg:grid lg:grid-cols-[320px_1fr] lg:gap-6 ${
                mobilePanel === "summary"
                  ? "translate-x-0"
                  : "-translate-x-[calc(100%+1.5rem)]"
              } lg:translate-x-0`}
            >
              <aside className="min-w-full rounded-2xl border border-base-300 bg-base-200 p-4 lg:min-w-0">
                <div className="flex flex-col items-center text-center">
                  <div className="avatar avatar-placeholder">
                    <div className="bg-primary text-primary-content h-24 w-24 rounded-full text-3xl font-bold">
                      <span>{initials}</span>
                    </div>
                  </div>

                  <h1 className="mt-3 text-2xl font-bold text-base-content">
                    {userName}
                  </h1>
                  <p className="text-sm text-base-content/70">Available</p>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="rounded-xl bg-base-100 p-3">
                    <p className="text-xs uppercase text-base-content/70">
                      Email
                    </p>
                    <p className="text-sm font-medium text-base-content">
                      {userEmail}
                    </p>
                  </div>
                  <div className="rounded-xl bg-base-100 p-3">
                    <p className="text-xs uppercase text-base-content/70">
                      Phone
                    </p>
                    <p className="text-sm font-medium text-base-content">
                      {userPhone}
                    </p>
                  </div>
                  <div className="rounded-xl bg-base-100 p-3">
                    <p className="text-xs uppercase text-base-content/70">
                      About
                    </p>
                    <p className="text-sm font-medium text-base-content">
                      {userAbout}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                  <Link to="/chatting" className="btn btn-primary">
                    Open Chats
                  </Link>
                  <button
                    className="btn btn-outline btn-error"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </aside>

              <section className="min-w-full rounded-2xl border border-base-300 bg-base-200 p-4 md:p-5 lg:min-w-0">
                <div className="mb-4 border-b border-base-300 pb-3">
                  <p className="text-primary text-xs font-semibold uppercase tracking-wide">
                    Profile
                  </p>
                  <h2 className="text-2xl font-bold text-base-content">
                    Edit Your Details
                  </h2>
                </div>

                <form
                  onSubmit={handleSaveProfile}
                  onReset={handleResetProfile}
                  className="space-y-4"
                >
                  <div className="rounded-xl  bg-base-100 p-3">
                    <label className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                      Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Your display name"
                      value={editProfile.fullName}
                      onChange={handleProfileChange}
                      className="input input-bordered h-11 w-full rounded-lg"
                    />
                  </div>

                  <div className="rounded-xl  bg-base-100 p-3">
                    <label className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                      About
                    </label>
                    <input
                      name="about"
                      placeholder="Hey there! I am using Converse"
                      value={editProfile.about}
                      onChange={handleProfileChange}
                      className="input input-bordered w-full rounded-lg"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl bg-base-100 p-3">
                      <label className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="name@email.com"
                        value={editProfile.email}
                        onChange={handleProfileChange}
                        className="input input-bordered h-11 w-full rounded-lg"
                      />
                    </div>

                    <div className="rounded-xl  bg-base-100 p-3">
                      <label className="text-primary mb-1 block text-xs font-semibold uppercase tracking-wide">
                        Phone
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Enter mobile number"
                          value={editProfile.phone}
                          onChange={handleProfileChange}
                          className="input input-bordered h-11 w-full pl-11 rounded-lg"
                        />

                        <div className="absolute left-0 top-0 h-11.5 w-12 flex items-center justify-center  font-medium text-base-content rounded-l-xl">
                          +91
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                    <button type="reset" className="btn btn-outline flex-1">
                      Reset
                    </button>
                    <button type="submit" className="btn btn-primary flex-1">
                      Save Changes
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserDashboard;
