"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [wrong, setWrong] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      setIsLoading(false);

      if (!res?.error) {
        router.push("/dashboard");
      } else {
        setWrong(true);
        setTimeout(() => {
          setWrong(false);
        }, 3000);
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-black bg-gray-50 p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left section with image/illustration */}
        <div className="w-full lg:w-1/2 p-8 bg-blue-50 flex items-center justify-center">
          <Image
            src="/auth/signin.png" // Replace with your own image or SVG path
            alt="Illustration"
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>

        {/* Right section with the form */}
        <div className="w-full lg:w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-6 text-orange-600">Hi, welcome back!</h1>
          <form onSubmit={handleSubmit}>
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

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Log in"}
            </button>
          </form>

          {wrong && <p className="mt-4 text-red-500 text-center">Invalid credentials. Please try again.</p>}

          <p className="mt-4 text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-orange-600 hover:text-orange-500">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
