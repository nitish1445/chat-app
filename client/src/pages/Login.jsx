import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../config/Api";
import { useGoogleAuth } from "../config/GoogleAuth";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();

  const { isLoading, error, isInitialized, signInWithGoogle } = useGoogleAuth();

  // handle Google Login Submit
  const handleGoogleSuccess = async (userData) => {
    console.log("Google Login Data", userData);
    try {
      const res = await api.post("/auth/googleLogin", userData);
      toast.success(res.data.message);
      navigate("/user-dashboard");
      sessionStorage.setItem("ChatKaroUser", JSON.stringify(res.data.data));
      handleClear();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unkown Error");
    } finally {
      setLoading(false);
    }
  };

  // handle Google failure
  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
    toast.error("Google login failed. Please try again.");
  };

  // Google login button get both the function call here...
  const GoogleLogin = () => {
    signInWithGoogle(handleGoogleSuccess, handleGoogleFailure);
  };

  // detail of existing regular user
  const [detail, setDetail] = useState({
    email: "",
    password: "",
  });

  const handleClear = () => {
    setDetail({
      email: "",
      password: "",
    });
  };

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({ ...prev, [name]: value }));
  };

  // handle regular login submit
  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", detail);
      toast.success(res.data.message);
      navigate("/user-dashboard");
      sessionStorage.setItem("ChatKaroUser", JSON.stringify(res.data.data));
      handleClear();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unkown Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-base-200 py-5 px-4">
        <div className="max-w-110 mx-auto mt-12">
          <div className="bg-base-100 rounded-xl shadow-2xl overflow-hidden">
            <form
              onSubmit={submitLogin}
              onReset={handleClear}
              className="pt-5 px-5"
            >
              <h1 className="text-2xl font-bold text-base-content mb-5">
                Login Now
              </h1>

              <div className="mb-5">
                <div className="space-y-3">
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your email to login"
                    value={detail.email}
                    onChange={handleChange}
                    disabled={loading}
                    required
                    className="w-full px-4 py-3 border-2 border-base-300 rounded-lg focus:outline-none focus:border-primary transition disabled:cursor-not-allowed disabled:bg-base-200"
                  />

                  <input
                    type="password"
                    name="password"
                    value={detail.password}
                    placeholder="Enter your Password"
                    onChange={handleChange}
                    disabled={loading}
                    required
                    className="w-full px-4 py-3 border-2 border-base-300 rounded-lg focus:outline-none focus:border-primary transition disabled:cursor-not-allowed disabled:bg-base-200"
                  />
                </div>
              </div>

              {/* Button */}

              <div>
                {/* Regular Login */}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-secondary text-secondary-content font-bold py-3 px-6 rounded-lg shadow-lg w-full disabled:cursor-not-allowed"
                  >
                    {loading ? "Loading..!" : "Login Now"}
                  </button>
                </div>

                <div className="text-center py-2">Or</div>

                {/* Google Login button */}

                <div className="">
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
                      onClick={GoogleLogin}
                      className="btn btn-outline font-sans flex items-center justify-center gap-2 w-full"
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
                </div>
              </div>

              <div className="py-5">
                <div className="text-end ">
                  <div className="flex gap-1 ">
                    <span className="text-gray-400"> Didn't have account?</span>
                    <div className="">
                      <button
                        type="button"
                        onClick={() => navigate("/SignUp")}
                        disabled={isLoading}
                        className="text-primary hover:underline"
                      >
                        Create Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
