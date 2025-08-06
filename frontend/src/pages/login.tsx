import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-gray-300 rounded-full mb-2"></div>
          <h1 className="text-2xl font-semibold text-blue-600">Bookworm</h1>
        </div>

        {/* Info */}
        <p className="text-center text-sm text-gray-500 mb-4">
          Only login via email, Google, or +86 phone number login is supported in your region.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email/Phone Input */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaEnvelope />
            </span>
            <input
              type="text"
              placeholder="Phone number / email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaLock />
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
              👁️
            </span>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-500">
            By signing up or logging in, you consent to Bookworm’s{" "}
            <span className="text-blue-600 underline cursor-pointer">Terms of Use</span> and{" "}
            <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>.
          </p>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition font-medium"
          >
            Log in
          </button>

          {/* Footer Links */}
          <div className="flex justify-between text-sm text-blue-600 font-medium">
            <button type="button" className="hover:underline">
              Forgot password?
            </button>
            <button type="button" className="hover:underline">
              Sign up
            </button>
          </div>
        </form>

        {/* OR divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google login */}
        <button className="w-full border border-gray-300 flex items-center justify-center py-2 rounded-md hover:bg-gray-100 transition">
          <FcGoogle className="mr-2 text-xl" />
          Log in with Google
        </button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-xs text-gray-400 text-center">
        浙ICP备2023025841号 · <span className="underline cursor-pointer">Contact us</span>
      </div>
    </div>
  );
};

export default Login;
