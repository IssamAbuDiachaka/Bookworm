import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 px-6 py-16 text-center bg-gradient-to-b from-white to-blue-50">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-blue-700">
          Learn, Share, and Grow Together
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mb-8 text-gray-600">
          Join a global academic community where knowledge flows both ways.
        </p>
        <div className="flex gap-4">
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition"
          >
            Join the Community
          </Link>
          <a
            href="#features"
            className="px-6 py-3 bg-gray-100 rounded-lg font-semibold text-gray-700 hover:bg-gray-200 transition"
          >
            See How it Works
          </a>
        </div>
      </section>

      {/* Features Preview */}
      <section id="features" className="px-6 py-16 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">
            What Bookworm Offers
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-blue-50 rounded-lg shadow hover:shadow-md transition">
              <h3 className="font-semibold text-blue-700 mb-2">📚 Content Sharing</h3>
              <p className="text-sm text-gray-600">
                Upload, organize, and access academic resources with ease.
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg shadow hover:shadow-md transition">
              <h3 className="font-semibold text-blue-700 mb-2">🧑‍🏫 Interactive Learning</h3>
              <p className="text-sm text-gray-600">
                Connect with peers and lecturers in real-time discussions.
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg shadow hover:shadow-md transition">
              <h3 className="font-semibold text-blue-700 mb-2">🌍 Global Community</h3>
              <p className="text-sm text-gray-600">
                Collaborate with learners and educators from around the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 text-center bg-gray-100 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Built for learners, by learners. 🌱
        </p>
      </footer>
    </main>
  );
}

export default LandingPage;
