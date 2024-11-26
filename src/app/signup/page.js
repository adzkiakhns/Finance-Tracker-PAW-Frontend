"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { axios } from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";

// Modal component for error messages
const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="w-full mt-4 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default function SignUpPage() {
  const [fullname, setFullname] = useState("");
  const [target, setTarget] = useState(0);
  const [balance, setBalance] = useState(0);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [modalMessage, setModalMessage] = useState(null); // Modal message state
  const router = useRouter();

  // Password validation logic
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (confirmPassword && value !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError(null);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password && value !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError(null);
    }
  };

  // Form submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) {
      setModalMessage("Please fix the errors before submitting.");
      return;
    }

    try {
      console.log("Submitting data:", { fullname, target, balance, username, email, password });
      const response = await axios.post(
        "/api/users/register", // Replace with actual API URL
        {
          name: fullname,
          target,
          balance: parseFloat(balance),
          username,
          email,
          password,
        },
        { withCredentials: true }, // Ensure credentials are sent if necessary
      );

      if (response.status === 200 || response.status === 201) {
        router.push("/signin");
      }
    } catch (error) {
      if (error.response) {
        console.error("There was an error during signup:", error.response.data);
        setModalMessage(`Sign up failed: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        setModalMessage("No response from the server. Please try again.");
      } else {
        console.error("Error setting up the request:", error.message);
        setModalMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 text-black">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left section with image/illustration */}
        <div className="w-full lg:w-1/2 p-8 bg-blue-50 flex items-center justify-center">
          <Image
            src="/auth/signup.png" // Replace with your own image path
            alt="Sign up illustration"
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>

        {/* Right section with the form */}
        <div className="w-full lg:w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-6 text-black">Create an account</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="target" className="block text-sm font-medium text-gray-700">
                Target
              </label>
              <input
                type="number"
                id="target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="balance" className="block text-sm font-medium text-gray-700">
                Balance
              </label>
              <input
                type="number"
                id="balance"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors"
              disabled={passwordError !== null}
            >
              Sign up
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/signin" className="font-medium text-orange-600 hover:text-orange-500">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      {/* Modal for displaying errors */}
      {modalMessage && <Modal message={modalMessage} onClose={() => setModalMessage(null)} />}
    </div>
  );
}
