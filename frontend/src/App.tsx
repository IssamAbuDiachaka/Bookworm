import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
// import ServicesPage from './pages/ServicesPage';
import ServicesPage from "./pages/Services";
import ProviderOnboardingPage from "./pages/ProviderOnboardingPage";
import MessagesPage from "./pages/MessagesPage";
import { useAuthStore } from "./store/auth.store";
import CreateServicePage from "./pages/CreateServicePage";
import Services from "./pages/Services";
import VerifyPage from "./pages/VerifyPage";
import VerifyInfoPage from "./pages/VerifyInfoPage";

const App: React.FC = () => {
  const { user, clearAuth } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex gap-4 items-center">
          <Link to="/" className="font-semibold">
            TumaFinder
          </Link>
          <Link to="/services">Services</Link>
          {user && <Link to="/messages">Messages</Link>}
          {user && user.role !== "provider" && (
            <Link to="/provider/onboarding">Become a Provider</Link>
          )}
          {user && user.role === "provider" && (
            <Link to="/create-service">Create Service</Link>
          )}
          <div className="ml-auto flex gap-3 items-center">
            {user ? (
              <>
                <Link to="/profile">{user.username}</Link>
                <button onClick={clearAuth} className="text-red-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/services" />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/verify/:token" element={<VerifyPage />} />
          <Route path="/verify-info" element={<VerifyInfoPage />} />
          <Route path="/verify/:token" element={<VerifyPage />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/profile"
            element={user ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route path="/services" element={<ServicesPage />} />
          <Route
            path="/provider/onboarding"
            element={
              user ? <ProviderOnboardingPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/messages"
            element={user ? <MessagesPage /> : <Navigate to="/login" />}
          />
          <Route path="/services" element={<Services />} />
          <Route path="/onboard" element={<ProviderOnboardingPage />} />
          {/* Redirect to create service page if user is a provider */}
          <Route
            path="/create-service"
            element={
              user && user.role === "provider" ? (
                <CreateServicePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
