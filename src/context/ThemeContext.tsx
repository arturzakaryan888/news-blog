"use client";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      //@ts-ignore
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (!mounted) return null;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="inline-flex justify-center items-center w-full p-2 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700"
      >
        {theme === "light" ? (
          <FaSun className="w-5 h-5 mr-2" />
        ) : (
          <FaMoon className="w-5 h-5 mr-2" />
        )}
        {theme === "light" ? "Light Mode" : "Dark Mode"}
        <svg
          className="w-5 h-5 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 origin-top-right bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <button
            onClick={() => setTheme("light")}
            className={`flex items-center block w-full text-left px-4 py-2 text-sm ${
              theme === "light"
                ? "text-blue-500 font-semibold"
                : "text-gray-700 dark:text-gray-200"
            }`}
          >
            <FaSun className="w-5 h-5 mr-2" />
            Light Mode
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`flex items-center block w-full text-left px-4 py-2 text-sm ${
              theme === "dark"
                ? "text-blue-500 font-semibold"
                : "text-gray-700 dark:text-gray-200"
            }`}
          >
            <FaMoon className="w-5 h-5 mr-2" />
            Dark Mode
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitch;
