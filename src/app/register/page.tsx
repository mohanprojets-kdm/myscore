"use client";

import { MouseEvent, useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const handleLogin = async (e: MouseEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // IMPORTANT
      body: JSON.stringify(formData),
    });
    console.log(res, "Errrrrr");
    if (!res.ok) {
      // handle error
      return;
    }

    // login success
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign up
        </h1>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="name"
              placeholder="you@example.com"
              value={formData?.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Gender
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none"
              name="gender"
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option label="Male" value={"MALE"} />
              <option label="Fe-Male" value={"FEMALE"} />
            </select>
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={formData?.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData?.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
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
            Sign up
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-500">
          © 2026 Score App
        </p>
      </div>
    </div>
  );
}
