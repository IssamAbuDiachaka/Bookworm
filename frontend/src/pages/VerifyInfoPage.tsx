import { useAuthStore } from "../store/auth.store.new";
import toast from "react-hot-toast";

export default function VerifyInfoPage() {
  const resendVerification = useAuthStore((state) => state.resendVerification);
  const email = useAuthStore((state) => state.user?.email);

  const handleResend = () => {
    if (!email) {
      toast.error("Email not found. Please sign up again.");
      return;
    }
    resendVerification(email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
      <p className="max-w-md">
        We’ve sent a verification link to <strong>{email}</strong>.
        Please click the link in the email to activate your account.
      </p>

      <button
        onClick={handleResend}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        Resend Verification Email
      </button>
    </div>
  );
}
