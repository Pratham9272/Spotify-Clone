import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { dark, setDark } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold dark:text-white">Admin Dashboard</h1>
      <button
        onClick={() => setDark(!dark)}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Toggle Theme
      </button>
    </header>
  );
}