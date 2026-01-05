"use client";

import { useQuery } from "@tanstack/react-query";

async function fetchBanks() {
  const res = await fetch("/api/paystack/banks");
  if (!res.ok) throw new Error("Failed to fetch banks");
  const data = await res.json();
  return data.data; // Paystack returns { status, message, data }
}

export function useBanks() {
  return useQuery({
    queryKey: ["banks"],
    queryFn: fetchBanks,
  });
}
