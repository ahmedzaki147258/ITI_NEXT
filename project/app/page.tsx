"use client";

import { useSession } from "next-auth/react";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";

export default function Home() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) return <LandingPage />;
  else return <Dashboard />;
}
