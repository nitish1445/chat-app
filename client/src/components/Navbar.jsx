import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState("");

  const handleThemeChange = (event) => {
    // value of selected option
    setTheme(event.target.value);
    // saved at local storage as it remains forever
    localStorage.setItem("ChatKaroTheme", event.target.value);
    // changes direclty at index.html at <HTML data-theme></HTML>
    document.documentElement.setAttribute("data-theme", event.target.value);
  };

  const navigate = useNavigate();

  // useEffect with [] refersh once at click
  useEffect(() => {
    // get the theme value storedat local storage
    const currentTheme = localStorage.getItem("ChatKaroTheme");
    document.documentElement.setAttribute("data-theme", currentTheme);
    setTheme(currentTheme);
  }, []);
  return (
    <>
      <div className="sticky top-0 bg-primary flex justify-between py-2 px-4 items-center">
        <Link to={"/"}>ChatKaro</Link>

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

          {/* Flyon UI theme selector */}
          
          <select
            name="theme"
            id="theme"
            className="select"
            onChange={handleThemeChange}
            value={theme}
          >
            <option value="">Default</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="claude">Claude</option>
            <option value="spotify">Spotify</option>
            <option value="vscode">VSCode</option>
            <option value="black">Black</option>
            <option value="corporate">Corporate</option>
            <option value="ghibli">Ghibli</option>
            <option value="gourmet">Gourmet</option>
            <option value="luxury">Luxury</option>
            <option value="mintlify">Mintlify</option>
            <option value="pastel">Pastel</option>
            <option value="perplexity">Perplexity</option>
            <option value="shadcn">Shadcn</option>
            <option value="slack">Slack</option>
            <option value="soft">Soft</option>
            <option value="valorant">Valorant</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Navbar;
