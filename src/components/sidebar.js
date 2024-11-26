"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  // Define an array for the navigation links
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icons: <MdDashboard className="w-5 h-5" /> },
    { name: "Form", path: "/form", icons: <FaWpforms className="w-5 h-5" /> },
    { name: "Profile", path: "/profile", icons: <CgProfile className="w-5 h-5" /> },
  ];

  return (
    <div>
      {/* Hamburger Button for Smaller Screens */}
      <button
        className="md:hidden fixed top-4 text-poppins left-4 z-50 p-3 bg-orange-500 text-white rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md rounded-md p-4 transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Brand Logo */}
        <div className="text-2xl font-bold text-center text-orange-500 mb-8">
          <Link href="/">PennyWise</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-grow">
          {navItems.map((item) => (
            <Link key={item.name} href={item.path}>
              <div
                className={`flex gap-2 text-sm items-center p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                  pathname === item.path ? "bg-orange-500 text-white shadow-lg" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {/* Icon */}
                {item.icons}
                {/* Link Name */}
                <span className="flex-grow">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Sign Out Button */}
        <button
          type="button"
          onClick={() => signOut()}
          className="w-full bg-red-500 text-white font-medium p-3 rounded-lg mt-auto"
        >
          Sign Out
        </button>
      </div>

      {/* Background Overlay for Small Screens */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setIsOpen(false)}></div>
      )}
    </div>
  );
}

export default Sidebar;
