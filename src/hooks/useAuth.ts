"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { UserWithProfile } from "./definitions";

export function useAuth() {
  const [user, setUser] = useState<UserWithProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user + profile
  const fetchUser = async () => {
    setLoading(true);
    try {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getUser();
      if (sessionError || !sessionData.user) {
        setUser(null);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", sessionData.user.id)
        .single();

      if (profileError || !profile) {
        // No profile → log out
        await supabase.auth.signOut();
        setUser(null);
      } else {
        setUser({ ...sessionData.user, profile });
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();

    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      // Whenever auth state changes, refetch user + profile
      fetchUser();
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    // No need to setUser(null) manually; listener will handle it
  };

  return { user, loading, isLoggedIn: !!user, logout };
}
