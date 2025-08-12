import { useState } from "react";

export default function Register() {
  const [role, setRole] = useState("student");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering as:", role); // Replace with API call
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Create Account</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="student">Student</option>
          <option value="lecturer">Lecturer</option>
        </select>

        <input type="text" placeholder="Full Name" className="w-full p-2 border rounded mb-4" />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-4" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-4" />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Sign Up
        </button>
      </form>
    </main>
  );
}
