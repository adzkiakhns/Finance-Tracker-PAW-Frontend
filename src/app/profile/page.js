"use client";

import { Sidebar } from "@/components/sidebar";
import { IoPencil, IoPerson } from "react-icons/io5";
import { useGetProfile, useEditProfile } from "@/hooks/profile";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { mutate: editProfile } = useEditProfile(); // `mutate` function to update profile
  const { data: profileData } = useGetProfile(); // Fetch profile data
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    target: "",
    balance: "",
  });

  useEffect(() => {
    // Set initial form data when profileData is available
    if (profileData) {
      setProfile({
        name: profileData.name || "",
        email: profileData.email || "",
        mobileNumber: profileData.mobileNumber || "Add number",
        target: profileData.target || "Rp 50,000,000",
        balance: profileData.balance || "Rp 150,000,000",
      });
    }
  }, [profileData]);

  const handleEditClick = () => {
    editProfile(profile); // Call the mutation to save changes
  };

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  console.log(profileData);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center md:pl-0 pl-64">
      <Sidebar />
      <div className="w-full max-w-sm bg-white text-black p-6 rounded-lg shadow-lg">
        {/* Profile Header */}
        <div className="flex flex-row w-full h-full items-center gap-2">
          <div className="relative w-16 h-16">
            <IoPerson className="w-16 h-16 rounded-full p-2 border" />
            <div className="absolute bottom-0 flex items-center justify-center right-0 bg-orange-500 w-5 h-5 rounded-full p-1">
              <IoPencil className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="text-black w-full flex h-full flex-col gap-2">
            <h3 className="text-lg font-semibold">{profile.name ?? "asdasd"}</h3>
            <p className="text-sm text-gray-600">{profile.email}</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="mt-6 space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm text-gray-500">Name</label>
            <input
              className="bg-gray-100 py-2 px-4 rounded-md w-full"
              value={profile.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          {/* Mobile Number Field */}
          <div>
            <label className="block text-sm text-gray-500">Mobile number</label>
            <input
              className="bg-gray-100 py-2 px-4 rounded-md w-full"
              value={profile.mobileNumber}
              onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
            />
          </div>

          {/* Target Field */}
          <div>
            <label className="block text-sm text-gray-500">Target</label>
            <input
              className="bg-gray-100 py-2 px-4 rounded-md w-full"
              value={profile.target}
              onChange={(e) => handleInputChange("target", e.target.value)}
            />
          </div>

          {/* Balance Field */}
          <div>
            <label className="block text-sm text-gray-500">Balance</label>
            <input
              className="bg-gray-100 py-2 px-4 rounded-md w-full"
              value={profile.balance}
              onChange={(e) => handleInputChange("balance", e.target.value)}
            />
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="mt-6">
          <button
            onClick={handleEditClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            Save Change
          </button>
        </div>
      </div>
    </div>
  );
}
