import { Link } from "react-router-dom";
import { useState } from "react";

function ExploreMenu() {
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  return (
    <div
      className="relative hidden md:block"
      onMouseEnter={() => setIsExploreOpen(true)}
      onMouseLeave={() => setIsExploreOpen(false)}
    >
      <button className="px-4 py-2 rounded-md text-blue-600 border border-blue-600 text-sm font-semibold hover:bg-blue-100">
        Explore
      </button>

      {isExploreOpen && (
        <div className="absolute top-full mt-2 left-0 w-[90vw] max-w-6xl bg-white shadow-lg rounded-lg p-6 grid grid-cols-7 gap-4 overflow-y-auto max-h-[400px]">
          {Array.from({ length: 42 }).map((_, idx) => (
            <Link
              key={idx}
              to={`/explore/item-${idx + 1}`}
              className="text-sm text-gray-700 hover:text-blue-600 hover:underline block"
            >
              Item {idx + 1}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExploreMenu;
