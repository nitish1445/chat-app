import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../config/Api";

const Login = () => {
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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("/auth/login", detail);
      toast.success(res.data.message);
      navigate("/user-dashboard")

      // sessionStorage.setItem("ChatKaroUser", JSON.stringify(res.data.data));
      handleClear();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unkown Error");
    } finally {
      setIsLoading(false);
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
                    disabled={isLoading}
                    required
                    className="w-full px-4 py-3 border-2 border-base-300 rounded-lg focus:outline-none focus:border-primary transition disabled:cursor-not-allowed disabled:bg-base-200"
                  />

                  <input
                    type="password"
                    name="password"
                    value={detail.password}
                    placeholder="Enter your Password"
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    className="w-full px-4 py-3 border-2 border-base-300 rounded-lg focus:outline-none focus:border-primary transition disabled:cursor-not-allowed disabled:bg-base-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-secondary text-secondary-content font-bold py-3 px-6 rounded-lg shadow-lg w-full disabled:cursor-not-allowed"
              >
                {isLoading ? "Loading..!" : "Login Now"}
              </button>

              <div className="pb-5">
                <div className="border-b-2 border-base-300 text-center py-3">
                  <button
                    type="submit"
                    className="text-base-content/70 hover:text-primary hover:underline"
                  >
                    Forgotten Password?
                  </button>
                </div>

                <div className="text-center pt-5">
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/SignUp");
                    }}
                    disabled={isLoading}
                    className="flex-1 bg-base-200 text-primary font-bold py-3 px-6 rounded-lg shadow-lg disabled:cursor-not-allowed"
                  >
                    Didn't have account?
                  </button>
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
