import { useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function Settings() {
  const {
    theme,
    setTheme,
    layout,
    setLayout,
    sidebarPosition,
    setSidebarPosition,
    fontSize,
    setFontSize
  } = useTheme();

  const darkMode = theme === "dark";



  return (
    <div
      className={`p-6 min-h-screen transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-8">🎨 Appearance Settings</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-6">
        {/* Dark Mode Toggle */}
        <div className="flex justify-between items-center">
          <label className="font-medium">🌙 Enable Dark Mode</label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setTheme(darkMode ? "light" : "dark")} // ✅ fixed
            className="w-5 h-5"
          />
        </div>

        {/* Layout Preference */}
        <div>
          <label className="block font-medium mb-2">🧱 Layout Preference</label>
          <select
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          >
            <option value="compact">Compact</option>
            <option value="spacious">Spacious</option>
          </select>
        </div>

        {/* Sidebar Position */}
        <div>
          <label className="block font-medium mb-2">📐 Sidebar Position</label>
          <select
            value={sidebarPosition}
            onChange={(e) => setSidebarPosition(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          >
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>

        {/* Font Size */}
        <div>
          <label className="block font-medium mb-2">🔠 Font Size</label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          >
            <option value="small">Small</option>
            <option value="medium">Medium (Default)</option>
            <option value="large">Large</option>
          </select>
        </div>

        <button
          className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={() =>
            alert(
              `Saved settings:\nDark Mode: ${darkMode}\nLayout: ${layout}\nSidebar: ${sidebarPosition}\nFont Size: ${fontSize}`
            )
          }
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
