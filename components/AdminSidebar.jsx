"use client";
import { useUser } from "@civic/auth/react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AiOutlineUser,
  AiOutlineEdit,
  AiOutlineFileText,
  AiOutlineUserAdd,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineLogout,
  AiOutlineHome,
  AiOutlineCloudUpload,
} from "react-icons/ai";

import { useRouter } from "next/navigation";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { signOut, user } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const menuItems = [
    {
      path: "/admin",
      name: "Home",
      icon: <AiOutlineHome className="w-5 h-5" />,
    },
    {
      path: "#/dashboard/profile",
      name: "Profile",
      icon: <AiOutlineUser className="w-5 h-5" />,
    },
    {
      path: "#/dashboard/update-profile",
      name: "Update Profile",
      icon: <AiOutlineEdit className="w-5 h-5" />,
    },
    {
      path: "/admin/students",
      name: "All Students",
      icon: <AiOutlineUserAdd className="w-5 h-5" />,
    },
    {
      path: "#/admin/results",
      name: "All Results",
      icon: <AiOutlineFileText className="w-5 h-5" />,
    },
    {
      path: "/admin/upload-result",
      name: "Upload Result",
      icon: <AiOutlineCloudUpload className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 cursor-pointer left-4 z-50 p-2 rounded-md md:hidden bg-[#131734] text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed cursor-pointer inset-0 bg-black/50 backdrop-blur-sm md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full bg-[#131734] text-white w-64 
        transform transition-transform duration-200 ease-in-out
        md:translate-x-0 z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"}
        border-r border-white/10 backdrop-blur-lg
      `}
      >
        <div className="p-4 space-y-2">
          <h2 className="text-2xl font-bold mb-6 p-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Admin Dashboard
          </h2>

          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`
                flex items-center space-x-3 p-4 rounded-lg
                hover:bg-white/10 transition-colors
                ${
                  pathname === item.path
                    ? "bg-white/10 border-r-4 border-blue-500"
                    : ""
                }
              `}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
          {/* Enhanced logout button */}
          <div className="absolute bottom-0 left-0 w-full p-4">
            <button
              className="flex items-center justify-center space-x-3 p-4 rounded-lg w-full
              bg-red-500/10 hover:bg-red-500/20 transition-all duration-300 
              text-red-400 hover:text-red-300 border border-red-500/20
              group relative overflow-hidden cursor-pointer"
              onClick={handleSignOut}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 
    opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <AiOutlineLogout className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
