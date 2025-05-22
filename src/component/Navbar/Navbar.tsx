"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserContext } from "@/app/context/UserContext";
import { Download, Menu, X } from "lucide-react";

function Navbar() {
  const pathname = usePathname(); // For active tab detection
  const { taskList, isDarkMode } = useContext(UserContext);
  const [downloading, setDownloading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDownloadAll = async () => {
    if (!taskList || taskList.length === 0) {
      alert("No tasks available to download.");
      return;
    }

    setDownloading(true);
    try {
      const response = await fetch("/api/export-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      className={`relative flex items-center justify-between px-6 py-4 shadow-md ${
        isDarkMode
          ? "bg-gray-900 text-gray-100 shadow-black/40"
          : "bg-white text-gray-900 shadow-gray-300"
      }`}
      role="navigation"
      aria-label="Primary Navigation"
    >
      {/* Logo */}
      <div className="text-xl w-1/3 font-semibold tracking-wide">
        <Link href="/">
          <span className="hover:text-blue-500 transition-colors cursor-pointer">
            TaskManager
          </span>
        </Link>
      </div>

      {/* Hamburger Button (mobile only) */}
      <button
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop & mobile menu container */}
      <div
        className={`
          flex-1 md:flex md:items-center md:justify-between
          ${mobileMenuOpen ? "block absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md rounded-b-md px-6 py-4 md:static md:bg-transparent md:shadow-none md:rounded-none" : "hidden md:flex"}
          z-20
        `}
      >
        {/* Nav links */}
        <div className="flex flex-col gap-4 md:flex-row md:gap-8 text-lg font-medium">
          <Link
            href="/tasks"
            className={`relative px-2 py-1 rounded-md transition-colors ${
              pathname === "/tasks"
                ? "text-blue-600 font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
                : "text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Tasks
          </Link>
          <Link
            href="/users"
            className={`relative px-2 py-1 rounded-md transition-colors ${
              pathname === "/users"
                ? "text-blue-600 font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
                : "text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Users
          </Link>
        </div>

        {/* Download Button */}
        {!isHomePage && (
          <button
            onClick={handleDownloadAll}
            disabled={downloading}
            aria-label="Download all tasks as CSV file"
            className={`mt-4 md:mt-0 flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
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
      </div>
    </nav>
  );
}

export default Navbar;
