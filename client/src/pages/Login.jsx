// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import api from "../config/Api";
// import { useGoogleAuth } from "../config/GoogleAuth";
// import { FcGoogle } from "react-icons/fc";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const navigate = useNavigate();
//   const { setUser, setIsLogin } = useAuth();
//   const { isLoading, error, isInitialized, signInWithGoogle } = useGoogleAuth();

//   // handle Google Login Submit
//   const handleGoogleSuccess = async (userData) => {
//     console.log("Google Login Data", userData);
//     try {
//       const res = await api.post("/auth/googleLogin", userData);
//       toast.success(res.data.message);
//       sessionStorage.setItem("ConvoUser", JSON.stringify(res.data.data));
//       setIsLogin(true);
//       setUser(res.data.data);
//       navigate("/chatting");
//       handleClear();
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.response?.data?.message || "Unkown Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // handle Google failure
//   const handleGoogleFailure = (error) => {
//     console.error("Google login failed:", error);
//     toast.error("Google login failed. Please try again.");
//   };

//   // Google login button get both the function call here...
//   const GoogleLogin = () => {
//     signInWithGoogle(handleGoogleSuccess, handleGoogleFailure);
//   };

//   // detail of existing regular user
//   const [detail, setDetail] = useState({
//     email: "",
//     password: "",
//   });

//   const handleClear = () => {
//     setDetail({
//       email: "",
//       password: "",
//     });
//   };

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDetail((prev) => ({ ...prev, [name]: value }));
//   };

//   // handle regular login submit
//   const submitLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await api.post("/auth/login", detail);
//       toast.success(res.data.message);
//       sessionStorage.setItem("ConvoUser", JSON.stringify(res.data.data));
//       setIsLogin(true);
//       setUser(res.data.data);
//       navigate("/chatting");
//       handleClear();
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.response?.data?.message || "Unkown Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-base-200 py-5 px-4">
//         <div className="max-w-110 mx-auto mt-12">
//           <div className="bg-base-100 rounded-xl shadow-2xl overflow-hidden">
//             <form
//               onSubmit={submitLogin}
//               onReset={handleClear}
//               className="pt-5 px-5"
//             >
//               <h1 className="text-2xl font-bold text-base-content mb-5">
//                 Login Now
//               </h1>

//               <div className="mb-5">
//                 <div className="space-y-3">
//                   <input
//                     type="text"
//                     name="email"
//                     placeholder="Enter your email to login"
//                     value={detail.email}
//                     onChange={handleChange}
//                     disabled={loading}
//                     required
//                     className="w-full px-4 py-3 border-2 border-base-300 rounded-lg focus:outline-none focus:border-primary transition disabled:cursor-not-allowed disabled:bg-base-200"
//                   />

//                   <input
//                     type="password"
//                     name="password"
//                     value={detail.password}
//                     placeholder="Enter your Password"
//                     onChange={handleChange}
//                     disabled={loading}
//                     required
//                     className="w-full px-4 py-3 border-2 border-base-300 rounded-lg focus:outline-none focus:border-primary transition disabled:cursor-not-allowed disabled:bg-base-200"
//                   />
//                 </div>
//               </div>

//               {/* Button */}

//               <div>
//                 {/* Regular Login */}

//                 <div>
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="flex-1 bg-secondary text-secondary-content font-bold py-3 px-6 rounded-lg shadow-lg w-full disabled:cursor-not-allowed"
//                   >
//                     {loading ? "Loading..!" : "Login Now"}
//                   </button>
//                 </div>

//                 <div className="text-center py-2">Or</div>

//                 {/* Google Login button */}

//                 <div className="">
//                   {error ? (
//                     <button
//                       className="btn btn-outline btn-error font-sans flex items-center justify-center gap-2 w-full"
//                       disabled
//                     >
//                       <FcGoogle className="text-xl" />
//                       {error}
//                     </button>
//                   ) : (
//                     <button
//                       onClick={GoogleLogin}
//                       className="btn btn-outline font-sans flex items-center justify-center gap-2 w-full"
//                       disabled={!isInitialized || isLoading}
//                     >
//                       <FcGoogle className="text-xl" />
//                       {isLoading
//                         ? "Loading..."
//                         : isInitialized
//                           ? "Continue with Google"
//                           : "Google Auth Error"}
//                     </button>
//                   )}
//                 </div>
//               </div>

