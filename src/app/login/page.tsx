"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // IMPORTANT
      body: JSON.stringify({
        email,
        password,
      }),
    });

    console.log(res, "testtstst");
    if (!res.ok) {
      console.log(res);
      return;
    }

    // login success
    window.location.href = "/home";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign in
        </h1>

        <form className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500
                 hover:text-gray-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-2 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 active:scale-[0.98] transition"
            onClick={(e) => handleLogin(e)}
          >
            Sign In
          </button>
        </form>

        <Link
          href={"/register"}
          className="w-full text-center text-blue-500 text-sm "
        >
          {"Sign up"}
        </Link>

        <p className="mt-4 text-center text-xs text-gray-500">
          © 2026 Score App
        </p>
      </div>
    </div>
  );
}
