// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ThemeModal = ({ onClose }) => {
//   const [theme, setTheme] = useState("");
//   const handleThemeChange = (event) => {
//     setTheme(event.target.value);
//     localStorage.setItem("ChatKaroTheme", event.target.value);
//     document.documentElement.setAttribute("data-theme", event.target.value);
//   };

//   const navigate = useNavigate();

//   // useEffect with [] refersh once at click
//   useEffect(() => {
//     // get the theme value storedat local storage
//     const currentTheme = localStorage.getItem("ChatKaroTheme");
//     document.documentElement.setAttribute("data-theme", currentTheme);
//     setTheme(currentTheme);
//   }, []);
//   return (
//     <>
//       <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//         <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-md p-8 shadow-2xl text-white relative">
//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-8 text-gray-400 hover:text-red-400 text-xl cursor-pointer"
//           >
//             {/* <RxCross2 /> */}X
//           </button>

//           {/* Header */}
//           <h2 className="text-2xl font-bold mb-6 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-center">
//             Change Theme
//           </h2>
//         </div>
//         <div>
//           <select
//             name="theme"
//             id="theme"
//             className="select"
//             onChange={handleThemeChange}
//             value={theme}
//           >
//             <option value="">Default</option>
//             <option value="perplexity">Perplexity</option>
//             <option value="light">Light</option>
//             <option value="vscode">Dark</option>
//             <option value="claude">Claude</option>
//             <option value="spotify">Spotify</option>
//             <option value="dark">Dark</option>
//             <option value="black">Black</option>
//             <option value="corporate">Corporate</option>
//             <option value="ghibli">Ghibli</option>
//             <option value="gourmet">Gourmet</option>
//             <option value="luxury">Luxury</option>
//             <option value="mintlify">Mintlify</option>
//             <option value="pastel">Pastel</option>
//             <option value="shadcn">Shadcn</option>
//             <option value="slack">Slack</option>
//             <option value="soft">Soft</option>
//             <option value="valorant">Valorant</option>
//           </select>
//         </div>
//       </div>

//       {/* Flyon UI theme selector */}
//     </>
//   );
// };

// export default ThemeModal;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const themes = [
  "default",
  "perplexity",
  "light",
  "vscode",
  "claude",
  "spotify",
  "dark",
  "black",
  "corporate",
  "ghibli",
  "gourmet",
  "luxury",
  "mintlify",
  "pastel",
  "shadcn",
  "slack",
  "soft",
  "valorant",
];

const ThemeModal = ({ onClose }) => {
  const [savedTheme, setSavedTheme] = useState("");
  const [tempTheme, setTempTheme] = useState("");

  useEffect(() => {
    const currentTheme = localStorage.getItem("ChatKaroTheme") || "";
    setSavedTheme(currentTheme);
    setTempTheme(currentTheme);
  }, []);

  // OK button
  const applyTheme = () => {
    localStorage.setItem("ChatKaroTheme", tempTheme);
    document.documentElement.setAttribute("data-theme", tempTheme);
    setSavedTheme(tempTheme);
    onClose();
  };

  // Cancel button
  const cancelTheme = () => {
    setTempTheme(savedTheme);
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-base-100 border border-base-300 rounded-2xl w-full max-w-md py-4 shadow-2xl relative">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-6">Change Theme</h2>

        {/* Theme Selector */}
        <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto px-8">
          {themes.map((t) => (
            <label
              key={t}
              className={`cursor-pointer border rounded-lg p-3 flex items-center gap-3 capitalize transition
              ${tempTheme === t ? "border-primary bg-base-200" : "border-base-300"}`}
            >
              <input
                type="radio"
                name="theme"
                value={t}
                checked={tempTheme === t}
                onChange={() => setTempTheme(t)}
                className="radio radio-primary"
              />

              <span>{t}</span>
            </label>
          ))}
        </div>


        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-3 px-6">
          <button onClick={cancelTheme} className="btn btn-outline">
            Cancel
          </button>

          <button onClick={applyTheme} className="btn btn-primary">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeModal;
