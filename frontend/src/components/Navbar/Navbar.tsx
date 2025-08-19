import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import ExploreMenu from "./ExploreMenu";
import SearchBar from "./SearchBar";
import DesktopLinks from "./DesktopLinks";
import MobileSearch from "./MobileSearch";
import MobileMenu from "./MobileMenu";
import { useAuthStore } from "../../store/auth.store";

function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Logo />
          <ExploreMenu />
          <SearchBar />
          <DesktopLinks user={user} logout={logout} navigate={navigate} />
          <MobileSearch />
          <MobileMenu user={user} logout={logout} navigate={navigate} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
