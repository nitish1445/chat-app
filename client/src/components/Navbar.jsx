import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HiOutlineX, HiMenu } from "react-icons/hi";

const Navbar = () => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef(null);

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Disable page scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <>
      {!isLogin && (
        <div className="sticky top-0 z-40 bg-linear-to-r from-cyan-600 to-sky-600 shadow-lg shadow-cyan-900/20 flex justify-between py-3 px-8 items-center text-white">
          {/* Logo */}
          <div className="text-xl font-bold">
            <Link to="/">Converse</Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-3">
            <button
              className="px-5 py-2 bg-white text-cyan-700 font-semibold rounded-lg hover:bg-cyan-50 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="px-5 py-2 bg-cyan-700 text-white font-semibold rounded-lg hover:bg-cyan-800 transition border border-white/20"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(true)}
          >
            <HiMenu />
          </button>
        </div>
      )}

      {/* Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-slate-900/90 z-40 md:hidden"/>
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed right-0 top-0 h-full w-[65%] max-w-sm bg-linear-to-b from-cyan-600 to-sky-700 text-white shadow-2xl z-50 transform transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/20">
          <span className="text-xl font-semibold">Converse</span>

          <HiOutlineX
            className="w-6 h-6 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-5 px-6 py-6 text-lg">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>

          <div className="border-t border-white/20 pt-6 flex flex-col gap-4">
            <button
              className="px-5 py-3 bg-white text-cyan-700 font-semibold rounded-lg hover:bg-cyan-50 transition w-full"
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
            >
              Login
            </button>

            <button
              className="px-5 py-3 bg-cyan-700 text-white font-semibold rounded-lg hover:bg-cyan-800 transition border border-white/20 w-full"
              onClick={() => {
                navigate("/signup");
                setMenuOpen(false);
              }}
            >
              Sign Up
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
