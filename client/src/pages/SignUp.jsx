import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../config/Api";
import { MdOutlineMail } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { VscLock } from "react-icons/vsc";
import { FiPhone } from "react-icons/fi";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineSafety,
} from "react-icons/ai";

const SignUp = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [detail, setDetail] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setDetail({
      fullName: "",
      email: "",
      phone: "",
      password: "",
    });
  };

  const submitSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/signup", detail);

      toast.success(res.data.message);

      handleClear();
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen py-8 flex items-center justify-center bg-linear-to-b from-cyan-50 via-sky-50 to-slate-100 px-4 relative overflow-hidden">
        {/* Glow background (same structure as first design) */}
        <div className="absolute w-96 h-96 bg-cyan-300/30 rounded-full blur-[120px] -top-20 -left-20" />
        <div className="absolute w-96 h-96 bg-sky-300/30 rounded-full blur-[120px] -bottom-20 -right-20" />

        <div className="w-full max-w-md relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="text-4xl p-5 rounded-full bg-white/90 border border-cyan-200 shadow-lg shadow-cyan-900/10 text-cyan-700">
              <AiOutlineSafety />
            </div>

            <h2 className="text-3xl font-bold mt-4 text-slate-900">
              Create Account
            </h2>

            <p className="text-slate-600 text-sm">
              Register to start chatting
            </p>
          </div>

          {/* Card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-cyan-900/10 border border-slate-200 p-8">
            <form onSubmit={submitSignUp} className="space-y-6">
              {/* Name */}
              <InputField
                icon={<LuUser />}
                name="fullName"
                placeholder="Enter your full name"
                value={detail.fullName}
                onChange={handleChange}
                disabled={loading}
              />

              {/* Email */}
              <InputField
                icon={<MdOutlineMail />}
                name="email"
                type="email"
                placeholder="Enter email address"
                value={detail.email}
                onChange={handleChange}
                disabled={loading}
              />

              {/* Phone */}
              <InputField
                icon={<FiPhone />}
                name="phone"
                type="tel"
                placeholder="Enter phone number"
                value={detail.phone}
                onChange={handleChange}
                disabled={loading}
              />

              {/* Password */}
              <div className="relative">
                <VscLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400  z-10 pointer-events-none" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create password"
                  value={detail.password}
                  onChange={handleChange}
                  disabled={loading}
                  className="input w-full pl-10 pr-10 bg-white border-slate-200 text-slate-800 focus:outline-none focus:border-cyan-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-cyan-900/20"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              {/* Login */}
              <div className="text-center border-t pt-5">
                <p className="text-slate-600 text-sm mb-2">
                  Already have an account?
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-cyan-700 hover:text-cyan-800 hover:underline"
                >
                  Login Instead
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const InputField = ({ icon, ...props }) => (
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none">
      {icon}
    </span>

    <input
      {...props}
      className="input w-full pl-10 bg-white border-slate-200 text-slate-800 focus:outline-none focus:border-cyan-400"
    />
  </div>
);

export default SignUp;
