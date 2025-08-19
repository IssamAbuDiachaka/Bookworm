import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import AuthSection from "./AuthSection";
import type { AuthProps } from "./types";

function MobileMenu({ user, logout, navigate }: AuthProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        className="md:hidden text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg p-4 space-y-3">
          <Link to="/explore" className="block text-gray-700">
            Explore
          </Link>
          <Link to="/dashboard" className="block text-gray-700">
            Dashboard
          </Link>
          <Link to="/about" className="block text-gray-700">
            About
          </Link>
          <AuthSection user={user} logout={logout} navigate={navigate} />
        </div>
      )}
    </>
  );
}

export default MobileMenu;
