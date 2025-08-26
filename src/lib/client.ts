// client.ts
// or hardcode for now

import { supabaseKey, supabaseUrl } from "./supabase";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${supabaseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${supabaseKey}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(
      `API error ${res.status}: ${error.message || res.statusText}`
    );
  }

  return res.json();
}
