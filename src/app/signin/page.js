import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
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
          <h1 className="text-2xl font-bold mb-6 text-black">Hi, welcome back!</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Log in
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-500">
            Doesn&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
