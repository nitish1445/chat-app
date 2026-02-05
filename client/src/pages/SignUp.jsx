import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../config/Api";

const SignUp = () => {
  const [detail, setDetail] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleClear = () => {
    setDetail({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const submitSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(detail);

      const res = await api.post("/auth/signup", detail);
      toast.success(res.data.message);

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
        <div className="max-w-120 mx-auto mt-12">
          <div className="bg-base-100 rounded-xl shadow-2xl overflow-hidden">
            <form
              onSubmit={submitSignUp}
              onReset={handleClear}
              className="pt-5 px-5"
            >
              <h1 className="text-2xl font-bold text-base-content mb-5">
                Register Now
              </h1>

              <div className="mb-5">
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={detail.fullName}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                      className="w-full px-4 py-3 border-2 border-base-300 rounded-lg focus:outline-none focus:border-primary transition disabled:cursor-not-allowed disabled:bg-base-200"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter you email"
                      value={detail.email}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                      className="w-full px-4 py-3 border-2 border-base-300 rounded-lg focus:outline-none focus:border-primary transition disabled:cursor-not-allowed disabled:bg-base-200"
                    />
                  </div>

                  <div>
                    <input
                      type="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={detail.phone}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                      className="w-full px-4 py-3 border-2 border-base-300 rounded-lg focus:outline-none focus:border-primary transition disabled:cursor-not-allowed disabled:bg-base-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
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

                    <div>
                      <input
                        type="confirmPassword"
                        name="confirmPassword"
                        value={detail.confirmPassword}
                        placeholder="Confirm your Password"
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                        className="w-full px-4 py-3 border-2 border-base-300 rounded-lg focus:outline-none focus:border-primary transition disabled:cursor-not-allowed disabled:bg-base-200"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-secondary text-secondary-content font-bold py-3 px-6 rounded-lg shadow-lg w-full disabled:cursor-not-allowed"
              >
                {isLoading ? "Loading..!" : "Create Account"}
              </button>

              <div className="text-end ">
                <div className="py-5 flex gap-1 ">
                  <span className="text-gray-400"> Aready have account?</span>
                  <div className="">
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      disabled={isLoading}
                      className="text-primary hover:underline"
                    >
                      Login here
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <p className="text-center text-base-content/60 mt-5 text-sm">
            All fields marked are mandatory. We respect your privacy.
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
