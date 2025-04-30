"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserContext } from "@/app/context/UserContext";
import {Download } from "lucide-react"
function Navbar() {   
  const pathname = usePathname(); // For active tab detection
  const { taskList } = useContext(UserContext);
  const handleDownloadAll = async () => {
    if (!taskList || taskList.length === 0) {
      alert("No tasks available to download.");
      return;
    }
  
    const response = await fetch('/api/export-tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
  };
  
  return (
    <div className="flex justify-between gap-10 items-center bg-gray-200 p-4">
     <div className="w-6"></div>
      <div className="flex gap-10">

        <Link
          href="/tasks"
          className={pathname === "/tasks" ? "font-bold" : "font-normal"}
          >
          Tasks
        </Link>
        <Link
          href="/users"
          className={pathname === "/users" ? "font-bold" : "font-normal"}
          >
          Users
        </Link>
        </div>
        <button
  onClick={handleDownloadAll}
  className="bg-blue-600 text-white flex gap-2 py-1 px-2  rounded-xl cursor-pointer"
>
 <span>Download All Tasks as CSV</span>  <Download></Download>
</button>

    </div>
  );
}

export default Navbar;
