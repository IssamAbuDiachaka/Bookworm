// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast"; // optional for global notifications
import { useAppStore } from "./store/appStore";
import Navbar from "./components/Navbar";

// Lazy-loaded pages for code-splitting
const LandingPage = lazy(() => import("./pages/LandingPage"));
// const Dashboard = lazy(() => import("./pages/Dashboard"));
// const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const theme = useAppStore((state) => state.theme);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <Router>
      <Navbar />

        {/* Suspense to handle lazy routes */}
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Suspense>

        {/* Global toaster (scalable notification system) */}
        <Toaster position="top-right" />
      </Router>
    </div>
  );
}

export default App;
