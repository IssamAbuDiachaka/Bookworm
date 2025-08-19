import { Link } from "react-router-dom";
import type { AuthProps } from "./types";

function AuthSection({ user, logout, navigate }: AuthProps) {
  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-800">
          {user.username}
        </span>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <>
      <Link
        to="/login"
        className="text-sm font-medium text-gray-700 hover:text-blue-600"
      >
        Log In
      </Link>
      <Link
        to="/register"
        className="px-4 py-2 rounded-md text-blue-600 border border-blue-600 text-sm font-semibold hover:bg-blue-100"
      >
        Join
      </Link>
    </>
  );
}

export default AuthSection;
