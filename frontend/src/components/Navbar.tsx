import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left: Logo + Search */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Bookworm
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex">
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="px-4 py-2 w-64 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right: Links + Auth */}
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-sm font-medium text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-blue-600">
              About
            </Link>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-800">{user.name}</span>
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
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
                >
                  Join for Free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
