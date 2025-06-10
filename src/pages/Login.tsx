import { useState } from "react";
import { useNavigate } from '@tanstack/react-router'
import { useBooking } from "../context/BookingContext";
import { roles } from "../common/enum";

export const Login = () => {
  const { login } = useBooking();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  // Handle form submission and trigger login logic
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate that both username and password are provided
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    // Attempt to log in with provided credentials
    const success = login(username, password, role);
    if (!success) {
      setError("Invalid credentials.");
      return;
    } 

    // Redirect to home or admin page upon successful login
    navigate({
      to: role === 'admin' ? '/admin' : '/home',
    })
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
      role="main"
    >
      {/* App Title */}
      <h2 className="text-3xl font-bold mb-6 text-blue-700">
        🎬 Movie Booking App
      </h2>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
        aria-labelledby="login-title"
      >
        <h1 className="text-2xl font-bold mb-4 text-center" id="login-title">
          Login
        </h1>

        {/* Display login error message */}
        {error && (
          <p
            className="text-red-500 mb-3 text-sm"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}

        {/* Username input */}
        <label htmlFor="username" className="block text-sm font-medium mb-1">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          autoFocus
        />

        {/* Password input */}
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Role selection */}
        <label htmlFor="role" className="block text-sm font-medium mb-1">
          Role
        </label>
        <select
          id="role"
          name="role"
          className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          aria-label="Select user role"
        >
          {roles.map(r => (
            <option key={r} value={r}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </option>
          ))}
        </select>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Log In
        </button>
      </form>
    </main>
  );
};
