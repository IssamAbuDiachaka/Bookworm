import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-center mb-4">
        Welcome to <span className="text-indigo-600">Bookworm</span>
      </h1>
      <p className="text-lg text-gray-600 text-center mb-8">
        A collaborative academic space for students & lecturers worldwide.
      </p>
      <div className="flex gap-4">
        <Link to="/login" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
          Login
        </Link>
        <Link to="/register" className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300">
          Sign Up
        </Link>
      </div>
    </main>
  );
}
