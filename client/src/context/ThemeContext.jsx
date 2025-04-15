// context/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [layout, setLayout] = useState(localStorage.getItem("layout") || "spacious");
  const [sidebarPosition, setSidebarPosition] = useState(localStorage.getItem("sidebar") || "left");
  const [fontSize, setFontSize] = useState(localStorage.getItem("fontSize") || "medium");

  // 🔥 Apply global styles when preferences change
  useEffect(() => {
    // Theme
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);

    // Layout
    document.body.classList.remove("layout-compact", "layout-spacious");
    document.body.classList.add(`layout-${layout}`);
    localStorage.setItem("layout", layout);

    // Font Size
    document.body.classList.remove("text-sm", "text-base", "text-lg");
    document.body.classList.add(
      fontSize === "small" ? "text-sm" : fontSize === "large" ? "text-lg" : "text-base"
    );
    localStorage.setItem("fontSize", fontSize);

    // Sidebar Position
    document.body.classList.remove("sidebar-left", "sidebar-right");
    document.body.classList.add(`sidebar-${sidebarPosition}`);
    localStorage.setItem("sidebar", sidebarPosition);
  }, [theme, layout, sidebarPosition, fontSize]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        layout,
        setLayout,
        sidebarPosition,
        setSidebarPosition,
        fontSize,
        setFontSize
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
