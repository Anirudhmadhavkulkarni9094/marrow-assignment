"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {   
  const pathname = usePathname(); // For active tab detection

  return (
    <div className="flex justify-center gap-10 items-center bg-gray-200 p-4">
      
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
  );
}

export default Navbar;
