"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserContext } from "@/app/context/UserContext";
import { Download } from "lucide-react";

function Navbar() {
  const pathname = usePathname(); // For active tab detection
  const { taskList, isDarkMode } = useContext(UserContext);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadAll = async () => {
    if (!taskList || taskList.length === 0) {
      alert("No tasks available to download.");
      return;
    }

    setDownloading(true);
    try {
      const response = await fetch("/api/export-tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tasks: taskList }),
      });

      if (!response.ok) {
        alert("Failed to generate CSV file.");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "all-tasks.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } finally {
      setDownloading(false);
    }
  };

  const path = usePathname();
  const isHomePage = path.split("/")[path.split("/").length - 1] === "";

  return (
    <nav
      className={`flex justify-between items-center px-6 py-4 shadow-md ${
        isDarkMode
          ? "bg-gray-900 text-gray-100 shadow-black/40"
          : "bg-white text-gray-900 shadow-gray-300"
      }`}
      role="navigation"
      aria-label="Primary Navigation"
    >
      <div className="text-xl font-semibold tracking-wide">
        <Link href="/">
          <span className="hover:text-blue-500 transition-colors cursor-pointer">
            TaskManager
          </span>
        </Link>
      </div>

      <div className="flex gap-8 text-lg font-medium">
        <Link
          href="/tasks"
          className={`relative px-2 py-1 rounded-md transition-colors ${
            pathname === "/tasks"
              ? "text-blue-600 font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
        >
          Tasks
        </Link>
        <Link
          href="/users"
          className={`relative px-2 py-1 rounded-md transition-colors ${
            pathname === "/users"
              ? "text-blue-600 font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
        >
          Users
        </Link>
      </div>

      {!isHomePage && (
        <button
          onClick={handleDownloadAll}
          disabled={downloading}
          aria-label="Download all tasks as CSV file"
          className={`flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            downloading
              ? "bg-blue-400 cursor-not-allowed text-white"
              : isDarkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          <Download size={20} />
          <span>{downloading ? "Downloading..." : "Download All Tasks"}</span>
        </button>
      )}
    </nav>
  );
}

export default Navbar;
