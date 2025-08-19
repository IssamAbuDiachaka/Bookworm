import { Link } from "react-router-dom";
import AuthSection from "./AuthSection";
import type { AuthProps } from "./types";

function DesktopLinks({ user, logout, navigate }: AuthProps) {
  return (
    <div className="hidden md:flex items-center gap-4">
      <Link
        to="/dashboard"
        className="text-sm font-medium text-gray-700 hover:text-blue-600"
      >
        Dashboard
      </Link>
      <Link
        to="/about"
        className="text-sm font-medium text-gray-700 hover:text-blue-600"
      >
        About
      </Link>
      <AuthSection user={user} logout={logout} navigate={navigate} />
    </div>
  );
}

export default DesktopLinks;
