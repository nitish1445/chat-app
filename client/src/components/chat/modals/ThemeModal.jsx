import React, { useEffect, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";

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
  const { theme, changeTheme } = useTheme();
  const [tempTheme, setTempTheme] = useState(theme);

  useEffect(() => {
    setTempTheme(theme);
  }, [theme]);

  const applyTheme = () => {
    changeTheme(tempTheme);
    onClose();
  };

  const cancelTheme = () => {
    setTempTheme(theme);
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
