"use client";

import { useAuth } from "@/state/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth(); // assume your provider exposes a loading state

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard"); // replace to avoid going back
    }
  }, [user, loading, router]);

  // Show nothing (or spinner) until auth finishes
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user exists, redirect effect will handle it
  if (user) {
    return <div>Redirecting...</div>;
  }

  // No user → show login page
  return <main>{children}</main>;
}