//               <div className="py-5">
//                 <div className="text-end ">
//                   <div className="flex gap-1 ">
//                     <span className="text-gray-400"> Didn't have account?</span>
//                     <div className="">
//                       <button
//                         type="button"
//                         onClick={() => navigate("/SignUp")}
//                         disabled={isLoading}
//                         className="text-primary hover:underline"
//                       >
//                         Create Account
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../config/Api";
import { useGoogleAuth } from "../config/GoogleAuth";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import { FiLogIn } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { VscLock } from "react-icons/vsc";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineSafety,
} from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsLogin } = useAuth();
  const { isLoading, error, isInitialized, signInWithGoogle } = useGoogleAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [detail, setDetail] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleClear = () => {
    setDetail({
      email: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleSuccess = async (userData) => {
    try {
      const res = await api.post("/auth/googleLogin", userData);
      toast.success(res.data.message);

      sessionStorage.setItem("ConvoUser", JSON.stringify(res.data.data));
      setIsLogin(true);
      setUser(res.data.data);

      navigate("/chatting");
      handleClear();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };

  const handleGoogleFailure = (error) => {
    console.error(error);
    toast.error("Google login failed.");
  };

  const GoogleLogin = () => {
    signInWithGoogle(handleGoogleSuccess, handleGoogleFailure);
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", detail);

      toast.success(res.data.message);

      sessionStorage.setItem("ConvoUser", JSON.stringify(res.data.data));

      setIsLogin(true);
      setUser(res.data.data);

      navigate("/chatting");

      handleClear();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-cyan-50 via-sky-50 to-slate-100 px-4 py-8 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute w-96 h-96 bg-cyan-300/30 rounded-full blur-[120px] -top-20 -left-20" />
        <div className="absolute w-96 h-96 bg-sky-300/30 rounded-full blur-[120px] -bottom-20 -right-20" />

        <div className="w-full max-w-md relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="text-4xl p-5 rounded-full text-cyan-700 bg-white/90 border border-cyan-200 shadow-lg shadow-cyan-900/10">
              <AiOutlineSafety />
            </div>

            <h2 className="text-3xl font-bold mt-4 text-slate-900">
              Welcome Back
            </h2>

            <p className="text-slate-600 text-sm">
              Sign in to continue chatting
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-cyan-900/10 border border-slate-200 p-8">
            <form
              onSubmit={submitLogin}
              onReset={handleClear}
              className="space-y-6"
            >
              {/* Email */}
              <div>
                <label className="text-sm mb-2 block text-slate-700">
                  Email Address
                </label>

                <div className="relative">
                  <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none" />

                  <input
                    type="text"
                    name="email"
                    value={detail.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    placeholder="Enter your registered email "
                    className="input w-full pl-10 bg-white border-slate-200 text-slate-800 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm mb-2 block text-slate-700">
                  Password
                </label>

                <div className="relative">
                  <VscLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={detail.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    placeholder="Enter password"
                    className="input w-full pl-10 pr-10 bg-white border-slate-200 text-slate-800 focus:outline-none focus:border-cyan-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 z-10"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-cyan-900/20 disabled:cursor-not-allowed"
              >
                <FiLogIn />
                {loading ? "Loading..!" : "Login Now"}
              </button>

              {/* Divider */}
              <div className="text-center text-sm text-slate-500">Or</div>

              {/* Google Login */}
              {error ? (
                <button
                  className="btn btn-outline btn-error font-sans flex items-center justify-center gap-2 w-full"
                  disabled
                >
                  <FcGoogle className="text-xl" />
                  {error}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={GoogleLogin}
                  className="btn hover:border-cyan-300 text-slate-700 hover:bg-cyan-50 font-sans flex items-center justify-center gap-2 w-full"
                  disabled={!isInitialized || isLoading}
                >
                  <FcGoogle className="text-xl" />

                  {isLoading
                    ? "Loading..."
                    : isInitialized
                      ? "Continue with Google"
                      : "Google Auth Error"}
                </button>
              )}

              {/* Signup */}
              <div className="text-right text-sm pt-2">
                <span className="text-slate-500">Didn't have account?</span>

                <button
                  type="button"
                  onClick={() => navigate("/SignUp")}
                  disabled={loading}
                  className="text-cyan-700 hover:text-cyan-800 hover:underline ml-1"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
