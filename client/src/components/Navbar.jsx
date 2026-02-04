import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState("");

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
    localStorage.setItem("ChatKaroTheme", event.target.value);
    document.documentElement.setAttribute("data-theme", event.target.value);
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("ChatKaroTheme");
    document.documentElement.setAttribute("data-theme", currentTheme);
    setTheme(currentTheme);
  }, []);
  return (
    <>
      <div className="bg-primary flex justify-between py-2 px-4 items-center">
        <h1>ChatKaro</h1>

        <div className="flex gap-4">
          <span>Home</span>
          <span>About</span>
          <span>Contact Us</span>
        </div>

        <div className="flex gap-3">
          <button className="btn btn-secondary">Login</button>
          <button className="btn btn-secondary-accent">Register</button>
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
