"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleLogin() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.log("Login error:", error);
    }
  }

  async function handleLogout() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log("Logout error:", error);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
      <div className="mx-auto max-w-md bg-white border rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Week 8</h1>
        <p className="text-slate-600 mb-6">
          Login with GitHub to access the Shopping List.
        </p>

        {!user ? (
          <button
            onClick={handleLogin}
            className="w-full rounded bg-black text-white py-2 hover:bg-slate-800"
          >
            Login with GitHub
          </button>
        ) : (
          <div className="space-y-4">
            <p className="bg-slate-50 border rounded p-3">
              Welcome, <span className="font-semibold">{user.displayName}</span>
              <br />
              <span className="text-sm text-slate-600">{user.email}</span>
            </p>

            <Link
              href="/week-8/shopping-list"
              className="block text-center w-full rounded bg-blue-600 text-white py-2 hover:bg-blue-700"
            >
              Go to Shopping List
            </Link>

            <button
              onClick={handleLogout}
              className="w-full rounded border border-slate-300 py-2 hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </main>
  );
}