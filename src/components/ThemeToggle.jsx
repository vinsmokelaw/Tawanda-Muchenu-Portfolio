import { Moon, Sun, Palette } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const palettes = ["green", "blue", "red", "sun"];
const modes = ["light", "dark"];

export const ThemeToggle = () => {
  const [palette, setPalette] = useState("green");
  const [mode, setMode] = useState("light");

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      const [savedPalette, savedMode] = savedTheme.split("-");
      if (palettes.includes(savedPalette) && modes.includes(savedMode)) {
        setPalette(savedPalette);
        setMode(savedMode);
        document.documentElement.setAttribute(
          "data-theme",
          `${savedPalette}-${savedMode}`
        );
      }
    } else {
      localStorage.setItem("theme", "green-light");
      document.documentElement.setAttribute("data-theme", "green-light");
    }
  }, []);

  // Update the theme whenever palette or mode changes
  useEffect(() => {
    const theme = `${palette}-${mode}`;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [palette, mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const icon =
    mode === "dark" ? (
      <Sun className="h-6 w-6 text-yellow-300" />
    ) : (
      <Moon className="h-6 w-6 text-blue-900" />
    );

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center space-x-2">
      {/* Palette Dropdown */}
      <select
        value={palette}
        onChange={(e) => setPalette(e.target.value)}
        className="p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        {palettes.map((p) => (
          <option key={p} value={p}>
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </option>
        ))}
      </select>

      {/* Light/Dark Toggle */}
      <button
        onClick={toggleMode}
        className={cn(
          "p-2 rounded-full transition-colors duration-300 shadow-lg",
          "bg-white dark:bg-gray-800"
        )}
        title={`Toggle ${mode === "light" ? "Dark" : "Light"} Mode`}
      >
        {icon}
      </button>
    </div>
  );
};
