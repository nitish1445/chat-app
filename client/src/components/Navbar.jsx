import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isLogin } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      {!isLogin && (
        <div className="sticky top-0 bg-primary flex justify-between py-2 px-8 items-center">
          {/* logo Section */}

          <div className="text-xl font-bold text-white">
            <Link to={"/"} className="">
              ChatKaro
            </Link>
          </div>

          {/* Home */}

          <div className="flex gap-4">
            <Link to={"/"} className="">
              Home
            </Link>
            <Link to={"/about"} className="">
              About
            </Link>
            <Link to={"/contact"} className="">
              Contact
            </Link>
          </div>

          {/* Button Section */}

          <div className="flex gap-3">
            {/* Logim Button */}

            <button
              className="btn btn-secondary"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>

            {/* SignUp Button */}

            <button
              className="btn btn-secondary-accent"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
