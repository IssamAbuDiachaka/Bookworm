import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="hidden md:flex flex-1 px-6">
      <div className="relative w-full max-w-3xl">
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
  );
}

export default SearchBar;
