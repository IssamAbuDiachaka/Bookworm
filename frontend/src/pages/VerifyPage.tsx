import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function VerifyPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { verifyUser, isVerifying } = useAuthStore();

  useEffect(() => {
    if (token) {
      verifyUser(token, navigate);
    }
  }, [token, verifyUser, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      {isVerifying ? (
        <p className="text-lg font-semibold">Verifying your account...</p>
      ) : (
        <p className="text-lg">Please wait...</p>
      )}
    </div>
  );
}
