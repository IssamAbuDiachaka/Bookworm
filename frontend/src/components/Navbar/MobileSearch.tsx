import { Search } from "lucide-react";
import { useState } from "react";

function MobileSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <div className="md:hidden flex items-center">
        <button
          className="text-gray-700"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Search size={22} />
        </button>
      </div>

      {/* Dropdown Search */}
      {isSearchOpen && (
        <div className="md:hidden border-t bg-white shadow-inner px-4 py-3">
          <div className="relative">
            <input
              type="text"
              placeholder="What do you want to learn?"
              className="px-4 py-2 w-full rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600">
              <Search size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileSearch;
